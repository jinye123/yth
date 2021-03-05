<template>
  <div class="page-box">
    <div class="poster-container">
      <div class="poster-box">
        <img :src="posterUrl" alt="">
      </div>
      <div class="text-box">— 长按保存图片到相册 —</div>
      <div class="share-btn" @click="showShareText=true">
        <van-icon class="icon-box" name="orders-o"/>
        <p>分享文案</p>
      </div>
      <Menus />
      <van-popup
        :safe-area-inset-bottom="true"
        v-model="showShareText"
        round
        position="bottom"
      >
        <div class="popup-container">
          <div class="friend-box">
            <div class="title-box">朋友圈推荐语</div>
            <div
              class="inner-box tag"
              :key="item.index"
              @click.stop="selectFriend=index"
              v-for="(item,index) in friendList">
              {{item}}
              <img v-if="selectFriend===index" src="./img/yxz.png" alt="">
              <img v-else src="./img/wxz.png" alt="">
            </div>
          </div>
          <van-button
            block
            color="#2C80FF"
            size="normal"
            @click="doCopy"
          >
            复制文案
          </van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {Toast} from "vant";
  import Menus from './../../components/Menus'
  import {
    getShareCode
  } from '../../api'

  export default {
    name: "sharePoster",
    data() {
      return {
        showShareText: false,
        selectFriend: 0,
        posterUrl: null,
        friendList: []
      }
    },
    components:{
      Menus
    },
    created() {
      this._getShareCode()
    },
    methods: {
      doCopy() {
        this.$nextTick(() => {
          this.$copyText(this.friendList[this.selectFriend]).then((e) => {
            Toast('文案已复制，快去转发吧')
          }, (e) => {
            Toast('文案复制失败，请重新选择')
          })
        })
      },
      _getShareCode() {
        const {id,tag} = this.$route.query
        getShareCode(id,{tag}).then(res => {
          const {url, discourse: {text}} = res
          this.posterUrl = url
          this.friendList = text
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .poster-container {
    width: 100%;
    height: 100vh;
    padding: 20px 0 0;
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .poster-box {
      height: 80%;
      img {
        height: 100%;
        border-radius: 10px;
      }
    }

    .text-box {
      font-size: 19px;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
    }

    .share-btn {
      width: 60px;
      height: 54px;
      box-sizing: border-box;
      background: linear-gradient(160deg, #F88C30 0%, #FB4B3F 100%);
      box-shadow: 0px 0px 6px 0px rgba(254, 60, 47, 0.44);
      border-radius: 30px 30px 0px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: -20px;

      .icon-box {
        width: 17px;
        height: 18px;
        color: #ffffff;
        font-size: 20px;
      }

      p {
        font-size: 12px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 25px;
      }
    }

    .friend-box {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
      padding: 0 20px;
      box-sizing: border-box;

      .title-box {
        font-size: 18px;
        color: #000000;
        font-weight: 500;
        line-height: 30px;
        text-align: center;
        margin: 30px 0;
      }

      .inner-box {
        position: relative;
        width: 100%;
        height: 92px;
        background: rgba(250, 250, 252, 1);
        border-radius: 5px;
        border: 1px solid rgba(250, 250, 252, 1);
        margin: 10px auto;
        box-sizing: border-box;
        padding: 13px;
        font-size: 14px;
        color: #333333;
        line-height: 20px;

        img {
          position: absolute;
          width: 30px;
          height: 30px;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
</style>
