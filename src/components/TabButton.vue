<template>
  <div class="tab-button-container">
    <div class="tab-item-box" @click="handleClick(0)">
      <div class="icon-box">
        <van-icon name="orders-o" />
      </div>
      <div class="text-box">
        课程目录
      </div>
    </div>
    <div class="tab-item-box" @click="handleClick(1)">
      <div class="icon-box"><van-icon name="records" /></div>
      <div class="text-box">写评论</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabButton",
    props:['tabItems'],
    methods:{
      handleClick(index){
        this.$emit('click',index)
      }
    }
  }
</script>

<style scoped lang="scss">
  .tab-button-container{
    width: 100%;
    height: 56px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    z-index: 10;
    box-sizing: border-box;
    border-top: #F0F0F0;
    .tab-item-box{
      width: 50px;
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .icon-box{
        font-size: 20px;
      }
      .text-box{
        color: #4F4E54;
        font-size: 10px;
        font-weight: 500;
      }
    }
  }
</style>
