<template>
  <div class="page-box">
    <div class="group-buy-course" v-if="!isLeader">
      <card-list @click="goDetailHandle" :recCourses="[coursesVo]"/>
    </div>
    <div class="group-buy-box">
      <template v-if="groupInfo.state===0">
        <div class="count-down-box">
          <h3>距离拼团结束还剩</h3>
          <div class="count-down-container">
            <van-count-down format="HH:mm:ss" :time="time">
              <template v-slot="timeData">
                <span class="block" v-if="timeData.days">{{ 24*timeData.days+timeData.hours }}</span>
                <span class="block" v-else>{{timeData.hours<=9?'0'+timeData.hours:timeData.hours}}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes<=9?'0'+timeData.minutes:timeData.minutes}}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds<=9?'0'+timeData.seconds:timeData.seconds }}</span>
              </template>
            </van-count-down>
          </div>
        </div>
        <div class="group-buy-tip-box">
          <p v-if="isLeader">还差<span>{{quota}}人</span>拼团成功，快去邀请好友吧</p>
          <p v-else>仅剩<span>{{quota}}个</span>名额</p>
        </div>
      </template>
      <template v-if="!isLeader&&groupInfo.state===1">
        <div class="group-buy-tip-box">
          <p>拼团已满</p>
        </div>
      </template>
      <template v-if="isLeader&&groupInfo.state===1">
        <div class="group-buy-tip-box">
          <div class="group-buy-success">
            <img src="./img/success@2x.png" alt="">
          </div>
          <p>拼单成功!</p>
        </div>
      </template>
      <div class="group-buy-list">
        <div v-for="(item,index) in groupCourses['people']" :key="item.id">
          <div v-if="groupSponsorVos[index]" class="group-buy-item">
            <div class="avatar-box">
              <van-image
                fit="cover"
                round
                width="100%"
                height="100%"
                :src="groupSponsorVos[index]['headimgurl']"
              />
              <div v-if="index===0" class="initiator-box">发起者</div>
            </div>
            <div class="name-box van-ellipsis" style="width: 80px">{{groupSponsorVos[index]['nickname']}}</div>
          </div>
          <div v-else @click="showHandle" class="group-buy-item">
            <div class="avatar-add-box">
              <van-icon name="plus"/>
            </div>
            <div class="name-box">待邀请</div>
          </div>
        </div>
      </div>
      <div class="group-buy-btn" v-if="groupInfo.state!==1">
        <van-button v-if="isLeader&&groupInfo.state===0" @click="showHandle" block round color="#E02E24">
          <span class="group-buy-btn-text">邀请好友拼单</span>
        </van-button>
        <div v-if="!isLeader&&groupInfo.state===0">
          <div v-if="groupCourses['isNew']">
            <van-button @click="payHandle" block round color="linear-gradient(to right, #FB3523, #FD7F44)">
              <span class="group-buy-btn-text">支付{{groupCourses['newPrice']}}元参加拼团</span>
            </van-button>
          </div>
          <div v-else style="display: flex;justify-content: space-between">
            <van-button
              @click="payHandle"
              style="width: 120px"
              block
              round
              color="linear-gradient(to bottom, #FEB936, #FE8C20)">
              <div style="font-weight: 500;font-size: 13px">马上￥{{groupCourses['disPrice']}}元</div>
              <div style="font-size: 13px" class="group-buy-btn-text">参加拼团</div>
            </van-button>
            <van-button
              @click="payHandle2(2)"
              style="width: 185px"
              block
              round
              color="linear-gradient(to right, #FB3523, #FD7F44)">
              <div style="font-size: 13px">支付￥{{groupCourses['newPrice']}}发起新的拼团</div>
            </van-button>
          </div>
        </div>
        <van-button v-if="groupInfo.state===2" to="/" block round color="#CACACA">
          <span class="group-buy-btn-text">活动已结束，点击返回首页</span>
        </van-button>
        <van-button v-if="groupInfo.state===0" style="margin-top: 15px" plain to="/" block round color="#FFA500">
          <span style="color: #FFA500" class="group-buy-btn-text">返回首页</span>
        </van-button>
      </div>
      <div class="group-buy-btn" v-else>
        <van-button v-if="hasJoin" :to="{path:'/detail',query: {id:coursesVo.id}}" block round color="#E6B982">
          <span class="group-buy-btn-text">去上课</span>
        </van-button>
        <div v-else>
          <van-button
            @click="payHandle2(2)"
            block
            round
            color="linear-gradient(to right, #FB3523, #FD7F44)">
            支付￥{{groupCourses['newPrice']}}发起新的拼团
          </van-button>
        </div>
      </div>
    </div>
    <div class="group-buy-info">
      <van-cell-group>
        <div v-if="isLeader">
          <van-cell size="large">
            <p><span>拼单时间：</span>{{groupInfo['startTime']}}</p>
          </van-cell>
          <van-cell size="large">
            <p><span>拼单详情：</span>{{coursesVo['title']}}</p>
          </van-cell>
        </div>
        <van-cell size="large">
          <p><span>拼单须知：</span>{{groupCourses['description']}}</p>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="course-list">
      <van-cell>
        <template #title>
          <span class="custom-title">更多拼团课程</span>
          <div class="line-tip-box"></div>
        </template>
        <router-link to="/" class="more-course-box">返回首页</router-link>
      </van-cell>
      <card-list @click="goDetailHandle" :recCourses="moreGroupCourses"/>
    </div>
    <Menus/>
    <van-overlay :show="show" @click="show=false">
      <div style="padding: 0 10px;display: flex;flex-direction: column;align-items: center">
        <img style="width: 100%" src="./img/yqhy@2x.png" alt="">
        <div class="friend-box" v-if="friendList.length">
          <div class="title-box">朋友圈推荐语</div>
          <div :key="item.index" @click.stop="doCopy(item.index)" class="inner-box tag"
               v-for="(item,index) in friendList">
            {{item.text}}
            <img v-if="selectFriend===index" src="./img/yxz.png" alt="">
            <img v-else src="./img/wxz.png" alt="">
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {
    getGroupCourses,
    getGroupInfo,
    getPayOrder,
    createGroupOrder
  } from '../../api'
  import {mapGetters} from "vuex";
  import wx from "weixin-js-sdk";
  import {Toast} from 'vant'
  import wxConfigApi from '../../utils/weixinApi'
  import dayjs from 'dayjs'
  import CardList from '../../components/CardList'
  import Menus from '../../components/Menus'
  import {testPlatform} from "../../utils/platform";

  export default {
    name: "index",
    props: ['uid', 'cid'],
    components: {
      CardList,
      Menus
    },
    data() {
      return {
        show: false,
        moreGroupCourses: [],
        coursesVo: {},
        groupInfo: {},
        groupSponsorVos: [],
        groupCourses: {},
        selectFriend: 0,
      };
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      }),
      isLeader() {
        return this.userInfo.uid === this.groupInfo.uid
      },
      hasJoin() {
        const index = this.groupSponsorVos.findIndex(item => item.uid === this.userInfo.uid)
        if (index >= 0) {
          return true
        } else {
          return false
        }
      },
      quota() {
        if (this.groupCourses['people']) {
          return this.groupCourses['people'] - this.groupSponsorVos.length
        } else {
          return 0
        }
      },
      time() {
        if (this.groupInfo['endTime']) {
          return dayjs(this.groupInfo['endTime']).diff(dayjs())
        } else {
          return 0
        }
      },
      friendList() {
        if (this.coursesVo.id === 229) {
          return [
            {
              text: '发现一门好课，隆重推荐给你，对创业很有帮助，通俗易懂，打开了我另一个角度的思考！',
              index: 0
            }, {
              text: '两位大咖联袂，教会你最赚钱的商业模式，拼团价才3.9元，你也一起来吧！',
              index: 1
            }
          ]
        } else if (this.coursesVo.id === 228) {
          return [
            {
              text: '发现一门好课，隆重推荐给你，对目标达成很有帮助，通俗易懂，打开了我另一个角度的思考！',
              index: 0
            }, {
              text: '三位大咖联袂巨献，超低价仅需3.9元，即可学会如何快速达成你想要的任何目标！',
              index: 1
            }
          ]
        } else {
          return []
        }
      }
    },
    created() {
      this._getGroupCourses()
      this._getGroupInfo()
    },
    watch: {
      $route(newValue, oldValue) {
        if (newValue.query.cid !== oldValue.query.cid) {
          this._getGroupCourses()
          this._getGroupInfo()
        }
      }
    },
    methods: {
      doCopy(index) {
        this.$nextTick(() => {
          this.$copyText(this.friendList[index].text).then((e) => {
            this.selectFriend = index
            Toast('文案已复制，快去转发吧')
          }, (e) => {
            Toast('文案复制失败，请重新选择')
          })
        })
      },
      showHandle() {
        this.show = true;
        this.$nextTick(() => {
          if (this.groupCourses['dist']) {
            this.doCopy(0)
          }
        })
      },
      goDetailHandle(id) {
        this.$router.push({path: `/detail?id=${id}`})
      },
      // 获取更多拼团
      _getGroupCourses() {
        getGroupCourses().then(res => {
          this.moreGroupCourses = res
        })
      },
      // 获取拼团信息
      _getGroupInfo() {
        const {uid, cid} = this.$route.query
        getGroupInfo({kid:uid, pid:cid}).then(res => {
          const {coursesInfo, pinkInfos, combinationInfo, count} = res
          this.coursesVo = coursesInfo
          this.groupInfo = pinkInfos[0]
          this.groupSponsorVos = pinkInfos
          this.groupCourses = combinationInfo
          let title = '', subTitle = '';
          if (combinationInfo['dist']) {
            title = pinkInfos.state ? coursesInfo['title'] :
              `【限时3.9元】仅差${combinationInfo['people'] - pinkInfos.length}人拼团成功，${coursesInfo['title']}`
            subTitle = pinkInfos.state ? '你有多位朋友已加入学习，你也来一起学吧！' : coursesInfo['subTitle']
          } else {
            title = pinkInfos.state ? `【限时特价】已有${count * combinationInfo['people']}个朋友正在拼，快来一起学习[${coursesInfo.title}]` :
              `还差${combinationInfo['people'] - pinkInfos.length}人成团～拼团课程「${coursesInfo.title}」`
            subTitle = `圣商在线重磅课程，原价${coursesInfo.price}，${combinationInfo['disPrice']}元拼到手～`
          }
          wxConfigApi({
            title: title,
            subTitle: subTitle,
            link: window.location.origin + window.location.pathname + window.location.hash,
            purl: coursesInfo.purl,
            success: () => {

            }
          })
        })
      },
      // 发起支付
      payHandle() {
        const {userState} = this.coursesVo
        if (testPlatform()) {
          Toast('请在手机端完成支付')
        } else if (userState || this.hasJoin) {
          Toast('您已购买过本课程！');
        } else {
          const data = {
            orderType: 2,
            productId: this.coursesVo.id,
            price: this.coursesVo['isNew'] ? this.groupCourses['newPrice'] : this.groupCourses['disPrice'],
            combinationId:this.groupCourses['id'],
            kid:this.groupInfo['uid']
          }
          createGroupOrder(data).then(res => {
            wx.chooseWXPay({
              timestamp: res.timeStamp,
              nonceStr: res.nonceStr,
              package: res.packageValue,
              signType: res.signType,
              paySign: res.paySign,
              success: () => {
                window.location.reload();
              }
            });
          })
        }
      },
      // 发起支付
      payHandle2(flag) {
        const {userState} = this.coursesVo
        if (testPlatform()) {
          Toast('请在手机端完成支付')
        } else if (userState || this.hasJoin) {
          Toast('您已购买过本课程！');
        } else {
          const data = {
            orderType: 0,
            productId: this.coursesVo.id,
            price: this.coursesVo.price,
          }

          if (flag === 2) {
            data.price = this.groupCourses['newPrice']
            data.combinationId = this.groupCourses['id']
            data.orderType = 1;
            createGroupOrder(data).then(res => {
              wx.chooseWXPay({
                timestamp: res.timeStamp,
                nonceStr: res.nonceStr,
                package: res.packageValue,
                signType: res.signType,
                paySign: res.paySign,
                success: () => {
                  this.$router.replace({path: `/groupBuy?uid=${this.userInfo.uid}&cid=${this.groupCourses.id}`})
                  window.location.reload();
                }
              });
            })
          } else {
            getPayOrder(data).then(res => {
              wx.chooseWXPay({
                timestamp: res.timeStamp,
                nonceStr: res.nonceStr,
                package: res.packageValue,
                signType: res.signType,
                paySign: res.paySign,
                success: () => {
                  // 支付成功后的回调函数
                  this.$router.replace({path: '/paySuccess'})
                }
              });
            })
          }
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .page-box {
    width: 100%;
    height: 100%;
    background: #FAFAFC;

    .group-buy-box {
      width: 100%;
      padding: 30px 30px 30px;
      box-sizing: border-box;
      background: #ffffff;

      .count-down-box {
        width: 100%;
        padding-bottom: 12px;

        h3 {
          font-size: 16px;
          color: #333333;
          font-weight: 500;
          line-height: 22px;
          text-align: center;
        }

        .count-down-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;

          .van-count-down {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .colon {
            display: inline-block;
            margin: 0 5px;
            color: #EE4F4D;
            height: 24px;
            line-height: 24px;
          }

          .block {
            display: inline-block;
            line-height: 24px;
            width: 24px;
            height: 24px;
            color: #fff;
            font-size: 16px;
            text-align: center;
            border-radius: 4px;
            font-weight: normal;
            background-color: #EE4F4D;
          }
        }
      }

      .group-buy-tip-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .group-buy-success {
          font-size: 54px;

          img {
            width: 54px;
            height: 54px;
          }
        }

        p {
          font-size: 18px;
          font-weight: bold;
          line-height: 18px;
          color: #333333;

          span {
            color: #D64848;
          }
        }
      }

      .group-buy-list {
        padding: 8px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        .group-buy-item {
          height: 100px;
          width: 65px;
          margin: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          .avatar-box {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            border: 2px solid #EEC896;
            position: relative;
            display: flex;
            justify-content: center;
          }

          .avatar-add-box {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            border: 1px dashed #E7E8EA;
            background: #F6F7F8;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #E7E8EA;
            font-size: 22px;
          }

          .initiator-box {
            position: absolute;
            bottom: -7px;
            background: linear-gradient(to bottom, #F3D0A0, #DDA96D);
            font-size: 11px;
            color: #785327;
            border: 1px solid #ffffff;
            padding: 4px 8px;
            box-sizing: border-box;
            border-radius: 10px;
          }

          .name-box {
            font-size: 14px;
            color: #666666;
            font-weight: 500;
            line-height: 20px;
            text-align: center;
          }
        }
      }

      .group-buy-btn-text {
        font-size: 15px;
        color: #ffffff;
      }
    }

    .group-buy-info {
      margin-top: 8px;

      .van-cell__value--alone {
        p {
          font-size: 13px;
          color: #333333;
          font-weight: 400;

          span {
            color: #666666;
          }
        }

      }
    }

    .other-group-buy {
      margin-top: 8px;

      .title-box {
        display: flex;
        align-items: center;

        span {
          font-size: 15px;
          color: #333333;
          margin-left: 8px;

        }
      }

      .value-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .other-info-box {
          margin-right: 10px;
          display: flex;
          width: 90px;
          flex-direction: column;

          h5 {
            font-size: 13px;
            color: #333333;
            line-height: 15px;

            span {
              color: #E02E24;
            }
          }

          p {
            font-size: 12px;
            display: flex;
            align-items: center;

            .van-count-down {
              margin-left: 4px;
              font-size: 12px;
              color: #666666;
            }
          }
        }
      }
    }

    .course-list, .group-buy-course {
      margin: 8px 0;

      .van-cell__title {
        font-size: 16px;
        color: #333333;
        font-weight: bold;
      }

      .more-course-box {
        color: #EE4F4D;
        font-size: 12px;
      }

      .van-card {
        background: #ffffff;
        margin-top: 0;

        .van-card__title {
          font-size: 14px;
          color: #222222;
        }

        .price-box {
          color: #C99743;
          font-size: 14px;
        }

        .num-box {
          font-size: 12px;
          color: #666666;
        }
      }
    }
  }

  .friend-box {
    width: 320px;
    height: 330px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;

    .title-box {
      font-size: 18px;
      color: #000000;
      font-weight: 500;
      line-height: 30px;
      text-align: center;
      margin: 30px 0;
    }

    .inner-box {
      position: relative;
      width: 288px;
      height: 92px;
      background: rgba(250, 250, 252, 1);
      border-radius: 5px;
      border: 1px solid rgba(250, 250, 252, 1);
      margin: 10px auto;
      box-sizing: border-box;
      padding: 13px;
      font-size: 14px;
      color: #333333;
      line-height: 20px;

      img {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 0;
        bottom: 0;
      }
    }
  }
</style>
