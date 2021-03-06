<template>
  <div class="container-box">
    <div class="banner-wrap">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="i in 3" :key="i">
          <van-image radius="6px" width="100%" height="184px" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="category-wrap">
      <div class="category-item" v-for="i in 4">
        <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="">
        融班报名
      </div>
    </div>
    <div class="recommend-wrap">
      <div class="title-box">
        高级会议推荐
      </div>
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
              color="#F5CD39"
              type="info">
              <span style="font-size: 13px;color: #130F00;font-weight: bold">立即报名</span>
            </van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="list-wrap">
      <div class="title-box">
        近期会议推荐
      </div>
      <div class="list-box">
        <Item v-for="i in 10" />
      </div>

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
    return {}
  }
}
</script>

<style scoped lang="scss">
.container-box {
  box-sizing: border-box;
  padding: 10px 15px;
  background: #F5F6F7;
  flex: 1;
  overflow: auto;
}

.banner-wrap {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;

  .van-swipe {
    border-radius: 6px;
  }
}

.category-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 0 2px;
  box-sizing: border-box;

  .category-item {
    width: 170px;
    height: 62px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 1px rgba(218, 218, 218, 0.15);
    border-radius: 10px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    padding: 0 10px;
    box-sizing: border-box;

    img {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.recommend-wrap {
  .title-box{
    font-size: 18px;
    font-weight: bold;
    color: #130F00;
    padding: 20px 0;
  }
  .container {
    width: 100%;
    height: 240px;
    background: #FFFFFF;
    box-shadow: 0px 1px 6px 0px #F3F3F4;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 12px 10px;
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
}

.list-wrap{
  .title-box{
    font-size: 18px;
    font-weight: bold;
    color: #130F00;
    padding: 20px 0;
  }
  .list-box{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px 1px 6px 0px #F3F3F4;
    border-radius: 10px;

  }
}
</style>
