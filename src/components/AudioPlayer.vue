<template>
  <div>
    <div class="cover-box">
      <div class="img-box">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="currentStep.purl"
        />
      </div>
      <div class="title-box">
        {{currentStep.title}}
      </div>
      <div class="des-box">
        {{currentStep['createTime'].split(' ')[0]}} | {{currentStep['stepCount']}}次学习</div>
    </div>
    <div class="audio-player">
      <div
        class="audio__progress-wrap"
      >
        <van-slider @drag-start="dragStartHandle" @drag-end="dragStopHandle" v-model="percent" active-color="#CCAD71">
          <template #button>
            <div class="custom-button">
              {{ formatTime(currentTime) }}/{{ formatTime(duration) }}
            </div>
          </template>
        </van-slider>
      </div>

      <div class="audio__btn-wrap">
        <!--设置播放模式-->
        <div class="play-mode" @click="changeLoop">
          {{isLoop?'列表循环':'单课循环'}}
        </div>
        <div
          class="audio__play--previous"
          :class="{ disable: !isLoop && currentPlayIndex === 0 }"
          @click="playPrev"
        >
          <van-icon name="arrow-left"></van-icon>
        </div>

        <div
          v-if="!isPlaying"
          @click="play"
          class="audio__play--start"
        >
          <van-icon name="play"></van-icon>
        </div>

        <div
          v-else
          @click="pause"
          class="audio__play--pause"
        >
          <van-icon name="pause"></van-icon>
        </div>

        <div
          class="audio__play--next"
          :class="{ disable: !isLoop && currentPlayIndex === audioList.length - 1 }"
          @click="playNext"
        >
          <van-icon name="arrow"></van-icon>
        </div>
        <!--设置倍速播放-->
        <div class="play-step" @click="changeMultiple">
          倍速X{{multipleArray[multipleIndex]}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  export default {
    name: "AudioPlayer",
    props:['currentStep','courses'],
    data(){
      return{
        percent:0,
      }
    },
    computed:{
      ...mapState({
        currentPlayIndex:state => state.media.currentPlayIndex,
        multipleArray:state => state.media.multipleArray,
        multipleIndex:state => state.media.multipleIndex,
        isLoop:state => state.media.isLoop,
        audioList:state => state.media.audioList,
        isPlaying:state => state.media.isPlaying,
        duration:state => state.media.duration,
        currentTime:state => state.media.currentTime,
      }),
    },
    mounted() {
      if(this.currentStep){
        this.$nextTick(()=>{
          this.play();
        })
      }
    },
    watch:{
      currentTime(){
        this.percent=this.currentTime / this.duration * 100;
      },
    },
    methods: {
      playPrev(){
        this.$audioPlayer.playPrev()
      },
      play(){
        this.$audioPlayer.play()
      },
      playNext(){
        this.$audioPlayer.playNext()
      },
      pause(){
        this.$audioPlayer.pause()
      },
      changeMultiple(){
        this.$audioPlayer.changeMultiple()
      },
      changeLoop(){
        this.$audioPlayer.changeLoop()
      },
      // 格式化秒为分
      formatTime(second) {
        return [parseInt((second / 60) % 60), parseInt(second % 60)]
          .join(':')
          .replace(/\b(\d)\b/g, '0$1')
      },
      dragStartHandle(){
        this.pause()
      },
      dragStopHandle(){
        this.$audioPlayer.setCurrentTimeHandle(this.percent / 100 * this.duration)
        this.play()
      },
      ...mapActions({
        setCurrentTime:'media/setCurrentTime',
      }),
    }
  }
</script>

<style lang="scss" scoped>
  .cover-box {
    width: 100%;
    height: 280px;
    box-sizing: border-box;
    padding: 30px 0;
    background: #ffffff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .share-box {
      position: absolute;
      right: 0;
      top: 40px;
      box-sizing: border-box;
      width: 76px;
      height: 30px;
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
      border-radius: 15px 0px 0px 15px;
      font-size: 12px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 12px;
      line-height: 30px;
      text-align: center;
    }

    .img-box {
      width: 209px;
      height: 156px;
      border-radius: 10px;
      overflow: hidden;
      background: darkgoldenrod;
    }

    .title-box {
      font-size: 16px;
      font-weight: bold;
      width: 60%;
      color: rgba(34, 34, 34, 1);
      height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      line-height: 20px;
    }

    .des-box {
      font-size: 13px;
      color: rgba(153, 153, 153, 1);
      line-height: 13px;
    }
  }

  .audio-player {
    background: #ffffff;
    padding: 10px 10px 30px;
  }

  .audio-player .audio__btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 39px;
  }

  .audio-player .audio__btn-wrap .audio__play--previous {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4F5461;
    font-size: 26px;
  }

  .audio-player .audio__btn-wrap .audio__play--previous.disable {
    opacity: 0.5;
  }

  .audio-player .audio__btn-wrap .audio__play--start {
    background-color: #4F5461;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #ffffff;
    font-size: 30px;
  }

  .audio-player .audio__btn-wrap .audio__play--pause {
    background-color: #4F5461;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #ffffff;
    font-size: 30px;
  }

  .audio-player .audio__btn-wrap .audio__play--next {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4F5461;
    font-size: 26px;
  }

  .audio-player .audio__btn-wrap .audio__play--next.disable {
    opacity: 0.5;
  }

  .play-mode, .play-step{
    width:60px;
    height:20px;
    border-radius:11px;
    border:1px solid #cccccc;
    font-size:10px;
    color:#666666;
    line-height: 20px;
    text-align: center;
  }

  .audio-player .audio__progress-wrap {
    box-sizing: border-box;
    padding: 0 20px;
  }

  .custom-button{
    color: #F9F9F9;
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    background: #010101;
    border-radius: 10px;
    padding: 6px 5px;
  }

</style>
