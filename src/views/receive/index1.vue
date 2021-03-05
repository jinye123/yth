<template>
  <div class="page-box">
    <div class="receive-container">
      <div class="inner-box">
        <div class="header-box">
          <img src="./img/logo.png" alt=""><span>圣商在线</span>
        </div>
        <div class="line-box">
          <div class="left-circular circular-box"></div>
          <div class="line"></div>
          <div class="right-circular circular-box"></div>
        </div>

        <div class="body-box">
          <div class="title-box">{{courseInfo.subTitle}}</div>
          <div class="img-box">
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              :src="courseInfo.purl"
            />
          </div>
          <div class="name-box">
            {{courseInfo['coursesTitle']}}
          </div>
          <div class="price-box">
            价值￥{{courseInfo['price']}}元
          </div>
          <div class="validity-box">
            有效期至：{{endTime}}
          </div>
          <div class="btn-box">
            <van-button v-if="time>0&&courseInfo['ustate']===0" @click="receiveHandle" color="#D64848" block round size="small">立即领取</van-button>
            <van-button v-if="courseInfo['ustate']===1" color="#CACACA" block round size="small">您已领取</van-button>
            <van-button v-if="time<=0&&courseInfo['ustate']===0"  color="#CACACA" block round size="small">已过期</van-button>
          </div>
        </div>
        <div class="footer-box">
          <p>使用须知</p>
          <p>1. 只限本人使用不得转发</p>
          <p>2. 课程解释权为圣商教育所有</p>
        </div>
      </div>
    </div>
    <Menus />
    <van-overlay :show="showForm" @click="showForm = false" >
      <div class="formContainer">
        <div class="formBox" @click.stop>
          <p>手机号绑定</p>
          <van-form label-width="60px" label-align="center" @submit="onSubmitPhone">
            <van-field
              v-model="userForm.phone"
              name="phone"
              label="手机号"
              placeholder="请输入报名精华会议的手机"
            />
            <van-field
              v-model="userForm.code"
              type="text"
              name="code"
              label="验证码"
              placeholder="请输入验证码"
            >
              <template #button>
                <span class="line-box"></span>
                <span v-if="showCountDown">
                  <van-count-down
                    ref="countDown"
                    millisecond
                    :time="codeTime"
                    :auto-start="false"
                    format="ss"
                    @finish="finishCountDown"
                  />
                </span>
                <span v-else class="code-box" @click="getCodeHandle">获取验证码</span>
              </template>
            </van-field>
            <div class="agreement-box">
              <van-checkbox
                icon-size="12px"
                checked-color="#E25C5A"
                v-model="checked">
              </van-checkbox>
              <span>我已阅读并同意 <a :href="urlLink+'/receive.html'">《课程赠与协议》</a></span>
            </div>
            <div style="margin-top: 20px;display: flex;justify-content: center">
              <van-button style="width: 134px;height: 36px" round block color="#E25C5A" native-type="submit">
                保 存
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="showSuccess" @click="showSuccess = false">
      <div class="success-container">
        <div class="qrcode-container" @click.stop>
          <div class="img-box">
            <img src="./img/paySuccessEwm.jpg"  alt="">
          </div>
          <div class="title-box">
            圣商在线官微
          </div>
          <div class="des-box">
            <p>长按二维码关注</p>
            <p>请关注后通过公众号观看内容</p>
          </div>
          <div class="tip-box">
            使用成功！
          </div>
          <div class="btn-box">
            <van-button @click="lookHandle" color="#53A1FA" block round size="small">立即查看</van-button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {mobile} from "../../utils/validate";
  import dayjs from 'dayjs';
  import {getCode,receiveFree,getReceiveCourseInfo} from "../../api";
  import {Toast} from "vant";
  import Menus from "../../components/Menus";

  export default {
    name: 'Receive',
    components:{
      Menus
    },
    data(){
      return{
        courseInfo:{},
        showSuccess:false,
        showForm:false,
        userForm:{
          phone:'',
          code:''
        },
        checked:true,
        codeTime:60*1000,
        showCountDown:false
      }
    },
    computed:{
      endTime(){
        if(this.courseInfo['endTime']){
          return this.courseInfo['endTime'].split(' ')[0]
        }else {
          return '—'
        }
      },
      time(){
        if(this.courseInfo['endTime']){
          return dayjs(this.courseInfo['endTime']).diff(dayjs())
        }else {
          return 0
        }
      },
      urlLink(){
        return process.env.VUE_APP_BASE_API
      }
    },
    created(){
      this._getReceiveCourseInfo()
    },
    methods:{
      _getReceiveCourseInfo(){
        const {id} = this.$route.query
        getReceiveCourseInfo(id).then((res)=>{
          this.courseInfo=res
        })
      },
      // 提交
      onSubmitPhone(){
        const {phone,code}=this.userForm
        if(!this.checked){
          Toast({
            message:'请确认您已知晓平台相关协议',
            position:'bottom'
          })
        }else if(!mobile(phone)){
          Toast({
            message:'新输入正确的手机号码',
            position:'bottom'
          })
        }else if(!code){
          Toast({
            message:'验证码不能为空',
            position:'bottom'
          })
        }else {
          const {id} = this.courseInfo
          receiveFree(id,this.userForm).then(()=>{
            this.showForm=false;
            this.showSuccess=true;
          })
        }
      },
      // 完成倒计时
      finishCountDown(){
        this.codeTime = 60*1000
        this.showCountDown=false
      },
      // 获取验证码
      getCodeHandle(){
        const {phone}=this.userForm
        if(mobile(phone)){
          getCode(phone).then(()=>{
            this.showCountDown=true;
            Toast({
              message:'发送验证码成功',
              position:'bottom'
            })
            this.$nextTick(()=>{
              this.$refs.countDown.start();
            })
          })
        }else {
          Toast({
            message:'请重新输入手机号',
            position:'bottom'
          })
        }
      },
      // 立即领取
      receiveHandle(){
        this.showForm=true
      },
      // 立即查看
      lookHandle(){
        this.$router.push({path:'/my'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .receive-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #EEEEEE;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 30px 15px;

    .inner-box{
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      position: relative;
      .header-box{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;
        img{
          width: 30px;
          height: 30px;
        }
        span{
          color: #333333;
          font-size: 13px;
          font-weight:500;
          margin-left: 8px;
        }
      }
      .line-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 14px;
        position: absolute;
        top: 40px;
        .line{
          flex: 1;
          border-bottom: 1px dashed #E3E3E3;
        }
        .circular-box{
          width: 14px;
          height: 14px;
          background: #EEEEEE;
        }
        .left-circular{
          border-bottom-right-radius: 50%;
          border-top-right-radius: 50%;
          margin-left: -7px;
        }
        .right-circular{
          border-bottom-left-radius: 50%;
          border-top-left-radius: 50%;
          margin-right: -7px;
        }
      }
      .body-box{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title-box{
          font-size: 20px;
          color: #222222;
          font-weight:bold;
          padding: 24px 0;
          text-align: center;
        }
        .img-box{
          width: 203px;
          height: 153px;
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
          padding: 10px 0;
        }
        .validity-box{
          font-size: 13px;
          color: #999999;
          font-weight: 500;
          padding: 5px 0;
        }
        .btn-box{
          width: 151px;
          height: 34px;
          padding-top: 20px;
        }
      }
      .footer-box{
        box-sizing: border-box;
        padding: 20px;
        font-size: 12px;
        color: #999999;
        line-height: 25px;
      }
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
      padding: 32px 0 10px;
      width:80%;
      height:300px;
      background:rgba(255,255,255,1);
      border-radius:12px;
      p{
        width:100%;
        font-size:17px;
        font-weight:500;
        color:#000000;
        line-height:24px;
        text-align: center;
      }
      .van-form{
        margin-top: 20px;
        .van-field__label{
          color: #333333;
          font-size: 15px;
          span{
            font-size: 12px;
          }
        }
      }
      .line-box{
        display: inline-block;
        height: 18px;
        width: 1px;
        background: #E7E7E7;
        vertical-align: middle;
      }
      .van-count-down{
        display: inline-block;
        width: 70px;
        color: #D64848;
        margin-left: 10px;
        text-align: center;
      }
      .code-box{
        font-size: 13px;
        color: #D64848;
        margin-left: 10px;
        display: inline-block;
        width: 70px;
        vertical-align: middle;
      }
      .agreement-box{
        font-size: 12px;
        padding: 20px 20px 0;
        display: flex;
        align-items: flex-start;
        span{
          margin-left: 10px;
        }
        a{
          color: #E25C5A;
        }
      }
    }
  }
  .success-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .qrcode-container{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 320px;
      height: 400px;
      border-radius: 10px;
      background: #ffffff;
      box-sizing: border-box;
      padding: 20px 0;
      .img-box {
        width: 160px;
        height: 160px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .title-box{
        color: #222222;
        font-size: 18px;
        font-weight: bold;
        padding: 10px 0 0;
      }
      .des-box{
        padding: 10px 0;
        p{
          color: #627498;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          line-height: 20px;
        }
      }
      .tip-box{
        font-size: 17px;
        color: #333333;
        font-weight: 500;
        padding: 20px 0;
      }
      .btn-box{
        width: 151px;
        height: 34px;
        padding-top: 20px;
      }
    }
  }
</style>
