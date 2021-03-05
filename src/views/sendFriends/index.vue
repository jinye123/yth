<template>
  <div class="page-box">
    <div class="send-friend-container-box">
      <div class="body-box">
        <div class="img-box">
          <van-image
            style="box-shadow:0px 2px 10px 0px rgba(51,51,51,0.3);"
            radius="5"
            width="100%"
            height="100%"
            fit="cover"
            :src="courseInfo['purl']"
          />
        </div>
        <div class="name-box">
          {{courseInfo['title']}}
        </div>
        <div class="price-box">
          价值￥{{courseInfo['price']}}元
        </div>
        <div class="line-box">
          <div class="line"></div>
          赠言
          <div class="line"></div>
        </div>
        <div class="text-box">
          这个内容给我启发，希望也能帮到你
        </div>
        <div class="line-box">
          <div class="line"></div>
        </div>
        <div class="btn-box" v-if="!coursesToken">
          <van-button @click="giftHandle" color="#D64848" block round size="small">赠 送</van-button>
        </div>
        <div class="btn-box" v-if="coursesToken&&!hasReceived">
          <van-button @click="receiveHandle" color="#D64848" block round size="small">领取课程</van-button>
        </div>
        <div class="btn-box" v-if="coursesToken&&hasReceived">
          <van-button @click="goDetailHandle" type="info" plain block round size="small">已领取，点击进入</van-button>
        </div>
        <div class="qr-code-box" v-if="coursesToken">
          <div class="qr-img">
            <vue-qr :size="60"
                    :margin="0"
                    :auto-color="true"
                    :dot-scale="1"
                    :text="logoSrc" />
          </div>
          <div class="qr-text">领取课程后，请长按二维码开始学习</div>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false" >
      <div style="padding: 0 10px">
        <img style="width: 100%" src="./img/yqhy@2x.png" alt="">
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {
    getGiftRecordDetail,
    giftRecord,
    receiveRecord
  } from "../../api";
  import wxConfigApi from "../../utils/weixinApi";
  import VueQr from 'vue-qr';
  import {mapActions, mapState} from "vuex";

  export default {
    name: "index",
    components:{
      VueQr
    },
    data(){
      return{
        courseInfo:{},
        show:false,
        coursesToken:''
      }
    },
    computed:{
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
      hasReceived(){
        if(this.courseInfo['shareUserId']===this.userInfo.uid){
          return true
        }else {
          return false
        }
      },
      logoSrc(){
        return window.location.origin + window.location.pathname + '#/detail?id=' + this.courseInfo.coursesId
      }
    },
    created(){
      const {id,coursesToken}=this.$route.query
      this._getReceiveCourseInfo(id)
      if(coursesToken){
        this.coursesToken=coursesToken
      }
    },
    methods:{
      giftHandle(){
        this._giftRecord()
      },
      receiveHandle(){
        this._receiveRecord()
      },
      goDetailHandle(){
        this.$router.push({path:`/detail?id=${this['courseInfo']['coursesId']}`})
      },
      _getReceiveCourseInfo(id){
        getGiftRecordDetail(id).then((res)=>{
          this.courseInfo=res
        })
      },
      _giftRecord(){
        const {id} = this.$route.query
        giftRecord(id).then(res=>{
          this.show=true;
          wxConfigApi({
            title: this['courseInfo']['title'],
            subTitle: this['courseInfo']['subTitle'],
            link: location.href+`&coursesToken=${res}`,
            purl: this['courseInfo']['purl'],
            success:()=>{

            }
          })
        })
      },
      _receiveRecord(){
        const {id,coursesToken} = this.$route.query
        receiveRecord({
          id,
          coursesToken
        }).then(res=>{
          this._getReceiveCourseInfo(id)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .send-friend-container-box{
    width: 100%;
    background: #ffffff;
    min-height: 100vh;

    .body-box{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 20px;
      .img-box{
        width: 236px;
        height: 178px;
        padding: 10px 0;
      }
      .name-box{
        font-size: 15px;
        color: #222222;
        font-weight: 500;
        padding: 6px 0;
        width: 80%;
        line-height: 20px;
        text-align: center;
      }
      .price-box{
        font-size: 13px;
        font-weight: 500;
        line-height: 20px;
        color: #c99743;
        padding: 15px 0;
      }
      .line-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        width: 70%;
        color: #999999;
        .line{
          flex: 1;
          height: 1px;
          background: #EFF0F1;
        }
      }
      .text-box{
        color: #333333;
        font-size: 13px;
        font-weight:500;
      }
      .btn-box{
        width: 151px;
        height: 34px;
      }
      .qr-code-box{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        .qr-img{
          width:55px;
          height:55px;
        }
        .qr-text{
          color: #999999;
          font-size:12px;
          text-align: center;
          line-height: 40px;
        }
      }
      .receive-box{
        width: 100%;
        padding: 20px 0 0;
        .receive-name-box{
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          color: #333333;
          span{
            color: #627498;
            margin-right: 5px;
          }
        }
        .time-box{
          font-size: 11px;
          color: #999999;
          font-weight: 500;
          text-align: center;
          margin-top: 10px;
        }
      }
    }
  }
</style>
