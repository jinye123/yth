<template>
  <div class="page-box container-box">
    <div class="header-container">
      <div class="header-left" @click="selectAddressHandle">
        <van-icon style="font-size: 16px" name="location"/>
        黑龙江
      </div>
      <div class="header-right" @click="searchHandle">
        <van-icon style="margin-right: 10px" size="16" name="search"/>
        搜索会议
      </div>
      <transition name="van-fade">
        <div class="address-list" v-show="showAddress">
          <div class="address-item" v-for="i in 30">
            全国
          </div>
        </div>
      </transition>
    </div>
    <div class="body-container">
      <van-tabs
        :swipe-threshold="3"
        title-inactive-color="#696A6B"
        title-active-color="#373839"
        color="#F2D14B"
        line-height="3px"
        line-width="22px"
        style="flex: none"
      >
        <van-tab title-style="flex:none" title="精选">
          <Jx/>
        </van-tab>
        <van-tab title-style="flex:none" title="公开">
          <Gk/>
        </van-tab>
        <van-tab title-style="flex:none" title="精华">
          <Jh/>
        </van-tab>
        <van-tab title-style="flex:none" title="高级">
          <Gj/>
        </van-tab>
        <van-tab title-style="flex:none" title="直播">
          <liveTv/>
        </van-tab>
        <van-tab title-style="flex:none" title="其他">
          <Qt/>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Jx from '../jx'
import Gk from '../gk'
import Jh from '../jh'
import Gj from '../gj'
import liveTv from '../liveTv'
import Qt from '../qt'

export default {
  data() {
    return {
      searchValue: '',
      showAddress: false,
    }
  },
  components: {
    Jx,
    Gk,
    Jh,
    Gj,
    liveTv,
    Qt
  },
  computed: {},
  created() {

  },
  methods: {
    searchHandle() {
      this.$router.push('/search')
    },
    selectAddressHandle() {
      this.showAddress = !this.showAddress
    }
  }
}
</script>
<style scoped lang="scss">
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px 15px;
  background: #ffffff;
  position: relative;

  .header-left {
    font-size: 13px;
    font-weight: 400;
    color: #303132;
    line-height: 18px;
    display: flex;
    align-items: center;
  }

  .header-right {
    width: 278px;
    height: 25px;
    border-radius: 13px;
    background: #F3F4F5;
    font-weight: 400;
    font-size: 12px;
    color: #949495;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .address-list {
    position: absolute;
    width: 100%;
    left: 0;
    top: 50px;
    z-index: 100;
    background: #ffffff;
    box-sizing: border-box;
    padding: 10px 0;
    box-shadow: 0px 3px 4px 2px rgba(218, 218, 218, 0.15);
    border-radius: 0px 0px 5px 5px;

    .address-item {
      display: inline-block;
      background: #F2F3F4;
      border-radius: 5px;
      padding: 8px 15px;
      color: #333333;
      font-size: 12px;
      margin-bottom: 12px;
      margin-left: 15px;
    }
  }
}

.body-container {
  width: 100%;
  flex: 1;
  background: #ffffff;
  box-sizing: border-box;
}

</style>
