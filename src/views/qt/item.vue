<template>
  <div class="item-box">
    <div class="left-box">
      <div>
        <div class="title-box">
          科创时代之《资本利润》公开研讨会-天津
        </div>
      </div>
      <div class="bottom-box">
        <div class="bottom-item-box">
          <van-icon style="margin-right: 4px" name="clock-o" />
          <span style="width: 150px;display: inline-block" class="van-ellipsis">
                2020/06/06—06/09
          </span>
        </div>
        <div class="bottom-item-box">
          <van-icon style="margin-right: 4px" name="location-o" />
          <span style="width: 110px;display: inline-block" class="van-ellipsis">
            苏州市吴中工业园区国宾路1号金鸡哈哈哈哈哈哈哈哈哈湖
          </span>
          <span style="font-size: 18px;color: #EA8833">
            1999
          </span>
        </div>
      </div>
    </div>
    <div class="right-box">
      <van-image
        radius="4px"
        width="130px"
        height="84px"
        fit="contain"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "item"
}
</script>

<style scoped lang="scss">
.item-box{
  width: 100%;
  height: 125px;
  padding: 15px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #EFEFEF;
  background: #ffffff;
  display: flex;
  .left-box{
    flex: 1;
    padding-right: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title-box{
      font-weight: 500;
      color: #222222;
      line-height: 22px;
      font-size: 16px;
    }
    .bottom-box{
      .bottom-item-box{
        color: #747677;
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
}
</style>
