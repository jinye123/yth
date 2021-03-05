<template>
  <div class="page-box">
    <div class="receive-container">
      <div class="inner-box">
        <div class="line-box">
          <div class="circular-box"></div>
          <div class="line">好课三选一 0元任你选</div>
          <div class="circular-box"></div>
        </div>
        <div class="body-box" style="padding-bottom: 0">
          <div class="course-item" v-for="(item,index) in coursesInfos">
            <div @click="checkedHandle(index)" class="check-box" :class="checkedIndex===index?'checked':''">
              <div class="spot"></div>
            </div>
            <div class="card-box">
              <div class="img-box">
                <van-image
                  width="108"
                  height="80"
                  radius="8"
                  :src="item.purl"
                />
              </div>
              <div class="text-box">
                <div class="title-box">{{item.title}}</div>
                <div class="subtitle-box">{{item.subTitle}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="line-box">
          <div class="circular-box"></div>
          <div class="line">免费订阅【财经六点半】</div>
          <div class="circular-box"></div>
        </div>
        <div class="body-box">
          <div class="course-item">
            <div class="check-box checked">
              <div class="spot"></div>
            </div>
            <div class="card-box">
              <div class="img-box">
                <van-image
                  width="108"
                  height="80"
                  radius="8"
                  :src="subInfo.purl"
                />
              </div>
              <div class="text-box">
                <div class="title-box">{{subInfo.title}}</div>
                <div class="subtitle-box">{{subInfo.subTitle}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button
          v-if="state===0"
          @click="showForm=true"
          color="linear-gradient(to right, #FEE2A7, #FFF3DB)"
          round
          style="width: 151px"
        >
          <span style="color: #F54432;font-weight: bold">立即领取</span>
        </van-button>
        <van-button
          v-if="state===1"
          color="#CACACA"
          round
          style="width: 151px"
        >
          您已领取
        </van-button>
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
            <van-button to="/my" color="#53A1FA" block round size="small">立即查看</van-button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {mobile} from "../../utils/validate";
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
        coursesInfos:[],
        subInfo:{},
        state:0,
        checkedIndex:0,
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
      urlLink(){
        return process.env.VUE_APP_BASE_API
      }
    },
    created(){
      this._getReceiveCourseInfo()
    },
    methods:{
      checkedHandle(index){
        this.checkedIndex=index
      },
      _getReceiveCourseInfo(){
        const {id} = this.$route.query
        getReceiveCourseInfo(id).then((res)=>{
          const {subInfo,coursesInfos,state} = res;
          this.coursesInfos=coursesInfos
          this.subInfo=subInfo
          this.state=state
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
          const {id} = this.$route.query
          const selectCourse=this.coursesInfos[this.checkedIndex]
          receiveFree({
            cid:selectCourse.id,
            giftId:id,
            ...this.userForm
          }).then(()=>{
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
    }
  }
</script>

<style lang="less" scoped>
  .receive-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url("./img/bg.png") no-repeat;
    background-size: 100%;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 120px 12px 0;

    .inner-box{
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      position: relative;
      .line-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 14px;
        box-sizing: border-box;
        padding: 40px 40px 30px;
        .line{
          font-size: 17px;
          font-weight: bold;
          color: #4B0E09;
          line-height: 17px;
          margin: 0 20px;
        }
        .circular-box{
          flex: 1;
          height: 2px;
          background: #4B0E09;
        }

      }
      .body-box{
        padding-bottom: 10px;
        .course-item{
          display: flex;
          align-items: center;
          justify-content: space-around;
          .check-box{
            width: 20px;
            height: 20px;
            border: 1px solid #CCCCCC;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .checked{
            border-color: #F65E41;
            .spot{
              width: 8px;
              height: 8px;
              background: #F65E41;
              border-radius: 50%;
            }
          }
          .card-box{
            height: 100px;
            box-sizing: border-box;
            padding: 10px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 85%;
            .img-box{
              width: 108px;
              height: 80px;
              border-radius: 5px;
            }
            .text-box{
              height: 100%;
              display: flex;
              flex-direction: column;
              margin-left: 10px;
              .title-box{
                width: 180px;
                font-size: 14px;
                font-weight: bold;
                color: #222222;
                line-height: 28px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .subtitle-box{
                width: 180px;
                height: 34px;
                font-size: 12px;
                font-weight: 400;
                color: #999999;
                line-height: 17px;
              }

            }
          }
        }
      }
    }

    .btn-box{
      width: 100%;
      height: 72px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
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
