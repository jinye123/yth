<template>
  <div class="course-list" v-wechat-title="title">
    <van-card
      @click="goDetailHandle(item.coursesVo.id)"
      v-for="item in purchased"
      :desc="item['coursesVo']['subTitle']"
      :title="item['coursesVo']['title']"
    >
      <template slot="thumb">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="item['coursesVo']['purl']"
        />
      </template>
      <template slot="num">
        <div
          v-if="item['coursesVo']['userState']>0"
          class="price-box">{{item['coursesVo']['userState'] | filterCoursesState}}
        </div>
        <van-button
          v-if="item['coursesVo']['userState']===-1"
          @click.stop="invitaHandle(item)"
          size="small" round color="#FFA500" style="width: 80px;height: 27px">
          邀请成员
        </van-button>
      </template>
      <template slot="price">
        <div v-if="item['coursesVo']['userState']>0" class="num-box">
          {{item['coursesVo']['count']}}人一起学习
        </div>
        <div v-if="item['coursesVo']['userState']===-1" class="num-box">
          拼团时间
          <van-count-down :time="countTime(item['pinkInfo']['endTime'])"/>
        </div>
      </template>
    </van-card>
    <van-empty style="height: 100vh" v-if="!purchased.length" description="暂无课程!"/>
    <GoHome />
  </div>
</template>

<script>
  import {
    getCoursesListByUserId,
  } from '../../api'
  import dayjs from "dayjs";
  import GoHome from '../../components/GoHome'

  export default {
    name: "purchased",
    data() {
      return {
        purchased: [],
      }
    },
    components:{
      GoHome
    },
    computed:{
      title(){
        const {type} = this.$route.query
        if(Number(type)===1){
          return '已购课程'
        }else if(Number(type)===2){
          return '我的领取'
        }else if(Number(type)===4){
          return '我的订阅'
        }else {
          return '我的课程'
        }
      }
    },
    filters: {
      filterCoursesState(state) {
        switch (state) {
          case 1:
            return '已购';
            break;
          case 2:
            return '赠送';
            break;
          case 4:
            return '订阅';
            break;
          default :
            return '—'
        }
      }
    },
    created() {
      this._getCoursesListByUserId()
    },
    methods: {
      invitaHandle(item) {
        this.$router.push({path: '/groupBuy', query: {uid: item['pinkInfo'].uid, cid: item['combinationInfo'].id}})
      },
      goDetailHandle(id) {
        this.$router.push({path: `/detail?id=${id}`})
      },
      // 倒计时函数
      countTime(time) {
        return dayjs(time).diff(dayjs())
      },
      _getCoursesListByUserId() {
        const {type} = this.$route.query
        getCoursesListByUserId({
          type
        }).then(res => {
          this.purchased = res
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .course-list {
    min-height: 100vh;

    .van-cell__title {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
    }

    .van-card {
      background: #ffffff;
      margin-top: 0;

      .van-card__title {
        font-size: 14px;
        color: #222222;
      }

      .price-box {
        color: #D64848;
        font-size: 14px;
      }

      .num-box {
        font-size: 12px;
        color: #666666;
        display: flex;
        height: 100%;
        align-items: center;
        .van-count-down{
          color: #D64848;
        }
      }
    }
  }
</style>
