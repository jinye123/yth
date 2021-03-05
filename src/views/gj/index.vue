<template>
  <div class="container-box">
    <div class="list-wrap">
      <Item v-for="i in 10" />
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

}
</style>
