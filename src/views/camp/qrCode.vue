<template>
  <div class="page-box">
    <div class="open-year-box">
      <div class="top-box">
        <div class="top-item">
          <img src="./img/top1.png"/>
          <p>完成支付</p>
        </div>
        <div class="top-item">
          <img class="right-img" src="./img/right.png"/>
        </div>
        <div class="top-item">
          <img src="./img/top2.png"/>
          <p>绑定手机</p>
        </div>
        <div class="top-item">
          <img class="right-img" src="./img/right.png"/>
        </div>
        <div class="top-item">
          <img src="./img/top3.png"/>
          <p>加老师</p>
        </div>
        <div class="top-item">
          <img class="right-img" src="./img/right.png"/>
        </div>
        <div class="top-item">
          <img src="./img/top4.png"/>
          <p>加入社群</p>
        </div>
      </div>
      <div class="success-box">
        <img src="./img/success.png" alt="">
        已付款
      </div>
      <div class="tip-box">
        扫描下方二维码，添加小助手为好友，开课前
        小助手会提前通知你，并拉你进训练营社群
      </div>
      <div class="qr-box">
        <img :src="qrSrc" alt="">
      </div>
      <div class="text-box">[长按]识别二维码</div>
      <div class="btn-box">
        <van-button
          round
          style="width: 279px;margin-bottom: 10px"
          size="large"
          block
          to="/kcap?refer=camp"
          color="linear-gradient(to right, #FFDFB1,#FAB45C)"
        >
          <span style="color: #8A5206">
            立即查看小白训练营课程安排
          </span>
        </van-button>

        <van-button
          round
          style="width: 279px"
          size="large"
          block
          @click="goPoster"
          color="linear-gradient(to right, #FEC377, #FA3747)"
        >
          <span style="font-size: 14px">
            邀请好友来学习<br/>
            你俩各得5元红包，可提现到微信零钱
          </span>
        </van-button>
      </div>
      <Menus/>
      <van-overlay :show="!hasPhone">
        <div class="formContainer">
          <div class="formBox" @click.stop>
            <p>手机号绑定</p>
            <van-form label-width="60px" label-align="center" @submit="onSubmitPhone">
              <van-field
                v-model="userForm.phone"
                name="phone"
                label="手机号"
                placeholder="手机号"
              />
              <van-field
                v-model="userForm.code"
                type="text"
                name="code"
                label="验证码"
                placeholder="验证码"
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
              <div style="margin-top: 20px;display: flex;justify-content: center">
                <van-button style="width: 256px;height: 36px" round block color="#2C80FF" native-type="submit">
                  保 存
                </van-button>
              </div>
            </van-form>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
  import Menus from './../../components/Menus'
  import {mobile} from "../../utils/validate";
  import {
    getCode,
    submitPhone,
    getQrCode,
  } from "../../api";
  import {Toast} from "vant";
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "qrCode",
    data() {
      return {
        userForm: {
          phone: '',
          code: ''
        },
        codeTime: 60 * 1000,
        showCountDown: false,
        qrSrc:""
      }
    },
    computed:{
      ...mapGetters({
        userInfo:'userInfo'
      }),
      hasPhone(){
        if(this.userInfo.phone){
          return true
        }else {
          return false
        }
      }
    },
    components:{
      Menus
    },
    mounted() {
      this._getQrCode()
    },
    methods: {
      ...mapActions({
        getInfo:'user/getInfo',
      }),
      // 去海报页面
      goPoster(){
        this.$router.push({
          path:'/camp/hb',
          query:{id:this.$route.query.id}
        });
      },
      // 提交
      onSubmitPhone() {
        const {phone,code}=this.userForm
        if(mobile(phone)&&code){
          submitPhone(this.userForm).then(async ()=>{
            await this.getInfo()
            Toast('手机号绑定成功')
          })
        }else {
          Toast('请输入正确的手机号和验证码')
        }
      },
      // 完成倒计时
      finishCountDown() {
        this.codeTime = 60 * 1000
        this.showCountDown = false
      },
      // 获取验证码
      getCodeHandle() {
        const {phone} = this.userForm
        if (mobile(phone)) {
          getCode(phone).then(() => {
            this.showCountDown = true;
            Toast('发送验证码成功')
            this.$nextTick(() => {
              this.$refs.countDown.start();
            })
          })
        } else {
          Toast('请输入正确的手机号')
        }
      },
      _getQrCode(){
        getQrCode({refer:'camp'}).then(res=>{
          const {url} = res;
          this.qrSrc=url
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .open-year-box {
    width: 100%;
    height: 100vh;
    background: #ffffff;

    .top-box {
      width: 100%;
      height: 70px;
      box-sizing: border-box;
      padding: 0 20px;
      background: #FFFFFF;
      box-shadow: 0px 1px 6px 0px rgba(138, 104, 64, 0.12);
      border-radius: 0px 0px 20px 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .top-item {
        text-align: center;

        img {
          width: 35px;
          height: 35px;
        }

        p {
          font-size: 12px;
          font-weight: 500;
          color: #666666;
          line-height: 15px;
        }

        .right-img {
          width: 22px;
          height: 8px;
          margin-top: -10px
        }
      }
    }

    .success-box {
      width: 100%;
      padding: 30px 0;
      box-sizing: border-box;
      font-size: 20px;
      font-weight: bold;
      color: #303030;
      line-height: 37px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }

    .tip-box {
      font-size: 15px;
      font-weight: 500;
      color: #333333;
      line-height: 24px;
      text-align: center;
      padding: 0 32px;
    }

    .qr-box {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 30px;
      text-align: center;

      img {
        width: 200px;
        height: 200px;
      }
    }

    .text-box {
      text-align: center;
      font-size: 15px;
      font-weight: 500;
      color: #666666;
      line-height: 21px;
      letter-spacing: 1px;
    }

    .btn-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-bottom: 10px;
    }

    .formContainer {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      .formBox, .ggBox {
        box-sizing: border-box;
        padding: 32px 0 10px;
        width: 80%;
        height: 240px;
        background: rgba(255, 255, 255, 1);
        border-radius: 12px;

        p {
          width: 100%;
          font-size: 17px;
          font-weight: 500;
          color: #000000;
          line-height: 24px;
          text-align: center;
        }

        .text-box {
          width: 256px;
          font-size: 15px;
          font-weight: 400;
          color: #333333;
          line-height: 21px;
          padding: 4px 16px;
        }

        .van-form {
          margin-top: 20px;

          .van-field__label {
            color: #333333;
            font-size: 15px;

            span {
              font-size: 12px;
            }
          }
        }

        .line-box {
          display: inline-block;
          height: 18px;
          width: 1px;
          background: #E7E7E7;
          vertical-align: middle;
        }

        .van-count-down {
          display: inline-block;
          width: 70px;
          color: #D64848;
          margin-left: 10px;
          text-align: center;
        }

        .code-box {
          font-size: 13px;
          color: #F7B500;
          margin-left: 10px;
          display: inline-block;
          width: 70px;
          vertical-align: middle;
        }

        .agreement-box {
          font-size: 12px;
          padding: 20px 20px 0;
          display: flex;
          align-items: flex-start;

          span {
            margin-left: 10px;
          }

          a {
            color: #E25C5A;
          }
        }
      }

      .ggBox {
        height: auto;
      }
    }
  }
</style>
