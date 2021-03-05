<template>
  <div class="container-box">
    <div class="list-wrap">
      <div class="list-box">
        <Item v-for="i in 10" />
      </div>
    </div>
  </div>
</template>

<script>
import Item from './item'
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
.list-wrap{
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
