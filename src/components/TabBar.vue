<template>
  <div>
    <van-tabbar inactive-color="#999999" active-color="#D64848" fixed route>
      <van-tabbar-item to="/home" icon-prefix="icon" icon="icon icon-shouye">
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/card/cardList" icon="card" >
        消息
      </van-tabbar-item>
      <van-tabbar-item to="/my" icon-prefix="icon" icon="icon icon-wode">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

  export default {
    name: 'TabBar',
    data() {
      return {
        active: 0
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
