<template>
  <div class="container">
    <div class="img-box">
      <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="">
    </div>
    <div class="title-box van-ellipsis">
      科创时代之《资本利润》高级研讨会71期
    </div>
    <div class="bottom-box">
      <div class="left-box">
        <div class="item-box">
          <van-icon style="margin-right: 4px" name="clock-o" />
          <span style="width: 212px;display: inline-block" class="van-ellipsis">
                2021年03月10日—03月13日
              </span>
        </div>
        <div class="item-box">
          <van-icon style="margin-right: 4px" name="location-o" />
          <span style="width: 212px;display: inline-block" class="van-ellipsis">苏州市吴中工业园区国宾路1号金鸡哈哈哈哈哈哈哈哈哈湖</span>
        </div>
      </div>
      <div class="right-box">
        <van-button
          style="width:84px;height: 32px"
          round
          size="small"
          color="#F5CD39"
          type="info">
          <span style="font-size: 13px;color: #130F00;font-weight: bold">立即报名</span>
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "item"
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 240px;
  background: #FFFFFF;
  box-shadow: 0px 1px 6px 0px #F3F3F4;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 12px 10px;
  margin-bottom: 15px;
  .img-box{
    width: 325px;
    height: 130px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .title-box{
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #222222;
    line-height: 16px;
    padding: 20px 0;
  }
  .bottom-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-box{
      flex: 1;
      .item-box{
        color: #747677;
        font-size: 12px;
        line-height: 14px;
      }
    }
    .right-box{
      width: 84px;
    }
  }
}
</style>
