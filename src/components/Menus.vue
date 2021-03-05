<template>
  <div class="menu-container">
    <div class="menu-box" v-if="state===0">
      <img @click="handleClick" src="../assets/img/fl.png" alt="">
    </div>
    <div class="menu-box" v-if="state===1">
      <img @click="handleClick1" src="../assets/img/gg.png" alt="">
      公告
    </div>
    <van-popup v-model="showMenus" round position="bottom" :style="{ height: '136px' }">
      <div class="popup-container">
        <div class="body-box">
          <div @click="goHomeHandle" class="menu-item">
            <div class="icon-box">
              <span style="size: 12px;margin-bottom: 5px" class="icon icon-shouye1"></span>
            </div>
            <div class="text-box">
              店铺首页
            </div>
          </div>
          <div @click="showKfHandle" class="menu-item">
            <div class="icon-box">
              <span style="size: 12px;margin-bottom: 5px" class="icon icon-zixun"></span>
            </div>
            <div class="text-box">
              客服
            </div>
          </div>
          <div @click="goMyHandle" class="menu-item">
            <div class="icon-box">
              <van-icon name="send-gift-o"/>
            </div>
            <div class="text-box">
              已购课程
            </div>
          </div>
        </div>
        <div @click="showMenus=false" class="bottom-box">
          关闭
        </div>
      </div>
    </van-popup>
    <van-overlay z-index="2000" :show="showKf" @click="showKf = false">
      <div style="padding:0 60px;height: 100%;display: flex;align-items: center;justify-content: center">
        <img style="width: 100%" src="../assets/img/kf.png" alt="">
      </div>
    </van-overlay>
    <van-overlay :show="showForm" @click="showForm = false">
      <div class="formContainer">
        <div class="formBox" @click.stop>
          <p>课程同步</p>
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
    <van-overlay :show="showGg" @click="showGg = false">
      <div class="formContainer">
        <div class="ggBox" @click.stop>
          <p>公告</p>
          <div class="text-box">
            由于课程平台更换，部分已购买本课程的用户，无法在【圣商在线】公众号内观看，提供解决方案如下：
          </div>
          <div class="text-box">
            <strong>方案一：</strong> <br/>
            关注【圣商教育官微】公众号，中间菜单【往期课程】中查看并收听本课程。
          </div>
          <div class="text-box">
            <strong>方案二：</strong> <br/>
            如在本平台收听，需要绑定手机号，确保在【圣商教育官微】—【往期课程】—【我的】—【编辑个人资料】中绑定手机号之后，点击下方【课程同步】，输入相同手机号并验证，可直接收听本课程。
          </div>
          <div class="text-box">
            如有任何疑问，可点击左下角【客服】，添加小助手询问哦~
          </div>
          <div style="margin-top: 20px;display: flex;justify-content: center">
            <van-button @click.stop="tbkcHandle" style="width: 256px;height: 36px" round block color="#2C80FF"
                        native-type="submit">
              课程同步
            </van-button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {Toast} from "vant";
  import {mobile} from "../utils/validate";
  import {getGgCode, submitGgPhone} from "../api";
  import {mapGetters} from "vuex";

  export default {
    name: "Menus",
    props: {
      state: {
        type: Number,
        default:
          () => {
            return 0
          }
      },
      courses: {}
    },
    data() {
      return {
        showMenus: false,
        showKf: false,
        showGg: false,
        showForm: false,
        userForm: {
          phone: '',
          code: ''
        },
        codeTime: 60 * 1000,
        showCountDown: false,
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      }),
    },
    methods: {
      handleClick() {
        this.showMenus = true;
      },
      handleClick1() {
        this.showGg = true
      },
      tbkcHandle() {
        this.showGg = false;
        this.showForm = true;
      },
      // 提交
      onSubmitPhone() {
        const {phone, code} = this.userForm
        if (mobile(phone) && code) {
          submitGgPhone({
              code,
              uid: this.userInfo.uid,
              cid: this.courses.id,
              phone,
            }
          ).then(async () => {
            Toast.success('同步成功');
            window.location.reload();
          }).catch(err => {
            Toast.fail('同步失败，请联系客服');
          })
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
          getGgCode(phone).then(() => {
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
      goHomeHandle() {
        this.$router.push({path: '/'})
      },
      showKfHandle() {
        this.showMenus = false;
        this.showKf = true;
      },
      goMyHandle() {
        this.$router.push({path: '/my'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-box {
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    font-size: 9px;

    img {
      width: 20px;
      height: 20px;
      margin-bottom: 2px;
    }
  }

  .popup-container {
    width: 100%;
    height: 100%;

    .body-box {
      width: 100%;
      height: calc(100% - 48px);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-box {
          margin-bottom: 5px;

          span {
            font-size: 20px;
          }

          i {
            font-size: 20px;
          }
        }

        .text-box {
          color: #666666;
          font-size: 13px;
        }
      }
    }

    .bottom-box {
      height: 48px;
      text-align: center;
      line-height: 48px;
      color: #666666;
      font-size: 17px;
      border-top: 1px solid #F0F0F0;
    }
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
        color: #D64848;
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
</style>
