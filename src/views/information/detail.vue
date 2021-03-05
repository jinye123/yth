<template>
  <div class="page-box">
    <div class="header-box">
      {{courseInfo.title}}
    </div>
    <van-sticky z-index="100">
      <div v-if="courseInfo.type===1" class="player-box">
        <div class="inner-box">
          <div class="left-box">
            <div class="img-box" @click="toggleHandle">
              <img v-if="isPlaying" src="./img/pause.png" alt="">
              <img v-else src="./img/play.png" alt="">
            </div>
            <div class="text-box">
              <div class="title-box">{{courseInfo.coursesInfo.stepInfo.title}}</div>
              <div class="num-box">{{courseInfo.coursesInfo.stepInfo.count}}人在学习</div>
            </div>
          </div>
          <div class="right-box">
            <van-button
              :to="`/detail?id=${courseInfo.coursesInfo.id}`"
              @click=""
              color="#F65B58"
              size="mini"
              plain
              round
            >
              查看全部
            </van-button>
          </div>
        </div>
      </div>
      <card-list v-if="courseInfo.type===0" @click="goDetailHandle" :recCourses="[courseInfo.coursesInfo]" />
    </van-sticky>
    <div class="body-box" v-html="courseInfo.content">

    </div>
    <div class="content-box" style="position: relative">
      <van-tabs swipeable animated>
        <van-tab title-style="flex:none;width:20%" :title="`评论(${commentList.length})`">
          <van-list
            :immediate-check="false"
            v-model="loading0"
            :finished="finished0"
            finished-text="没有更多了"
            @load="onLoad0"
          >
            <CommentList
              :commentList="commentList"
            />
          </van-list>
        </van-tab>
      </van-tabs>
      <div @click="sortHandle" class="sort-box">
        <van-icon v-if="orderDesc===1" name="ascending"/>
        <van-icon v-if="orderDesc===2" name="descending"/>
        按时间
      </div>
    </div>
    <div class="input-box">
      <van-search
        ref="commentRef"
        @focus="focusHandle"
        left-icon="edit"
        show-action
        v-model="value"
        shape="round"
        background="#ffffff"
        placeholder="写评论，参与交流"
      >
        <template #action>
          <div @click="searchHandle" class="search-box">
            <span style="font-size: 12px;margin-right: 4px" class="icon icon-fenxiang"></span>
            发送
          </div>
        </template>
      </van-search>
    </div>
    <Menus />
  </div>
</template>

<script>
  import CommentList from '../../components/CommentList'
  import {mapActions, mapGetters, mapState} from "vuex";
  import wxConfigApi from "../../utils/weixinApi";
  import {Toast} from 'vant'
  import Menus from './../../components/Menus'
  import {
    getArticleDetail,
    addArticleComment,
    getArticleCommentList,
    addStatisticsShare
  } from '../../api'
  import CardList from '../../components/CardList'

  export default {
    name: "detail",
    components: {
      CommentList,
      CardList,
      Menus
    },
    data() {
      return {
        value: '',
        commentList: [],
        orderDesc: 2,
        courseInfo: {},
        loading0:false,
        finished0:false,
        pageIndex0:0,
      }
    },
    computed: {
      ...mapState({
        isPlaying: state => state.media.isPlaying,
      }),
      ...mapGetters({
        userInfo: 'userInfo'
      }),
    },
    created() {
      this._getArticleDetail()
      this._getArticleCommentList()
    },
    methods: {
      ...mapActions({
        setCurrentPlayIndex: 'media/setCurrentPlayIndex',
        setAudioListL: 'media/setAudioListL',
        resetParams:'media/resetParams',
      }),
      toggleHandle() {
        if(this.isPlaying){
          this.$audioPlayer.pause()
        }else {
          this.$audioPlayer.play()
        }
      },
      searchHandle() {
        const {id} = this.$route.query
        if (this.value.trim()) {
          addArticleComment({content:this.value,aid:id}).then(()=>{
            this._getArticleCommentList()
          })
          this.$emit('sendHandle', encodeURIComponent(this.value));
          this.value = "";
        }
      },
      focusHandle() {
        setTimeout(() => {
          document.body.scrollTop = document.body.scrollHeight;
        }, 300);
      },
      sortHandle() {
        if (this.orderDesc === 1) {
          this.orderDesc = 2
        } else {
          this.orderDesc = 1
        }
        this._getArticleCommentList()
      },
      goDetailHandle(id){
        this.$router.push({path:`/detail?id=${id}`})
      },
      _getArticleDetail() {
        const {id,uid} = this.$route.query
        getArticleDetail(id,{uid}).then(res => {
          const {type,coursesInfo} = res;
          this.courseInfo = res;
          if(type===1){
            this.setAudioListL([coursesInfo['stepInfo']])
            this.setCurrentPlayIndex(0)
            this.$audioPlayer.play()
          }
          wxConfigApi({
            title: this.courseInfo.title,
            subTitle: this.courseInfo.subTitle,
            link: window.location.origin + window.location.pathname+'#/information/detail?id='+id+'&uid='+this.userInfo.uid,
            purl: this.courseInfo.purl,
            success:()=>{
              addStatisticsShare({
                "linkId": 0,
                "page": location.href.split('#')[1].split('?')[0],
                "plinkId": id,
              }).then(res=>{
                Toast('分享成功')
              })
            }
          })
        })
      },
      onLoad0(){
        this.pageIndex0=this.pageIndex0+1
        this._getArticleCommentList()
      },
      _getArticleCommentList(){
        const {id} = this.$route.query
        getArticleCommentList({
          aid:id,
          page:this.pageIndex0,
          size:20,
          orderDesc:this.orderDesc
        }).then(res=>{
          const {content} = res
          this.commentList=[...this.commentList,...content]
          if(content.length<15){
            this.finished0=true;
          }
          this.loading0 = false;
        })
      }
    },
    beforeDestroy() {
      this.resetParams()
    }
  }
</script>

<style lang="scss" scoped>
  .header-box {
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    color: #343434;
    line-height: 22px;
    background: #ffffff;
    padding: 20px 15px;
    box-sizing: border-box;
  }

  .player-box {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding: 8px 15px;
    background: #ffffff;

    .inner-box {
      width: 100%;
      height: 100%;
      background: #F8F8F8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 8px;

      .left-box {
        width: 80%;
        display: flex;
        align-items: center;

        .img-box {
          width: 44px;
          height: 44px;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .text-box {
          height: 35px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title-box {
            width: 195px;
            height: 15px;
            font-size: 15px;
            font-weight: 500;
            color: #333333;
            line-height: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .num-box {
            height: 12px;
            font-size: 12px;
            font-weight: 400;
            color: #999999;
            line-height: 12px;
          }
        }
      }
    }
  }

  .body-box {
    width: 100%;
    height: 500px;
    box-sizing: border-box;
    padding: 15px;
    background: #ffffff;
  }

  .content-box {
    width: 100%;
    margin: 8px 0;

    .sort-box {
      color: #666666;
      font-size: 12px;
      width: 100px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      position: absolute;
      right: 0;
      top: 0;

      i {
        font-size: 15px;
        margin-right: 2px;
      }
    }
  }

  .input-box {
    width: 100%;
    position: fixed;
    bottom: 0;

    .search-box {
      padding: 0 5px;
    }
  }
</style>
