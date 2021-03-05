<template>
  <div id="app">
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive"></router-view>
    <Player ref="audioPlayer"/>
    <van-overlay z-index="9999" :show="showTip" @click="setShowTip(false)">
      <div class="share-container">
        <div class="tip-box">
          <div class="text-box">您还没有购买本课程，请购买后查看～</div>
          <van-button
            @click="goPayHandle"
            color="linear-gradient(to right, #F9D2AE, #FF8B69)"
            round
            style="width: 184px"
          >
            <span style="font-weight: bold">去支付</span>
          </van-button>
        </div>
      </div>
    </van-overlay>
    <van-overlay z-index="9999" :show="showRole" @click="showRole=false">
      <div class="share-container">
        <div class="tip-box">
          <div class="text-box">温馨提示</div>
          <div class="subText-box">运营商必须完成此认证，方可享受后续服务，其他用户可忽略此认证</div>
          <van-button
            to="/edit?flag=1"
            color="linear-gradient(to right, #F9D2AE, #FF8B69)"
            round
            style="width: 184px"
          >
            <span style="font-weight: bold">去认证</span>
          </van-button>
        </div>
        <div
          @click="showRole=false"
          style="padding-top: 50px;text-align:center;width: 100%;color: #ffffff;font-size: 25px">
          <van-icon name="close" />
        </div>
      </div>

    </van-overlay>
    <TabBar v-show="$route.meta.hasTabBar"></TabBar>
  </div>
</template>
<script>
import TabBar from '@/components/TabBar'
import {mapGetters,mapState,mapActions} from "vuex";
import Player from "./components/Player";
import Vue from "vue";
export default {
  name: 'App',
  data(){
    return {
      showRole:false
    }
  },
  components: {
    TabBar,
    Player
  },
  computed:{
    ...mapGetters({
      userInfo:'userInfo'
    }),
    ...mapState({
      showTip:state=>state.app.showTip
    })
  },

  methods:{
    ...mapActions({
      setShowTip:'app/setShowTip'
    }),
    goPayHandle(){
      const {id}= this.$route.query
      this.setShowTip(false)
      this.$router.replace({path:'/detail',query:{id}})
    }
  },
  mounted() {
    Vue.prototype.$audioPlayer=this.$refs.audioPlayer;

    if(!window.localStorage.getItem('showRole')){
      window.localStorage.setItem('showRole',true)
      setTimeout(()=>{
        if(this.userInfo.role!==2){
          this.showRole=true;
        }
      },5000)
    }
  }
}
</script>
<style lang="scss" scoped>
  .share-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .tip-box{
      width: 320px;
      background: #ffffff;
      box-sizing: border-box;
      padding: 20px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items:center;
      justify-content: space-around;
      .text-box{
        text-align: center;
        width: 254px;
        padding: 0 0 20px;
        font-size: 17px;
        font-weight: bold;
        color: #353535;
        line-height: 28px;
        letter-spacing: 1px;
      }
      .subText-box{
        padding: 0 20px 20px;
        font-size: 16px;
        box-sizing: border-box;
        color: #969A9A;
        line-height: 24px;
      }
    }
  }
</style>
