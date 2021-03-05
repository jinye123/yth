<template>
  <div class="page-box">
    <div class="pay-success-container">
      <div class="header">
        关注圣商公众号
      </div>
      <div class="alert-wrap">
        <div class="msg">如何领红包？</div>
        <div class="name">关注<span class="bo">圣商在线</span>，分享得红包</div>
        <div class="img-wrap">
          <img v-if="isProd" src="./img/paySuccessEwm.jpg" style="width: 100%;height: 100%" alt="">
          <img v-else src="./img/testWechat.jpg" style="width: 100%;height: 100%" alt="">
        </div>
        <div class="desc">
          ↑↑↑长按识别上方二维码，关注公众号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PaySuccessPage',
    computed:{
      isProd(){
        if(process.env.VUE_APP_ENV === 'production'){
          return true
        }else {
          return false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pay-success-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    .header{
      width: 100%;
      height:66px;
      background:linear-gradient(89deg,rgba(243,208,160,1) 0%,rgba(221,169,109,1) 100%);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    .alert-wrap{
      width:345px;
      height:400px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
      border-radius:10px;
      margin-bottom: 20px;
      display: flex;
      padding-top: 24px;
      box-sizing: border-box;
      flex-direction: column;
      align-items: center;
      .msg{
        font-size:13px;
        font-weight:400;
        color:rgba(214,72,72,1);
        margin-bottom: 20px;
      }
      .name{
        text-align: center;
        width: 100%;
        font-size:15px;
        font-family:PingFang-SC-Regular,PingFang-SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        .bo{
          font-weight: 500;
        }
      }
      .img-wrap{
        width: 256px;
        height: 256px;
        background-color: #ccc;
        margin-top: 20px;
      }
      .desc{
        margin-top: 15px;
        font-size:12px;
        font-family:PingFang-SC-Regular,PingFang-SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        margin-bottom: 28px;
      }
    }
  }

</style>
