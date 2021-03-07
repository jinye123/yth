<template>
  <div class="item" :class="used===3?'user-item':''">
    <div class="item-inner">
      <div class="left-box">
        <div class="top-box">免费</div>
        <div class="bottom-box">公开门票</div>
      </div>
      <div class="right-box">
        <div class="top-box">
          <div class="name-box">科创时代之资本利润公开研讨会</div>
          <div class="time-box">有效期：2021-03-06至2021-03-11</div>
          <div class="btn-box" v-if="used!==3">立即签到</div>
        </div>
        <div class="bottom-box">NO.100020210311000103</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ticketItem",
  props: ['used']
}
</script>

<style scoped lang="scss">
.item {
  background: url("../views/my/img/ticket.png");
  background-size: 100% 100%;
  width: 100%;
  height: 120px;

  .item-inner {
    height: 100%;
    padding: 5px 15px;
    box-sizing: border-box;
    display: flex;

    .left-box {
      height: 100%;
      width: 110px;

      .top-box {
        color: #FFFFFF;
        height: 85px;
        text-align: center;
        line-height: 85px;
        font-size: 26px;
        font-weight: bold;
      }

      .bottom-box {
        height: 25px;
        text-align: center;
        line-height: 25px;
        color: #9F6B27;
        font-size: 12px;
      }
    }

    .right-box {
      flex: 1;
      box-sizing: border-box;
      padding: 0 10px;

      .top-box {
        width: 100%;
        height: 85px;

        .name-box {
          width: 100%;
          font-size: 14px;
          font-weight: bold;
          color: #130F00;
          padding: 10px 0;
        }

        .time-box {
          width: 100%;
          font-size: 10px;
          font-weight: 500;
          color: #696A6B;
          line-height: 14px;
        }

        .btn-box {
          float: right;
          width: 60px;
          height: 21px;
          background: #F5CD39;
          border-radius: 11px;
          font-size: 10px;
          font-weight: 500;
          color: #130F00;
          line-height: 21px;
          text-align: center;
          margin-top: 10px;

        }
      }

      .bottom-box {
        height: 25px;
        line-height: 25px;
        color: #696A6B;
        font-size: 10px;
      }
    }
  }
}
.user-item{
  background: url("../views/my/img/ticket2.png");
  background-size: 100% 100%;
  width: 100%;
  height: 120px;
  .item-inner{
    opacity: 0.5;
  }
}
</style>
