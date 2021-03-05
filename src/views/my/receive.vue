<template>
  <div class="course-list">
    <div class="receive-box" v-for="item in receiveList">
      <img v-if="item['state']" class="received" src="./imgs/received.png" alt="">
      <div style="position: absolute;left: 34px;bottom: 28px;font-size: 10px;width: 180px;line-height: 14px;color: #563210">
        该产品为虚拟产品，一旦领取无法界定是否收听，无法退款，请您知悉！
      </div>
      <van-button
        v-if="item['state']"
        plain
        round
        size="small"
        style="background:rgba(0,0,0,0);width: 87px;height: 31px;position: absolute;right: 40px;bottom: 30px"
        to="/my/receiveCode"
        color="#E6B257"
      >
        <span style="font-weight: bold">查看</span>
      </van-button>
      <van-button
        v-else
        round
        size="small"
        style="width: 87px;height: 31px;position: absolute;right: 40px;bottom: 30px"
        color="linear-gradient(to right, #FFD99C, #E8AB65)"
        @click="receiveHandle"
      >
        <span style="color: #563210;font-weight: bold">立即领取</span>
      </van-button>
    </div>
    <van-empty style="height: 100vh" v-if="!receiveList.length" description="暂无数据!"/>
    <GoHome />
  </div>
</template>

<script>
import {
  getMyReceive,
  authReceive
} from '../../api'
import GoHome from '../../components/GoHome'

export default {
  name: "purchased",
  data() {
    return {
      receiveList: [],
    }
  },
  components:{
    GoHome
  },
  created() {
    this._getMyReceive()
  },
  methods: {
    receiveHandle(){
      authReceive().then(()=>{
        this._getMyReceive()
      })
    },
    _getMyReceive() {
      getMyReceive().then(res => {
        this.receiveList=res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.course-list {
  min-height: 100vh;
  background: #ffffff;
  .receive-box{
    width: 100%;
    height: 140px;
    background: url("./imgs/receive.png");
    background-size: 100%;
    position: relative;
    .received{
      width: 50px;
      position: absolute;
      top: 10px;
      right: 20px;
    }
  }
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
