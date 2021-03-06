<template>
  <div class="page-box container-box">
    <div class="header-container">
      <div class="header-left">
        <van-icon style="font-size: 16px" name="location"/>
        黑龙江
      </div>
      <div class="header-right" @click="searchHandle">
        <van-icon style="margin-right: 10px" size="16" name="search" />搜索会议
      </div>
    </div>
    <div class="body-container">
      <van-tabs
        title-inactive-color="#696A6B"
        title-active-color="#373839"
        color="#F2D14B"
        line-height="2px"
        line-width="22px"
        style="flex: none"
      >
        <van-tab title-style="flex:none" title="精选">
          <Jx />
        </van-tab>
        <van-tab title-style="flex:none" title="公开">
          <Gk />
        </van-tab>
        <van-tab title-style="flex:none" title="精华">
          <Jh />
        </van-tab>
        <van-tab title-style="flex:none" title="高级">
          <Gj />
        </van-tab>
        <van-tab title-style="flex:none" title="直播">
          <liveTv />
        </van-tab>
        <van-tab title-style="flex:none" title="其他">
          <Qt />
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
}
.body-container{
  width: 100%;
  flex: 1;
  background: #ffffff;
  box-sizing: border-box;
}

</style>
