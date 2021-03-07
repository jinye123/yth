<template>
  <div class="item-box" @click="clickHandle">
    <div class="header-box">
      <div class="left-box"></div>
      订单编号：10238019238
      <span>倒计时 29 : 39</span>
    </div>
    <div class="middle-box">
      <p>会议信息<span>科创时代之《资本利润》公开研讨会广州</span></p>
      <p>票种信息<span>精华研讨会门票（¥1999）1张</span></p>
    </div>

    <div class="bottom-box">
      <div class="left-box">
        订单金额 <span> ¥1999</span>
      </div>
      <van-button
        v-if="true"
        style="width:84px;height: 32px"
        round
        size="small"
        color="#F5CD39"
        type="info">
        <span style="font-size: 13px;color: #130F00">去支付</span>
      </van-button>
      <van-button
        v-if="false"
        style="width:84px;height: 32px"
        round
        size="small"
        color="#DEDEDE"
        type="info">
        <span style="font-size: 13px;color: #ffffff">去支付</span>
      </van-button>
      <van-button
        v-if="false"
        plain
        style="width:84px;height: 32px"
        round
        size="small"
        color="#F0A705"
        type="info">
        <span style="font-size: 13px;color: #F0A705">收看收据</span>
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  data() {
    return {}
  },
  methods: {
    clickHandle() {
      this.$router.push('/meeting')
    }
  }
}
</script>

<style scoped lang="scss">
.item-box {
  width: 100%;
  height: 180px;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;

  .header-box {
    width: 100%;
    height: 52px;
    border-bottom: 1px solid #EFEFEF;
    font-size: 14px;
    font-weight: 500;
    color: #130F00;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-box{
      width: 4px;
      height: 15px;
      background: #F2D14B;
      position: absolute;
      left: 0;
    }
    span{
      font-size: 13px;
      font-weight: 400;
      color: #F24841;
      line-height: 18px;
    }
  }

  .middle-box {
    flex: 1;
    p{
      font-size: 12px;
      font-weight: 400;
      color: #130F00;
      margin-top: 15px;
      span{
        color: #666666;
        margin-left: 15px;
      }
    }
  }

  .bottom-box {
    height: 52px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-box {
      font-size: 12px;
      font-weight: 500;
      color: #130F00;
      line-height: 12px;
      span{
        margin-left: 15px;
        color: #EA8833;
      }
    }
  }

}
</style>
