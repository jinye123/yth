<template>
  <div class="page-box">
    <div class="auth-container">
      <van-notice-bar
        style="font-size: 12px"
        :scrollable="false"
        mode="closeable"
        left-icon="volume-o"
        text="为保证准确性，请务必通过拍照或上传图片进行认证"
      />
      <div class="top-box">
        <div class="img-icon">
          <img src="./img/1.png" alt="">
          <div class="text-box">身份验证</div>
        </div>
        <img src="./img/to.png" alt="">
        <div class="img-icon">
          <img v-if="!nextStatus" src="./img/2.png" alt="">
          <img v-else src="./img/2-2.png" alt="">
          <div class="text-box">短信验证</div>
        </div>
      </div>
      <div class="form-box" v-show="!nextStatus">
        <van-form
          colon
        >
          <van-uploader
            :after-read="afterRead"
          >
            <van-field
              style="width: 375px"
              label="证件类型"
              value="居民身份证"
              readonly
            />
          </van-uploader>
          <van-uploader
            :after-read="afterRead"
          >
            <van-field
              style="width: 375px"
              label="姓 名"
              v-model="cardForm.name"
              placeholder="真实姓名"
              readonly
            />
          </van-uploader>
          <van-uploader
            :after-read="afterRead"
          >
            <van-field
              style="width: 375px"
              label="性 别"
              :value="cardForm.sex"
              placeholder="性 别"
              readonly
            />
          </van-uploader>
          <van-field
            readonly
            label="身份证号"
            v-model="cardForm.idNumber"
            placeholder="证件号码"
          >
            <template #button>
              <van-uploader
                :after-read="afterRead"
              >
                <van-icon size="24" style="margin-right: 10px" name="photograph" />
              </van-uploader>
            </template>
          </van-field>
          <div style="margin: 100px 85px;">
            <van-button
              :disabled="!cardForm.idNumber"
              @click="nextStatus=true"
              style="width: 100%;height: 45px"
              round
              block
              type="info"
            >
              下一步
            </van-button>
          </div>
        </van-form>
      </div>
      <div class="form-box" v-show="nextStatus">
        <van-form>
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
          <div style="margin: 170px 85px;">
            <van-button
              style="width: 100%"
              round
              block
              type="info"
              @click="onSubmitPhone"
            >
              {{type==='extensionCenter'?'申 请':'验 证'}}
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mobile
  } from "../../utils/validate";
  import {
    getCode,
    userAuth,
    applyExtension,
    checkIdCard
  } from "../../api";
  import {Toast} from "vant";

  export default {
    name: "index",
    data() {
      return {
        nextStatus: false,
        type:'',
        cardForm: {
          name: '',
          idNumber: '',
          sex: '',
        },
        userForm: {
          phone: '',
          code: ''
        },
        codeTime: 60 * 1000,
        showCountDown: false,
      }
    },
    created() {
      const {type} = this.$route.query;
      this.type=type;
    },
    methods: {
      afterRead(content) {
        const form = new FormData();
        form.append('file', content.file)
        form.append('type', 1)
        checkIdCard(form).then(res => {
          this.cardForm = {...this.cardForm, ...res}
        })
      },
      onSubmitPhone() {
        const {phone, code} = this.userForm
        const {name, idNumber, sex} = this.cardForm
        if (mobile(phone) && code) {
          const form = new FormData();
          form.append('idNumber', idNumber)
          form.append('name', name)
          form.append('sex', sex)
          form.append('phone', phone)
          form.append('code', code)
          if(this.type==='extensionCenter'){
            applyExtension(form).then(res=>{
              Toast.success('提交成功');
              this.$router.back()
            })
          }else {
            userAuth(form).then(async () => {
              Toast.success('认证成功');
              this.$router.back()
            })
          }
        } else {
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
    }
  }
</script>

<style scoped lang="scss">
  .auth-container {
    width: 100%;
    height: 100vh;
    background: #ffffff;
    box-sizing: border-box;

    .top-box {
      display: flex;
      align-items: center;
      padding: 20px 0;
      box-sizing: border-box;
      justify-content: center;

      img {
        margin: 0 10px;
        width: 77px;
      }

      .img-icon {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 42px;
          height: 42px;
        }

        .text-box {
          font-size: 14px;
          font-weight: 500;
          color: #666666;
          line-height: 24px;
        }
      }
    }

    .form-box {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 0 0;

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
        color: #F3504A;
        margin-left: 10px;
        text-align: center;
      }

      .code-box {
        font-size: 13px;
        color: #F3504A;
        margin-left: 10px;
        display: inline-block;
        width: 70px;
        vertical-align: middle;
      }
    }
  }
</style>
