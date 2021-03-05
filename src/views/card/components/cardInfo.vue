<template>
  <div>
    <div class="content" v-html="cardInfo.describe"></div>
    <div class="pay-box" v-if="vipInfo['isBuy']">
      <van-button
        :to="orderType===3?`/card/publicQrCode`:`/card/essenceQrCode`"
        color="linear-gradient(to right, #F88C30, #FB4B3F)"
        style="width: 50%;height: 100%"
      >
        查看二维码
      </van-button>
      <van-button
        @click="payHandle"
        style="width: 50%;height: 100%"
        color="linear-gradient(to right, #FAB45C, #FFDFB1)"
      >
          <span style="color: #843800;font-size: 15px;font-weight: bold;">
            ¥ {{cardInfo.price}} 立即续费
          </span>
      </van-button>
    </div>
    <div class="pay-box" v-else>
      <div class="text-box">
        <span>¥ {{cardInfo.price}}</span> 百门好课等你来
      </div>
      <div @click="payHandle" class="btn-box">马上抢</div>
    </div>
  </div>
</template>

<script>
  import {
    getPayOrder,
    getCardInfo,
  } from "../../../api";
  import wxConfigApi from "../../../utils/weixinApi";
  import {mapGetters} from "vuex";

  export default {
    name: "cardInfo",
    props:['bshInfo', 'orderType', 'vipInfo'],
    data() {
      return {
        cardInfo: {},
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      }),
    },
    mounted() {
      this._getCardInfo()
    },
    methods: {
      shareHandle(){
        wxConfigApi({
          title: this.cardInfo.title,
          subTitle: this.cardInfo.subTitle,
          link: location.href.split('#')[0] + `#/card?id=${this.vipInfo.cardId}&shareId=${this.userInfo.unionId}`,
          purl: this.cardInfo.purl,
        })
      },
      payHandle() {
        if (!this.cardInfo.id) return;
        getPayOrder({
          orderType: this.orderType,
          valid:this.$route.query.valid,
          productId: this.cardInfo.id,
          price: this.cardInfo.price,
          shareId: this.$route.query.shareId,
          inviteUnionid: this.bshInfo.op_unionid,
          isOrg: this.bshInfo.isOrg
        }).then(res => {
          const to = this.orderType===3?encodeURIComponent('/card/publicQrCode'):''
          this.$router.push({
            path:'/confirmOrder',
            query:{
              to,
              orderId:res,
            }
          })
        })
      },
      _getCardInfo() {
        const {shareId,valid} = this.$route.query
        getCardInfo(this.vipInfo.cardId, {shareId, valid}).then(res => {
          this.cardInfo = res;
          this.shareHandle()
        })
      }
    }
  }
</script>


<style scoped lang="scss">
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
    bottom: 0px;
    display: flex;
    align-items: center;

    .text-box {
      flex: 1;
      text-align: center;
      line-height: 49px;
      font-size: 16px;
      font-weight: bold;
      color: #333333;

      span {
        color: #FB5756;
      }
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

</style>
