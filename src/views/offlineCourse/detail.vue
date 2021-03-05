<template>
  <div class="page-box">
    <div class="offline-container">
      <div class="banner-box">
        <van-image
          radius="8px"
          width="100%"
          height="223"
          :src="dataInfo['cover']"/>
      </div>
      <div class="title-box">
        <div class="title">{{dataInfo['name']}}</div>
        <div class="price"></div>
        <div class="time">
          <van-icon style="margin-right: 5px" name="clock-o"/>
          {{dataInfo['startTime']}} — {{dataInfo['endTime']}}
        </div>
        <div class="address">
          <van-icon style="margin-right: 4px;" name="location-o"/>
          {{dataInfo['address']}}
        </div>
      </div>
      <div class="line-box"></div>
      <div class="meet-members-box">
        <div class="avatar-container">
          <div class="avatar-box" v-for="item in avatars">
            <van-image
              round
              width="33"
              height="33"
              :src="item['header']"/>
          </div>
        </div>
        <div>
          <span style="color: #32CDE7">{{dataInfo['meetMemberCount']}}</span>人已报名，限额{{dataInfo['quota']}}人
        </div>
      </div>
      <div class="tutors-box">
        <div class="title-box">
          <img src="./img/icon.png" alt="">主讲导师<img src="./img/icon.png" alt="">
        </div>
        <div class="person-box" v-for="item in dataInfo['tutors']">
            <div class="person-avatar-box">
              <van-image
                round
                width="118px"
                height="118px"
                :src="item['header']"/>
              <div class="name-box">{{item['name']}}</div>
            </div>
          <div class="text-box">
            <div v-html="item['identityInfo']"></div>
          </div>
        </div>
      </div>
      <div class="detail-box">
        <div class="title-box">
          <img src="./img/icon.png" alt="">课程详情<img src="./img/icon.png" alt="">
        </div>
        <div class="text-box" v-for="item in dataInfo['details']" v-html="item['context']" />
      </div>
      <div class="map-box">
        <div class="title-box">
          <img src="./img/icon.png" alt="">地图导航<img src="./img/icon.png" alt="">
        </div>
        <baidu-map
          :center="center"
          :zoom="zoom"
          class="bm-view"
          @ready="handler"
          ak="4UmDHfHX8CN7rw7AG5Sm1F9RuxFcyv4l">
          <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
            <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">{{dataInfo['address']}}</bm-info-window>
          </bm-marker>
        </baidu-map>
      </div>
    </div>
    <div class="bottom-btn-box">
      <div class="left-box">
        <p>精华年卡用户专享</p>
        <span>共享知识盛宴</span>
      </div>
      <van-button
        v-if="dataInfo['hasSign']==='T'"
        round
        @click="showQrCodeHandle"
        style="width: 150px;height: 42px;"
        color="linear-gradient(to right, #FBDDC9, #FDBD9B)"
      >
        <span style="color: #523429;font-size: 16px;font-weight: bold">查看二维码</span>
      </van-button>
      <van-button
        v-else
        round
        @click="bmHandle"
        style="width: 150px;height: 42px;"
        color="linear-gradient(to right, #FBDDC9, #FDBD9B)"
      >
        <span style="color: #523429;font-size: 16px;font-weight: bold">立即报名</span>
      </van-button>
    </div>
    <van-popup
      round
      v-model="showPopup"
    >
      <div class="popup-container">
        <div class="title-box">
          您还不是精华学院年卡用户，
          是否前往购买？
        </div>
        <div class="btn-group-box">
          <van-button
            @click="showPopup=false"
            style="width: 146px;height: 43px;border-radius: 4px"
            type="default"
          >
            取 消
          </van-button>
          <van-button
            :to="`/card?id=${userInfo['vipInfo']['essence']['cardId']}`"
            style="width: 146px;height: 43px;border-radius: 4px"
            type="info"
          >
            立即前往
          </van-button>
        </div>
      </div>
    </van-popup>
    <van-overlay z-index="2000" :show="showFw" @click="showFw = false">
      <div class="formContainer">
        <div class="formBox" @click.stop>
          <p>联系您的专属顾问为您服务</p>
          <div class="info-box">
            <div class="title-box">【 微信昵称 】</div>
            <p>{{fwInfo['memName']}}</p>
          </div>
          <div class="info-box">
            <div class="title-box">【 微信号 】</div>
            <p>——</p>
          </div>
          <div class="info-box">
            <div class="title-box">【 联系电话 】</div>
            <p>{{fwInfo['telephone']}}</p>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  meetDetail,
  onLineSignUp,
  checkVote,
  checkUserAuth,
  getInviteInfo,
} from '../../api'
  import {mapGetters} from "vuex";
  import {
    BaiduMap,
    BmMarker,
    BmInfoWindow
  } from 'vue-baidu-map'
  export default {
    name: "detail",
    components: {
      BaiduMap,
      BmMarker,
      BmInfoWindow
    },
    data() {
      return {
        showPopup: false,
        showFw:false,
        dataInfo: {},
        jhInfo:{},
        show: false,
        center: {lng: 0, lat: 0},
        zoom: 3,
        markerPoint:{lng:0, lat:0},
        fwInfo:{},
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      }),
      avatars(){
        if(this.dataInfo['meetMembers']){
          return this.dataInfo['meetMembers'].splice(0,5)
        }else {
          return[]
        }
      }
    },
    created() {
      this._meetDetail()
    },
    methods: {
      infoWindowClose () {
        this.show = false
      },
      infoWindowOpen () {
        this.show = true
      },
      bmHandle() {
        const {id} = this.$route.query;
        if(!this.userInfo['vipInfo']['essence']['isBuy']){
          this.showPopup=true;
          return
        }
        checkUserAuth().then(res=>{
          if(res){
            checkVote().then(res=>{
              if(res){
                onLineSignUp({
                  "meetId":this.dataInfo.id,
                  "areaCode": this.dataInfo.addressDetail.city,
                  "endTime": this.dataInfo.endTime,
                  "isAccommodation": this.dataInfo.isAccommodation,
                  "name": this.dataInfo.name,
                  "startTime": this.dataInfo.startTime
                }).then(()=>{
                  this._meetDetail()
                })
              }else {
                this.$router.push({path:'/offlineCourse/question',query:{id}})
              }
            })
          }else {
            this.$router.push({path:'/authenticate'})
          }
        })
      },
      handler ({BMap, map}) {
        console.log(BMap, map)
      },
      showQrCodeHandle(){
        getInviteInfo().then(res=>{
          this.fwInfo=res;
          this.showFw=true;
        })
      },
      _meetDetail() {
        const {id} = this.$route.query
        meetDetail({
          meetId: id,
          unionId: this.userInfo.unionId
        }).then(res => {
          const {addressDetail:{location}} = res;
          this.dataInfo = res
          this.center.lng = location.split(',')[0]
          this.center.lat = location.split(',')[1]
          this.markerPoint.lng=location.split(',')[0]
          this.markerPoint.lat=location.split(',')[1]
          this.zoom = 15
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .offline-container {
    width: 100%;
    min-height: 100vh;
    background: #ffffff;
    padding-bottom: 60px;

    .banner-box {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      background: #ffffff;
    }

    .title-box {
      padding: 0 15px 20px;
      background: #ffffff;

      .title {
        width: 80%;
        font-size: 20px;
        font-weight: bold;
        color: #222222;
        line-height: 26px;
      }

      .price {
        font-size: 21px;
        font-weight: 500;
        color: #C99743;
        line-height: 11px;
        padding: 20px 0;
      }

      .time, .address {
        font-size: 13px;
        font-weight: 500;
        color: #636465;
        display: flex;
        align-items: center;
        line-height: 25px;
      }
    }

    .line-box {
      width: 100%;
      height: 5px;
      background: #F3F5F6;
    }

    .meet-members-box {
      width: 100%;
      height: 66px;
      box-sizing: border-box;
      padding: 18px;
      display: flex;
      align-items: center;

      .avatar-container {
        height: 100%;
        display: flex;
        padding-left: 15px;

        .avatar-box {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #ffffff;
          margin-left: -15px;
        }
      }
    }

    .tutors-box {
      background: #F5F9FC;
      width: 100%;
      box-sizing: border-box;
      padding: 30px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title-box {
        background: transparent;
        font-size: 20px;
        font-weight: bold;
        color: #222222;
        line-height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          margin: 0 20px;
          width: 18px;
        }
      }

      .person-box{
        width: 345px;
        box-sizing: border-box;
        padding: 100px 15px 30px;
        background: #FFFFFF;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        margin-top: 80px;
        position: relative;
        .person-avatar-box{
          width: 118px;
          height: 118px;
          border: 4px solid #F7D0A2;
          border-radius: 50%;
          position: absolute;
          top: -60px;
          left: 50%;
          margin-left: -60px;
          display: flex;
          justify-content: center;
          .name-box{
            padding:0 20px;
            height: 28px;
            background: linear-gradient(360deg, #DFB984 0%, #F7D7A2 100%);
            border-radius: 14px;
            font-size: 15px;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 28px;
            text-align: center;
            position: absolute;
            bottom: -14px;
          }
        }

        .text-box{
          width: 100%;
          box-sizing: border-box;
          font-size: 13px;
          color: rgba(102, 102, 102, 1);
          line-height: 24px;
          text-align: center;
        }
        .text-box::v-deep img{
          width: 100%;
        }
      }
    }

    .detail-box,.map-box{
      width: 100%;
      box-sizing: border-box;
      padding: 30px 0 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title-box {
        background: transparent;
        padding-bottom: 30px;
        font-size: 20px;
        font-weight: bold;
        color: #222222;
        line-height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          margin: 0 20px;
          width: 18px;
        }
      }

      .text-box{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 24px;
      }
      .text-box::v-deep img{
        width: 100%;
      }

      .bm-view {
        width: 100%;
        height: 300px;
      }
    }

  }

  .bottom-btn-box {
    width: 100%;
    height: 56px;
    padding: 0 12px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    background: linear-gradient(90deg, #333435 0%, #272829 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-box {
      p {
        height: 22px;
        font-size: 22px;
        color: #F9B98B;
        letter-spacing: 1px;
        padding-bottom: 3px;
      }

      span {
        font-size: 10px;
        font-weight: 400;
        color: #F9B98B;
      }
    }
  }

  .popup-container {
    width: 320px;
    padding: 10px;
    box-sizing: border-box;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;

    .title-box {
      width: 230px;
      box-sizing: border-box;
      padding: 25px 0;
      font-size: 17px;
      font-weight: 500;
      color: #353535;
      line-height: 24px;
      text-align: center;
    }

    .btn-group-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .formContainer{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    .formBox{
      box-sizing: border-box;
      padding: 32px 0 32px;
      width:80%;
      background:rgba(255,255,255,1);
      border-radius:12px;
      p{
        width:100%;
        font-size:17px;
        font-weight:500;
        color:#000000;
        line-height:28px;
        text-align: center;
      }

      .qr-box {
        width: 100%;
        box-sizing: border-box;
        padding: 20px 30px 15px;
        text-align: center;
      }

      .text-box {
        text-align: center;
        font-size: 15px;
        line-height: 21px;
        letter-spacing: 1px;
        font-weight: 400;
        color: #333333;
      }

      .info-box{
        width: 100%;
        box-sizing: border-box;
        padding: 25px 30px 10px 30px;
        display: flex;
        align-items: flex-start;
        .title-box{
          font-size: 16px;
          font-weight: 500;
          color: #333333;
          width: 120px;
        }
        p{
          flex: 1;
          font-size: 15px;
          font-weight: 400;
          color: #666666;
          text-align: left;
        }
      }
    }
  }
</style>
