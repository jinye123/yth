<template>
  <div class="page-box">
    <div class="year-card-container">
      <van-tabs
        @click="tabClickHandle"
        v-model="activeId"
        color="#EDB46F"
        line-height="2px"
        line-width="22px"
        sticky
        swipeable
      >
        <van-tab :name="userInfo['vipInfo']['public']['cardId']" title="公开学院">
          <cardInfo
            ref="card1"
            :orderType="3"
            :vipInfo="userInfo['vipInfo']['public']"
            :bshInfo="bshInfo"
          />
        </van-tab>
        <van-tab :name="userInfo['vipInfo']['essence']['cardId']" title="精华学院">
          <cardInfo
            ref="card2"
            :orderType="5"
            :vipInfo="userInfo['vipInfo']['essence']"
            :bshInfo="bshInfo"
          />
        </van-tab>
      </van-tabs>
    </div>
    <div class="share-box">
      <div
        class="share-item"
        @click="showPopup=true">
        <img src="./img/fxyl.png" class="img-box"/>
      </div>
      <div class="share-item" @click="$router.push({path:'/'})">
        <div class="home-icon-box">
          <span style="size: 16px;font-weight: bold" class="icon icon-shouye1"></span>
          <p style="font-size: 8px">返回首页</p>
        </div>
      </div>
    </div>
    <van-popup
      :safe-area-inset-bottom="true"
      v-model="showPopup"
      round
      position="bottom"
    >
      <div class="popup-container">
        <van-button
          round
          style="width: 256px"
          block
          color="linear-gradient(to right, #FFDFB1,#FAB45C)"
          @click="showTip=true;showPopup=false"
        >
          <span style="color: #8A5206">立即邀请</span>
        </van-button>
        <van-button
          @click="wxPyqHandle"
          round
          style="width: 256px"
          block
          color="linear-gradient(to right, #F88C30, #FB4B3F)"
        >
          海报邀请
        </van-button>
      </div>
    </van-popup>
    <van-overlay :show="showTip" @click="showTip=false">
      <div style="padding: 0 10px;display: flex;flex-direction: column;align-items: center">
        <img style="width: 100%" src="./img/hbtip.png" alt="">
        <div class="close-tip-box" @click="showTip=false">我知道啦</div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {
    getUserWatch,
    onLineInvitationCheck
  } from '../../api'
  import {mapGetters} from "vuex";
  import cardInfo from './components/cardInfo'
  import store from "../../store";

  export default {
    name: "yearCardPay",
    data() {
      return {
        showPopup: false,
        showTip: false,
        bshInfo: {},
        activeId: ''
      }
    },
    components: {
      cardInfo
    },
    async created() {

      await this._getUserWatch()

      const {openid, unionid, shareId, id} = this.$route.query

      this.activeId = Number(id)

      if (!openid) {
        setTimeout(()=>{
          const {unionId}=store.getters.userInfo
          window.location.href = `${process.env.VUE_APP_BASE_API_BSH}/api/wx/onLineAuth?cb=${encodeURIComponent(window.location.href)}&unionid=${unionId}`
        },300)
      } else {
        onLineInvitationCheck({
          "unionid": unionid,
          "openid": openid,
          "op_unionid": shareId,
          "nickname": this.userInfo.nickname,
        }).then(res => {
          this.bshInfo = res
        })
        this.activeId = Number(id)
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      }),
    },
    methods: {
      async _getUserWatch() {
        await getUserWatch()
      },
      tabClickHandle(id){
        if(id===this.userInfo['vipInfo']['public']['cardId']&&this.$refs.card1){
          this.$refs.card1.shareHandle()
        }else if(id===this.userInfo['vipInfo']['essence']['cardId']&&this.$refs.card2) {
          this.$refs.card2.shareHandle()
        }
      },
      wxPyqHandle() {
        this.$router.push({
          path: '/card/sharePoster',
          query: {id: this.activeId, tag: 2}
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .year-card-container {
    width: 100%;
    height: 100vh;
    background: #ffffff;
  }

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

      .home-icon-box {
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

  .popup-container {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
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
