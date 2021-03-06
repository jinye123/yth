<template>
  <div class="page-box">
    <div class="pay-container">
      <div class="list-wrap">
        <Item />
      </div>
      <div class="detail-box">
        <div class="text-box">线上支付 剩余123</div>
        <div class="price-box">
          精华研讨会门票 <span>￥1999</span>
        </div>
        <div class="tip-box">注：本门票出售后不允许退款，请确认后支付</div>
      </div>
      <a class="pay-other" href="/">
        找他人代付
      </a>
    </div>
    <div class="bottom-btn">
      <van-button color="#F5CD39" type="primary" block>
        <span style="color: #130F00;font-size: 15px;">极速付款</span>
      </van-button>
    </div>
  </div>
</template>

<script>
import Item from '../../components/item'
export default {
  name: "index",
  components:{
    Item
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.page-box {
  .pay-container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    .list-wrap{
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      background: #ffffff;
      box-shadow: 0px 1px 6px 0px #F3F3F4;
      border-radius: 10px;
    }
    .detail-box{
      width: 100%;
      height: 116px;
      background: #FFFBEF;
      border-radius: 10px;
      border: 1px solid #FFD640;
      margin-top: 20px;
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .text-box{
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
      }
      .price-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 17px;
        font-weight: bold;
        color: #333333;
        line-height: 24px;
        span{
          color: #EA8833;
        }
      }
      .tip-box{
        font-size: 12px;
        font-weight: 400;
        color: #F24841;
        line-height: 17px;

      }
    }
    .pay-other{
      margin-top: 20px;
      float: right;
      font-size: 13px;
      font-weight: 500;
      color: #2B5FCC;
      text-decoration:underline;
      line-height: 18px;
    }
  }
  .bottom-btn{
    position: fixed;
    bottom: 0;
    width: 100%;
  }

}

</style>
