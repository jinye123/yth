<template>
  <audio
    ref="audio"
    controls
    preload="auto"
    :src="playSrc"
    @ended="onEnded"
    @timeupdate="onTimeUpdate"
    @loadedmetadata="onLoadedmetadata"
  >
    浏览器太老咯，请升级浏览器吧~
  </audio>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import wx from 'weixin-js-sdk'
  import {coursesBrowseLog,coursesRecordAdd} from '../api'
  import {Toast} from "vant";
  export default {
    name: 'Player',
    data() {
      return {
        isIOS: /iPhone|iPad|iPod/i.test(window.navigator.userAgent), // 是否是IOS设备
      }
    },
    computed:{
      ...mapState({
        currentPlayIndex:state => state.media.currentPlayIndex,
        isPlaying:state => state.media.isPlaying,
        duration:state => state.media.duration,
        currentTime:state => state.media.currentTime,
        multipleArray:state => state.media.multipleArray,
        multipleIndex:state => state.media.multipleIndex,
        isLoop:state => state.media.isLoop,
        audioList:state => state.media.audioList,
        course:state => state.media.course,
      }),
      playSrc(){
        if(this.audioList[this.currentPlayIndex]){
          return this.audioList[this.currentPlayIndex]['resourse']
        }else{
          return ''
        }
      }
    },
    methods: {
      ...mapActions({
        setCurrentPlayIndex:'media/setCurrentPlayIndex',
        setIsPlaying:'media/setIsPlaying',
        setIsLoop:'media/setIsLoop',
        setMultipleIndex:'media/setMultipleIndex',
        setDuration:'media/setDuration',
        setCurrentTime:'media/setCurrentTime',
        setShowTip:'app/setShowTip',
      }),
      // 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本
      onLoadedmetadata() {
        this.setDuration(this.$refs.audio.duration)
      },
      // 当前的播放位置发送改变时触发
      onTimeUpdate(event) {
        this.setCurrentTime(event.target.currentTime)
      },
      setCurrentTimeHandle(time){
        this.$refs.audio.currentTime=time
      },
      // 音频播放完毕
      onEnded(event) {
        this.pause()
        this.setCurrentTime(0)
        this.$emit('ended', event)
        if (this.isLoop) {
          this.playNext()
        }else {
          this.play()
        }
      },
      // 开始播放
      async play() {
        let playHandler = () => {
          this.$refs.audio.play();
          this.$refs.audio.playbackRate = this.multipleArray[this.multipleIndex];
          this.setIsPlaying(true)
          this.$emit('play')
        }
        if(this.course['status']&&!this.course['userState']){
          Toast('请先订阅本课程')
          this.pause()
        }else if(!this.course['userState']&&!this.audioList[this.currentPlayIndex]['tryFlag']){
          this.setShowTip(true)
          this.pause()
        }else {
          // 解决 iOS 异步请求后无法播放
          if (this.isIOS) {
           await this.$refs.audio.play()
           await this.$refs.audio.pause()
          }
          playHandler()
          coursesBrowseLog({
            cid:this.course.id,
            sid:this.audioList[this.currentPlayIndex].id
          })
        }
      },
      // 暂停播放
      pause() {
        this.$refs.audio.pause()
        this.$nextTick(() => {
          this.setIsPlaying(false)
          this.$emit('pause')
        })
      },
      // 播放上一首
      playPrev() {
        if (this.currentPlayIndex <= 0 && !this.isLoop) {
          // 无上一首了
          return
        }
        let prevHandler = () => {
          if (this.currentPlayIndex <= 0 && this.isLoop) {
            // 列表循环
            this.setCurrentPlayIndex(this.audioList.length - 1)
          } else {
            this.setCurrentPlayIndex(this.currentPlayIndex - 1)
          }
          this.$nextTick(() => {
            this.$emit('play-prev')
          })
        }
        prevHandler()
      },
      // 播放下一首
      playNext() {
        if (this.currentPlayIndex + 1 >= this.audioList.length && !this.isLoop) {
          // 无下一首了
          return
        }
        let nextHandler = () => {
          // 已经到达列表最后一首
          if (this.currentPlayIndex + 1 >= this.audioList.length && this.isLoop) {
            this.setCurrentPlayIndex(0)
          } else {
            this.setCurrentPlayIndex(this.currentPlayIndex+1)
          }
          this.$nextTick(() => {
            this.$emit('play-next')
          })
        }
        nextHandler()
      },
      //设置倍速播放
      changeMultiple() {
        if (this.multipleIndex < 3) {
          this.setMultipleIndex(this.multipleIndex+1)
        } else {
          this.setMultipleIndex(0)
        }
        this.$refs.audio.playbackRate = this.multipleArray[this.multipleIndex]
      },
      // 设置循环模式
      changeLoop(){
        this.setIsLoop(!this.isLoop)
      },
      _setWatchTime(){
        this.watchTime=setTimeout(()=>{
          if(this.isPlaying){
            coursesRecordAdd({
              cid:this.course.id,
              sid:this.audioList[this.currentPlayIndex].id,
              durTime:this.currentTime||0
            })
          }
          this._setWatchTime()
        },10000)
      }
    },
    watch:{
      currentPlayIndex(newValue,oldValue){
        console.log(newValue,oldValue,'**************')
        this.$nextTick(()=>{
          this.play();
        })
      }
    },
    mounted() {
      this._setWatchTime()
      wx.config({
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
      });
      wx.ready(()=> {
        this.$refs.audio.play()
      });
    },
    destroyed() {
      clearTimeout(this.watchTime)
    }
  }
</script>
<style>
  audio{
    display: none;
  }
</style>
