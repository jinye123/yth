<template>
  <div class="share-box" @click="goHomeHandle">返回首页</div>
</template>

<script>
  export default {
    name: "GoHome",
    methods:{
      goHomeHandle(){
        this.$router.push({path:'/'})
      },
    }
  }
</script>

<style lang="scss" scoped>
  .share-box{
    position: fixed;
    z-index: 1;
    right: 0;
    bottom: 100px;
    box-sizing: border-box;
    width: 76px;
    height: 30px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
    border-radius: 15px 0px 0px 15px;
    font-size: 12px;
    font-weight: bold;
    color: #aaaaaa;
    line-height: 30px;
    text-align: center;
  }
</style>
