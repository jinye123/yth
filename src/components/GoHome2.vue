<template>
  <div class="share-box">
    <div class="share-item" @click="$router.push({path:'/'})">
      <div class="home-icon-box">
        <span style="size: 16px;font-weight: bold" class="icon icon-shouye1"></span>
        <p style="font-size: 8px">返回首页</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "GoHome2"
    }
</script>

<style scoped lang="scss">
  .share-box {
    position: fixed;
    right: 10px;
    bottom: 70px;

    .share-item {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .img-box {
        width: 40px;
      }

      p {
        color: #333333;
        font-size: 9px;
        line-height: 15px;
      }

      .home-icon-box{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #333333;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>
