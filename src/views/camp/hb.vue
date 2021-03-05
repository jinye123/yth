<template>
  <div class="page-box">
    <div class="open-year-box">
      <div class="btn-box">
        <van-button
          round
          style="width: 279px;"
          block
          color="linear-gradient(to bottom, #FF9545,#FF162E)"
          @click="showTip=true;"
        >
          <span style="color: #ffffff;font-size: 24px">立即邀请</span>
        </van-button>
        <van-button
          round
          @click="goPoster"
          style="width: 279px;background: rgba(0,0,0,0)"
          block
          plain
          color="#7C0101"
        >
          <span style="color: #7C0101;font-size: 24px">海报邀请</span>
        </van-button>
      </div>

      <van-overlay :show="showTip" @click="showTip=false">
        <div style="padding: 0 10px;display: flex;flex-direction: column;align-items: center">
          <img style="width: 100%" src="./img/hbtip2.png" alt="">
          <div class="close-tip-box" @click="showTip=false">我知道啦</div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
  import {
    getCampInfo
  } from "../../api";
  import {mapGetters} from "vuex";
  import wxConfigApi from "../../utils/weixinApi";

  export default {
    name: "hb",
    data() {
      return {
        showTip: false,
      }
    },
    computed:{
      ...mapGetters({
        userInfo:'userInfo'
      }),
    },
    mounted() {
      const {id} = this.$route.query
      getCampInfo(id).then(res=>{
        wxConfigApi({
          title: res.title,
          subTitle: res.subTitle,
          link: location.href.split('#')[0] + '#/camp?id='+id+'&shareId=' + this.userInfo.unionId,
          purl: res.purl,
        })
      })
    },
    methods: {
      // 去海报页面
      goPoster(){
        this.$router.push({
          path:'/card/sharePoster',
          query:{id:this.$route.query.id,tag:3}
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .open-year-box {
    width: 100%;
    height: 100vh;
    background: url("./img/hb_bg.png") no-repeat center ;
    background-size: 100% 100%;

    .btn-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 130px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 15px 0;
    }
  }
  .close-tip-box {
    width: 163px;
    height: 42px;
    border-radius: 21px;
    border: 1px solid #FFFFFF;
    font-size: 18px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 42px;
    text-align: center;
    margin-top: 10px;
  }
</style>
