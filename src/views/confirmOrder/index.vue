<template>
  <div class="page-box">
    <div class="confirm-order-container">
      <van-cell-group>
        <van-cell>
          <template #title>
            <div class="title-box">
              订单信息
            </div>
          </template>
          <div class="value-box">
            {{payInfo['orderTitle']}}
          </div>
        </van-cell>
        <van-cell>
          <template #title>
            <div class="title-box">
              订单金额
            </div>
          </template>
          <div class="value-box">
            ￥{{payInfo['price']}}
          </div>
        </van-cell>
        <van-cell title-style="flex:3" is-link>
          <template #title>
            <div class="title-box">
              优惠券 <span v-if="!$route.query.to">老学员立减￥{{couponInfo[0]&&couponInfo[0]['price']}}</span>
            </div>
          </template>
          <div class="">
            <span @click="goCouponHandle" v-if="!$route.query.to" style="color: #EDB46F">查看</span>
            <span v-else>暂无优惠 </span>
          </div>
        </van-cell>
        <van-cell title="">
          <div class="value-box">
            合计：￥{{payInfo['price']}}
          </div>
        </van-cell>
      </van-cell-group>
      <div class="pay-type-box">
        <span></span>
        <p>支付方式</p>
      </div>
      <van-cell-group>
        <van-cell value="内容">
          <template #title>
            <div>
              <img
                style="width: 25px;height:22px;margin-right: 10px;vertical-align: middle"
                src="./img/weixin.png" alt=""
              >
              微信支付
            </div>
          </template>
          <van-checkbox style="float: right" v-model="checked"/>
        </van-cell>
      </van-cell-group>
      <div class="btn-box">
        <van-button
          @click="payHandle"
          round
          block
          style="width: 316px;height: 43px;"
          color="linear-gradient(to right, #FCA890, #FE3F38)"
        >
          {{payInfo['price']}} 立即支付
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getPayInfoById,
    getPayInfoById2,
    payByCampOrder,
    payByYearOrder,
    payByEssenceOrder,
    getCoupon,
    payByOrder
  } from '../../api'
  import wx from 'weixin-js-sdk'
  import wxConfigApi from '../../utils/weixinApi';
  import store from "../../store";

  const createPayMap = {
    '/paySuccess': payByOrder,
    '/camp/qrCode': payByCampOrder,
    '/card/publicQrCode': payByYearOrder,
    '': payByEssenceOrder,
  }

  export default {
    name: "index",
    data() {
      return {
        checked: true,
        payInfo: {},
        couponInfo:[]
      }
    },
    created() {
      this._getPayInfoById()
      getCoupon().then(res=>{
        this.couponInfo=res;
      })
    },
    mounted() {
      wxConfigApi({
        title: '',
        subTitle: '',
        link: location.href,
        purl: ''
      })
    },
    methods: {
      payHandle() {
        if (!this.payInfo['orderId']) return;
        const form = new FormData();
        form.append('orderId', this.payInfo['orderId']);
        const {to} = this.$route.query;
        createPayMap[decodeURIComponent(to)](form).then(res => {
          if (!to) {
            const {flag,result} = res;
            if(flag==='1'){
              wx.chooseWXPay({
                timestamp: result.timeStamp,
                nonceStr: result.nonceStr,
                package: result.packageValue,
                signType: result.signType,
                paySign: result.paySign,
                success: () => {
                  store.dispatch('user/getInfo').then(() => {
                    this.$router.replace({
                      path: '/card/essenceQrCode',
                    })
                  })
                }
              });
            }else {
              store.dispatch('user/fedLogOut').then(() => {
                window.location.href = result
              })
            }
          }else {
            wx.chooseWXPay({
              timestamp: res.timeStamp,
              nonceStr: res.nonceStr,
              package: res.packageValue,
              signType: res.signType,
              paySign: res.paySign,
              success: () => {
                store.dispatch('user/getInfo').then(() => {
                  this.$router.replace({
                    path: decodeURIComponent(to),
                  })
                })
              }
            });
          }
        })
      },
      goCouponHandle() {
        this.$router.push({
          path: '/coupon',
          query:this.$route.query
        })
      },
      _getPayInfoById() {
        const {orderId, to} = this.$route.query
        if (to === '') {
          getPayInfoById2({id: orderId}).then(res => {
            this.payInfo = res;
          })
        } else {
          getPayInfoById({id: orderId}).then(res => {
            this.payInfo = res;
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .confirm-order-container {
    width: 100%;
    height: 100vh;
    background: #F7F8FA;

    .pay-type-box {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      padding: 10px 0;
      margin-top: 20px;

      span {
        margin-right: 10px;
        display: inline-block;
        width: 3px;
        height: 13px;
        background: #E25C5A;
      }

      p {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        line-height: 22px;
      }
    }

    .title-box {
      font-size: 14px;
      font-weight: 500;
      color: #000001;
      width: 80%;

      span {
        width: 132px;
        height: 22px;
        display: inline-block;
        background: linear-gradient(270deg, #202122 0%, #4D4E4B 100%);
        border-radius: 11px;
        text-align: center;
        line-height: 22px;
        font-size: 12px;
        color: #FDD9BA;
      }
    }

    .value-box {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #101010;
    }

    .btn-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      bottom: 35px;
    }
  }
</style>
