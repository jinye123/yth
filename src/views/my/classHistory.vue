<template>
  <div class="page-box">
    <div class="body-container">
      <van-tabs
        swipe-threshold="3"
        title-inactive-color="#696A6B"
        title-active-color="#373839"
        color="#F2D14B"
        line-height="3px"
        line-width="22px"
      >
        <van-tab title-style="flex:none" title="公开">
          <div class="list-wrap">
            <van-collapse
              style="background: #F5F6F7"
              v-model="activeNames">
              <van-collapse-item
                is-link
                style="background:#F5F6F7"
                title="已签到"
                name="1"
              >
                <div style="width: 100%;background:  #F5F6F7">
                  <Item v-for="i in 2"/>
                </div>
              </van-collapse-item>
              <van-collapse-item is-link="false" title="已过期" name="2">
                <Item v-for="i in 2"/>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="精华">
          <div class="list-wrap">
            <van-collapse v-model="activeNames">
              <van-collapse-item is-link="false" title="已签到" name="1">
                <Item v-for="i in 2"/>
              </van-collapse-item>
              <van-collapse-item title="已过期" name="2">
                <Item v-for="i in 2"/>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="高级">
          <div class="list-wrap">
            <van-collapse v-model="activeNames">
              <van-collapse-item title="已签到" name="1">
                <Item v-for="i in 2"/>
              </van-collapse-item>
              <van-collapse-item title="已过期" name="2">
                <Item v-for="i in 2"/>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="其他">
          <div class="list-wrap">
            <van-collapse v-model="activeNames">
              <van-collapse-item title="已签到" name="1">
                <Item v-for="i in 2"/>
              </van-collapse-item>
              <van-collapse-item title="已过期" name="2">
                <Item v-for="i in 2"/>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Item from '../../components/historyItem'

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
    padding: 15px 0;
    box-sizing: border-box;
  }
}
</style>
