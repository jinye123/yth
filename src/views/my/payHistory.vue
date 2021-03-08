<template>
  <div class="page-box">
    <div class="body-container">
      <van-tabs
        swipe-threshold="2"
        title-inactive-color="#696A6B"
        title-active-color="#373839"
        color="#F2D14B"
        line-height="3px"
        line-width="22px"
      >
        <van-tab title-style="flex:none" title="已缴费">
          <div class="list-wrap">
            <Item v-for="i in 3" />
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="待缴费">
          <div class="list-wrap">
            <Item v-for="i in 3" />
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="已过期">
          <div class="list-wrap">
            <Item v-for="i in 3" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Item from '../../components/payItem'

export default {
  name: "ticket",
  components: {
    Item
  },
  data() {
    return {
      activeNames: ['1'],
    };
  },
}
</script>

<style lang="scss">
.body-container {
  width: 100%;
  flex: 1;
  background: #F5F6F7;
  box-sizing: border-box;

  .list-wrap {
    width: 100%;
    padding: 15px 10px;
    box-sizing: border-box;
  }

  /deep/ .van-collapse-item__content {
    background: #F5F6F7 !important;
  }
  /deep/ .van-cell{
    background: #F5F6F7 !important;
  }
}
</style>
