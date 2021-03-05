<template>
  <div class="page-box">
    <div class="year-card-container">
      <div class="content" v-html="cardInfo.describe"></div>
      <div class="pay-box" v-if="!cardInfo['isBuy']&&!Number($route.query.index)">
        <div class="text-box">
          理财营【限时<span style="font-weight: bold;font-size: 16px;color: #FB5756;">{{cardInfo.price}}</span>元】原价<span
          style="text-decoration: line-through;">199</span>元
        </div>
        <div @click="payHandle" class="btn-box">马上抢</div>
      </div>
      <div class="pay-box" v-else-if="!cardInfo['isBuy']">
        <div class="text-box">
          公开学院年卡用户专享
        </div>
        <van-button :to="`/card?flag=1&id=${userInfo['vipInfo']['public']['cardId']}`" class="btn-box">开通年卡</van-button>
      </div>
      <div class="pay-box" v-else>
        <van-button
          to="/card/publicQrCode"
          color="linear-gradient(to right, #F88C30, #FB4B3F)"
          style="width: 100%;height: 100%"
        >
          查看二维码
        </van-button>
      </div>

      <div class="share-box">
        <div v-if="!Number($route.query.index)" class="share-item" @click="$router.push({path:'/camp/hb',query:{id:$route.query.id}})">
          <img src="./img/hb.png" class="img-box"/>
        </div>
<!--        <div class="share-item" @click="$router.push({path:'/'})">-->
<!--          <div class="home-icon-box">-->
<!--            <span style="size: 16px;font-weight: bold" class="icon icon-shouye1"></span>-->
<!--            <p style="font-size: 8px">返回首页</p>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getUserWatch,
    getCampInfo,
    onLineInvitationCheck,
    getPayOrder
  } from '../../api'
  import wxConfigApi from '../../utils/weixinApi';
  import {mapGetters} from "vuex";
  import store from '@/store'

  export default {
    name: "trainCamp",
    data() {
      return {
        cardInfo: {},
        bshInfo: {}
      }
    },
    async mounted() {

      await this._getUserWatch()

      const {openid, unionid, shareId} = this.$route.query

      if (!openid) {
        setTimeout(()=>{
          const {unionId}=store.getters.userInfo
          window.location.href = `${process.env.VUE_APP_BASE_API_BSH}/api/wx/onLineAuth?cb=${encodeURIComponent(window.location.href)}&unionid=${unionId}`
        },300)
      } else {
        onLineInvitationCheck({
          "unionid": unionid,
          "openid": openid,
          "op_unionid": shareId,
          "nickname": this.userInfo.nickname,
        }).then(res => {
          this.bshInfo = res;
        })
        this._getCampInfo()
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      }),
    },
    methods: {
      payHandle() {
        if (!this.cardInfo.id) return;
        const {shareId} = this.$route.query
        getPayOrder({
          orderType: 4,
          productId: this.cardInfo.id,
          price: this.cardInfo.price,
          shareId: shareId,
          inviteUnionid: this.bshInfo.op_unionid,
          isOrg: this.bshInfo.isOrg
        }).then(res => {
          this.$router.push({
            path: '/confirmOrder',
            query: {
              orderId: res,
              to: encodeURIComponent('/camp/qrCode'),
            }
          })
        })
      },
      _getCampInfo() {
        const {shareId, id} = this.$route.query
        getCampInfo(id, {shareId}).then(res => {
          const {isBuy} = res
          if (isBuy) {
            this.$router.replace({path: `/camp/qrCode`, query: {id: id}})
            return;
          }
          this.cardInfo = res;
          wxConfigApi({
            title: this.cardInfo.title,
            subTitle: this.cardInfo.subTitle,
            link: location.href.split('#')[0] + `#/camp?id=${id}&shareId=${this.userInfo.unionId}`,
            purl: this.cardInfo.purl,
          })
        })
      },
      async _getUserWatch() {
        await getUserWatch().catch(() => {
          this.$router.push({path: '/camp/follow'})
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .year-card-container {
    width: 100%;
    height: 100%;
    background: #ffffff;

    .content {
      width: 100%;
      font-size: 14px;
      box-sizing: border-box;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;
      padding-bottom: 40px;
    }

    .content::v-deep img {
      width: 100%;
    }

    img {
      width: 100%;
    }

    .pay-box {
      width: 100%;
      height: 49px;
      background: #FFFFFF;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      display: flex;
      align-items: center;

      .text-box {
        flex: 1;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #333333;
      }

      .btn-box {
        width: 135px;
        height: 49px;
        box-sizing: border-box;
        background: linear-gradient(270deg, #FE3F38 0%, #FCA890 100%);
        text-align: center;
        line-height: 49px;
        color: #ffffff;
        font-weight: bold;
        font-size: 15px;
      }
    }

    .share-box {
      position: fixed;
      right: 10px;
      bottom: 70px;

      .share-item {
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .img-box {
          width: 40px;
        }

        p {
          color: #333333;
          font-size: 9px;
          line-height: 15px;
        }

        .home-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #333333;
          box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
</style>
