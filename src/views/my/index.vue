<template>
  <div class="page-box container-box">
    <van-cell size="large" :border="false" to="/edit">
      <template #title>
        <div class="title-box">
          <div :class="userInfo['vipInfo']?'avatar-box':''">
            <van-image
              fit="cover"
              round
              width="60px"
              height="60px"
              :src="userInfo['headUrl']"
            />
            <div v-if="userInfo['vipInfo']" class="initiator-box">VIP</div>
          </div>
          <div>
            <div style="width: 180px;display: flex;align-items: center;">
              <p>{{userInfo['nickname']}}</p>
              <img v-if="userInfo['role']===2" style="height: 15px" src="./imgs/yys.png" alt="">
              <img v-if="userInfo['role']===3" style="height: 15px" src="./imgs/ywfz.png" alt="">
            </div>
            <span>{{phone}}</span>
          </div>
        </div>
      </template>
      <template>
        <div class="value-box" @click.stop="$router.push({path:'/edit?flag=1'})">
          <div class="btn-box">
            <img src="./imgs/rz.png" alt="">身份认证
          </div>
        </div>
      </template>
    </van-cell>
    <div class="card-container">
      <div class="card-item">
        <div class="top-box">公开学院年卡</div>
        <div class="bottom-box">
          <div class="text-box">{{userInfo['vipInfo']['public']['isBuy']?`剩余时间${vip1Day}天`:'万元权益免费享'}}</div>
          <van-button
            round
            size="small"
            color="linear-gradient(to right, #FFC682, #F89C4E)"
            style="height: 24px"
            :to="`/card?flag=1&id=${userInfo['vipInfo']['public']['cardId']}`"
          >
            <span style="font-size: 11px;font-weight: bold;color: #843800;">
              {{userInfo['vipInfo']['public']['isBuy']?'立即续费':'立即开通'}}
            </span>
          </van-button>
        </div>
      </div>
      <div class="card-item">
        <div class="top-box">精华学院年卡</div>
        <div class="bottom-box">
          <div class="text-box" style="color: #956D3F">{{userInfo['vipInfo']['essence']['isBuy']?`剩余时间${vip2Day}天`:'共享知识盛宴'}}</div>
          <van-button
            round
            size="small"
            color="linear-gradient(to right, #FFD99C, #E8AB65)"
            style="height: 24px"
            :to="`/card?flag=1&id=${userInfo['vipInfo']['essence']['cardId']}`"
          >
            <span style="font-size: 11px;font-weight: bold;color: #563210;">
              {{userInfo['vipInfo']['essence']['isBuy']?'立即续费':'立即开通'}}
            </span>
          </van-button>
        </div>
      </div>
    </div>
    <div class="menu-list">
      <van-cell
        v-for="item in  menuList"
        :key="item['url']"
        style="height: 50px"
        size="large"
        :title="item['title']"
        :to="item['url']"
        is-link
        :border="false"
      >
        <template #icon>
          <img class="icon-img" :src="item['img']"/>
        </template>
      </van-cell>

      <van-cell style="height: 50px" size="large"  @click="showKf=true" title="联系我们" is-link :border="false" >
        <template #icon>
          <img class="icon-img" src="./imgs/lx.png"/>
        </template>
      </van-cell>
      <van-cell style="height: 50px" size="large"  @click="showJhHandle" title="精华门票" is-link :border="false" >
        <template #icon>
          <img class="icon-img" src="./imgs/jh.png"/>
        </template>
      </van-cell>
      <van-cell style="height: 50px" size="large"  @click="showFwHandle" title="线下服务" is-link :border="false" >
        <template #icon>
          <img class="icon-img" src="./imgs/ff.png"/>
        </template>
      </van-cell>
    </div>


    <van-overlay z-index="2000" :show="showKf" @click="showKf = false">
      <div style="padding:0 60px;height: 100%;display: flex;align-items: center;justify-content: center">
        <img style="width: 100%" src="../../assets/img/kf.png" alt="">
      </div>
    </van-overlay>

    <van-overlay z-index="2000" :show="showJh" @click="showJh = false">
      <div class="formContainer">
        <div class="formBox" @click.stop>
          <p>精华线下门票</p>
          <div style="font-size: 14px;color: #FB4B4A;text-align: center;padding-top: 15px">
            {{jhInfo['name']}}
          </div>
          <div class="qr-box">
            <van-image
              width="180px"
              height="180px"
              :src="jhInfo['qrcode']"
            />
          </div>
          <div class="text-box" style="font-size: 13px">
            参会时间：{{jhInfo['startTime']}}-{{jhInfo['startTime']}}
          </div>
        </div>
      </div>
    </van-overlay>

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

    <van-popup
      round
      v-model="showPopup"
    >
      <div class="popup-container">
        <div class="title-box">
          您还不是精华学院年卡用户
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
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import dayjs from "dayjs";
  import {getTicketQrCode,getInviteInfo} from '../../api'
  export default {
    name: 'My',
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      }),
      vip1Day(){
        if(this.userInfo['vipInfo']['public']['validTime']){
          return dayjs(this.userInfo['vipInfo']['public']['validTime']).diff(dayjs(),'day')
        }
      },
      vip2Day(){
        if(this.userInfo['vipInfo']['essence']['validTime']){
          return dayjs(this.userInfo['vipInfo']['essence']['validTime']).diff(dayjs(),'day')
        }
      },
      phone(){
        if(this.userInfo.phone){
          return this.userInfo.phone.substr(0,3)+"****"+this.userInfo.phone.substring(7)
        }else {
          return ''
        }
      }
    },
    data() {
      return {
        showKf:false,
        showJh:false,
        showFw:false,
        jhInfo:{},
        fwInfo:{},
        showPopup:false,
        menuList:[
          {
            title:'我的已购',
            url:'purchased?type=1',
            img:require('./imgs/yg.png')
          },
          {
            title:'会员推广',
            url:'extension',
            img:require('./imgs/zs.png')
          },
          {
            title:'我的订阅',
            url:'purchased?type=4',
            img:require('./imgs/dy.png')
          },
          {
            title:'我的领取',
            url:'/my/receive',
            img:require('./imgs/lq.png')
          },
          {
            title:'我的消息',
            url:'message',
            img:require('./imgs/xx.png')
          },
          {
            title:'推广中心',
            url:'/my/extensionCenter',
            img:require('./imgs/tg.png')
          }
        ]
      }
    },
    methods: {
      showJhHandle(){
        if(!this.userInfo['vipInfo']['essence']['isBuy']){
          this.showPopup=true
        }else {
          getTicketQrCode().then(res=>{
            this.jhInfo=res;
            this.showJh=true
          })
        }
      },
      showFwHandle(){
        if(!this.userInfo['vipInfo']['essence']['isBuy']){
          this.showPopup=true
        }else {
          getInviteInfo().then(res=>{
            this.fwInfo=res;
            this.showFw=true;
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title-box {
    display: flex;
    align-items: center;
    padding: 2px 0;
    .avatar-box {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #EEC896;
      position: relative;
      display: flex;
      justify-content: center;
      .initiator-box {
        position: absolute;
        bottom: -7px;
        background: linear-gradient(to bottom, #F3D0A0, #DDA96D);
        font-size: 9px;
        color: #785327;
        border: 1px solid #ffffff;
        box-sizing: border-box;
        border-radius: 10px;
        width: 28px;
        height: 13px;
        line-height: 13px;
        text-align: center;
      }
    }
    p {
      font-size: 18px;
      font-weight: 500;
      color: #333333;
      margin-left: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
      white-space: nowrap;
    }
    span{
      margin-left: 8px;
      color: #A3A3A3;
      font-size: 13px;
    }
  }
  .value-box {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 13px;
    color: #666666;

    .btn-box{
      background: #FFFFFF;
      border-radius: 14px;
      font-size: 11px;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 28px;
      width: 91px;
      height: 28px;
      background: linear-gradient(270deg, #FE3F38 0%, #FCA890 100%);
      box-shadow: 0px 1px 4px 0px rgba(254, 9, 0, 0.5);
      img{
        width: 15px;
        vertical-align: middle;
        margin-right: 2px;
      }
    }
  }
  .card-container {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 0 10px;
    margin-bottom: -20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;

    .card-item {
      width: 177px;
      height: 90px;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &:nth-child(1){
        background: url("imgs/vip1.png") no-repeat center;
        background-size: 100% 100%;
      }
      &:nth-child(2){
        background: url("imgs/vip2.png") no-repeat center;
        background-size: 100% 100%;
      }

      .top-box {
        font-size: 17px;
        font-weight: bold;
        color: #4A220A;
        line-height: 24px;
      }

      .bottom-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .text-box{
          font-size: 11px;
          font-weight: 400;
          color: #CB5E1D;
          line-height: 16px;
        }
      }
    }
  }
  .menu-list{
    width: 100%;
    height: calc(100vh - 120px);
    background: #ffffff;
    margin-top: 8px;
    box-sizing: border-box;
    padding: 20px 5px;
    .icon-img{
      max-height: 20px;
      max-width: 21px;
      margin-right: 15px;
      margin-top: 4px;
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


</style>
