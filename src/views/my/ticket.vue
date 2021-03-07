<template>
  <div class="page-box">
    <div class="body-container">
      <van-tabs
        title-inactive-color="#696A6B"
        title-active-color="#373839"
        color="#F2D14B"
        line-height="2px"
        line-width="22px"
        style="flex: none"
      >
        <van-tab title-style="flex:none" title="公开">
          <div class="list-wrap">
            <TicketItem :used="i" v-for="i in 3" />
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="精华">
          <div class="list-wrap">
            <TicketItem :used="i" v-for="i in 5" />
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="高级">
          <div class="list-wrap">
            <TicketItem :used="i" v-for="i in 4" />
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="IC">
          <div class="list-wrap">
            <TicketItem :used="i" v-for="i in 3" />
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="我命由我">
          <div class="list-wrap">
            <TicketItem :used="i" v-for="i in 5" />
          </div>
        </van-tab>
        <van-tab title-style="flex:none" title="其他">
          <div class="list-wrap">
            <TicketItem :used="i" v-for="i in 4" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import TicketItem from '../../components/ticketItem'
export default {
  name: "ticket",
  components:{
    TicketItem
  }
}
</script>

<style scoped lang="scss">
.body-container {
  width: 100%;
  flex: 1;
  background: #F5F6F7;
  box-sizing: border-box;
  .list-wrap{
    width: 100%;
    padding: 15px 0;
    box-sizing: border-box;
  }
}
</style>
