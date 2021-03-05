<template>
  <div class="page-box">
    <div class="day-update-container">
      <div class="banner-box">
        <van-image
          radius="5"
          width="100%"
          height="100%"
          fit="cover"
          :src="coursesVo.purl"
        />
      </div>
      <div class="title-box">
        <van-cell :to="`/dayDetail?id=${coursesVo.id}`" center is-link>
          <p>{{coursesVo.subTitle}}</p>
        </van-cell>
      </div>
      <div class="panel-box">
        <div class="count-box">已更新{{audioList.length}}节</div>
        <div class="right-box">
          <div @click="sortHandle" class="sort-box">
            <img src="./img/sort.png" alt="">
            {{isReverse?'倒序':'正序'}}
          </div>
          <div class="line-box"></div>
          <div @click="pauseHandle" class="play-box" v-if="isPlaying">
            <van-icon size="16" name="pause-circle-o"/>
            暂停播放
          </div>
          <div @click="playHandle" class="play-box" v-else>
            <van-icon size="16" name="play-circle-o"/>
            继续播放
          </div>
        </div>
      </div>
      <div class="list-box">
        <van-list
          :immediate-check="false"
          v-model="loading0"
          :finished="finished0"
          finished-text="没有更多了"
          @load="onLoad0"
        >
          <play-list
            :isPlaying="isPlaying"
            :currentPlayIndex="currentPlayIndex"
            @iconClick="currentPlayHandle"
            @itemClick="goDetailHandle"
            @showShare="showSpread=true"
            :recCourses="audioList"/>
        </van-list>
      </div>
      <div class="bottom-btn-box" v-if="!this.coursesVo['userState']">
        <van-button
          block
          round
          type="info"
          color="#333435"
          @click="subscribeHandle"
        >
          <span
            style="font-size:15px;color:#FFDFC1;font-weight:bold"
          >
            订阅专栏
          </span>
        </van-button>
      </div>
    </div>
    <GoHome/>
    <van-overlay z-index="2020" :show="showSpread" @click="showSpread = false">
      <div style="padding: 0 10px">
        <img style="width: 100%" src="./img/pop_share_tips.png" alt="">
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import PlayList from "../../components/PlayList";
  import GoHome from "../../components/GoHome";
  import {mapActions, mapState} from "vuex";
  import {getCoursesInf, subscribe} from '../../api'
  import wxConfigApi from "../../utils/weixinApi";
  import {Toast} from 'vant'

  export default {
    name: "index",
    components: {
      PlayList,
      GoHome
    },
    computed: {
      ...mapState({
        currentPlayIndex: state => state.media.currentPlayIndex,
        audioList: state => state.media.audioList,
        isPlaying: state => state.media.isPlaying,
        coursesVo: state => state.media.course,
      })
    },
    async mounted() {
      this._getCoursesInf()
    },
    data() {
      return {
        showSpread: false,
        isReverse: true,
        loading0: false,
        finished0: false,
        pageIndex0: 0,
      }
    },
    watch: {
      currentPlayIndex() {
        this.$nextTick(()=>{
          this.setPlayHandle()
        })
      }
    },
    methods: {
      ...mapActions({
        setCurrentPlayIndex: 'media/setCurrentPlayIndex',
        setAudioListL: 'media/setAudioListL',
        setCourseInfo: 'media/setCourseInfo',
        resetParams: 'media/resetParams',
      }),
      // 根据课程状态过滤可播放资源
      filterSourceList(content){
        if(this.coursesVo['userState']>0){
          return content
        }else {
          return content.map(item => {
            if (item['tryFlag'] === 0) {
              item.resourse = '';
            }
            return item;
          })
        }
      },
      subscribeHandle() {
        const {id} = this.$route.query
        subscribe(id).then(() => {
          this.setAudioListL([])
          this._getCoursesInf()
        })
      },
      sortHandle() {
        this.isReverse = !this.isReverse;
        this.setAudioListL([...this.audioList].reverse())
        this.setCurrentPlayIndex(this.audioList.length - 1 - this.currentPlayIndex)
      },
      currentPlayHandle(id) {
        const currentIndex = this.audioList.findIndex((item) => item.id === id)
        if (currentIndex === this.currentPlayIndex) {
          if (this.isPlaying) {
            this.pauseHandle()
          } else {
            this.playHandle()
          }
        } else {
          this.setCurrentPlayIndex(currentIndex)
        }
      },
      pauseHandle() {
        this.$audioPlayer.pause()
      },
      playHandle() {
        this.$audioPlayer.play()
      },
      setPlayHandle() {
        const currentCourse = this.audioList[this.currentPlayIndex]
        wxConfigApi({
          title: currentCourse.title,
          subTitle: currentCourse.subTitle ? currentCourse.subTitle : '已完更',
          link: location.href.split('&')[0] + `&stepId=${currentCourse.id}&size=${this.currentPlayIndex}`,
          purl: currentCourse.purl,
        })
      },
      onLoad0() {
        this.pageIndex0 = this.pageIndex0 + 1
        this._getCoursesInf()
      },
      _getCoursesInf() {
        const {id, stepId,size=0} = this.$route.query
        getCoursesInf(id, {
          page: this.pageIndex0,
          size:Number(size)+15
        }).then(res => {
          const {coursesDetail, coursesDetail: {stepInfoPage: {content, numberOfElements}}} = res
          this.setCourseInfo(coursesDetail)
          this.setAudioListL([...this.audioList,...this.filterSourceList(content)])

          if (numberOfElements < 15) {
            this.finished0 = true;
          }
          this.loading0 = false;

          if (stepId) {
            const currentIndex = this.audioList.findIndex((item) => item.id === Number(stepId))
            this.setCurrentPlayIndex(currentIndex)
          }

          this.$nextTick(()=>{
            this.playHandle();
            this.setPlayHandle();
          })
        })
      },
      goDetailHandle(id) {
        const index= this.audioList.findIndex(item=>item.id===id)
        this.$router.push({path: `/mediaPlayer?id=${this.coursesVo.id}&stepId=${id}&size=${index}`})
      }
    },
    beforeDestroy() {
      this.resetParams()
    }
  }
</script>

<style scoped lang="scss">
  .day-update-container {
    width: 100%;

    .bottom-btn-box {
      position: fixed;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0 15px 10px;
      background: #ffffff;
    }

    .banner-box {
      width: 100%;
      height: 184px;
      box-sizing: border-box;
      padding: 10px;
    }

    .title-box {
      width: 100%;
      background: #FAFAFC;

      .van-cell {
        background: #FAFAFC;
      }

      p {
        color: #222222;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .panel-box {
      padding: 5px 20px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #FAFAFC;

      .count-box {
        color: #999999;
        font-size: 12px;
      }

      .right-box {
        display: flex;
        align-items: center;
        color: #666666;
        font-size: 12px;

        .line-box {
          width: 1px;
          background: #E8E8E8;
          height: 15px;
          margin: 0 15px;
        }

        .sort-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 50px;

          img {
            width: 10px;
          }
        }

        .play-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 75px;
        }
      }
    }

    .list-box {
      padding: 0 15px 15px;
    }
  }
</style>
