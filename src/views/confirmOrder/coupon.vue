<template>
  <div class="page-box">
    <div class="coupon-container">
      <div class="coupon-list">
        <div class="coupon-item" v-for="item in couponList">
          <div class="left">
            <div class="title-box">老学员专享优惠券</div>
            <div class="price-box"><span style="font-size: 16px;">￥</span>{{item.price}}</div>
          </div>
          <div class="right">
            <div @click="checkCouponHandle" class="btn-box" v-if="isChecked">
              立即使用
            </div>
            <div @click="goCheckHandle" class="btn-box" v-else>
              立即认证
            </div>
          </div>
        </div>
      </div>
      <div class="coupon-detail">
        <div class="title-box">
          老学员专享优惠说明：
        </div>
        <div class="sub-title">
          <span></span>1.老学员是什么身份？
        </div>
        <div class="text-box">
          老学员：参加过圣商精华及以上级别课程的学员，包括精华学员，高级学员，我命由我，IC投资家俱乐部以及战融班的学员统称为老学员！
        </div>
        <div class="sub-title">
          <span></span>2、老学员如何认证？
        </div>
        <div class="text-box">
          点击页面中的“立即认证”开始验证身份：输入身份证号——输入手机号（圣商报名时预留的手机号）——获取验证码——验证成功。
        </div>
        <div class="sub-title">
         <span></span>3、老学员享受的权益？
        </div>
        <div class="text-box">
          老学员身份认证通过后，原价 2599元的精华学院年卡包立减 2000元，以599元的价格购买！精华学院年卡包中除线下精华会议的参与权外，所有权益老学员均可享受！
        </div>
        <div class="sub-title">
          <span></span>4.其他说明
        </div>
        <div class="text-box">
          如果老学员希望学习线下精华研讨会课程，需按照1999元购买（此价格无需老用户认证），如使用优惠券，599元购买后不包含线下精华研讨会课程。<br/>
          最终解释权归北京圣商教育科技股份有限公司所有！
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    checkUserAuth,
    checkCoupon,
    getCoupon
  } from '../../api'
  export default {
    name: "coupon",
    data(){
      return{
        isChecked:'',
        couponList:[]
      }
    },
    created() {
      getCoupon().then(res=>{
        this.couponList=res;
      })
      checkUserAuth().then(res=>{
        this.isChecked=res;
      })
    },
    methods:{
      checkCouponHandle(){
        checkCoupon({
          id:this.$route.query.orderId
        }).then(()=>{
          this.$router.push({
            path:'/confirmOrder',
            query:this.$route.query
          })
        })
      },
      goCheckHandle(){
        this.$router.push({path:'/authenticate'})
      }
    }
  }
</script>

<style scoped lang="scss">
  .coupon-container {
    width: 100%;
    height: 100vh;
    background: #ffffff;

    .coupon-list {
      width: 100%;
      background: #00184C;
      padding: 20px 26px;
      box-sizing: border-box;

      .coupon-item {
        width: 324px;
        height: 95px;
        background: url("./img/coupon.png");
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10px 0 20px;
        .left{

          .title-box{
            font-size: 16px;
            font-weight: bold;
            color: #6C4218;
            line-height: 32px;
          }
          .price-box{
            font-size: 23px;
            font-weight: bold;
            color: #EB4548;
            line-height: 32px;
          }
        }
        .right{

          .btn-box{
            width: 80px;
            height: 32px;
            background: #F1544A;
            box-shadow: 0px 1px 4px 0px #F58780;
            border-radius: 5px;
            font-size: 15px;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 32px;
            text-align: center;
          }
        }
      }
    }
    .coupon-detail{
      padding: 20px;
      .title-box{
        font-size: 18px;
        font-weight: 500;
        color: #000001;
        line-height: 32px;
        box-sizing: border-box;
        padding: 10px 0;
      }
      .sub-title{
        font-size: 13px;
        font-weight: 500;
        color: #616363;
        line-height: 32px;
        span{
          display: inline-block;
          width: 4px;
          height: 4px;
          background: #CCCDCF;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .text-box{
        font-size: 12px;
        font-weight: 400;
        color: #616363;
        line-height: 18px;
        padding-left: 10px;
      }
    }
  }
</style>
