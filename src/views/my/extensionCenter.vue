<template>
  <div class="page-box">
    <div class="extension-center-container">
      <template v-if="extensionState===-1">
        <div class="banner-box">
          <img src="./imgs/tgBg.png" alt="">
        </div>
        <div class="btn-box">
          <van-button
            to="/authenticate?type=extensionCenter"
            round
            block
            style="width: 316px;height: 43px;"
            type="info"
          >
            申请成为推广员
          </van-button>
        </div>
      </template>
      <template v-if="extensionState===0">
        <div class="wait-box">
          <img src="./imgs/wait.png" alt="">
          <div class="title-box">提交成功</div>
          <div class="text-box">正在等待审核…</div>
        </div>
      </template>
      <template v-if="extensionState===1">
        <div class="pass-box">
          <img src="./imgs/pass.png" alt="">
          <div class="title-box">审核通过</div>
          <div class="text-box">
            恭喜您成为推广员，请添加以下<br/>
            客服二维码，完成后续操作
          </div>
          <div class="code-box">
            <img src="./imgs/img.png" alt="">
          </div>
        </div>
      </template>
      <template v-if="extensionState===2">
        <div class="error-box">
          <img src="./imgs/error.png" alt="">
          <div class="title-box">申请不通过</div>
          <div class="text-box">
            很抱歉，您的申请未通过
          </div>
          <div class="code-box">
            <img src="./imgs/img.png" alt="">
          </div>
          <p>如有疑问，请联系客服人员</p>
          <div class="btn-box">
            <van-button
              to="/authenticate"
              round
              block
              style="width: 316px;height: 43px;"
              color="linear-gradient(to right, #F6E1C5, #F1BC6F)"
            >
              <span style="color: #6E4711">再次申请</span>
            </van-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {getExtensionStates} from '../../api'

export default {
  name: "extensionCenter",
  data() {
    return{
      extensionState:''
    }
  },
  created() {
    getExtensionStates().then(res => {
      this.extensionState=res
    })
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.extension-center-container {
  width: 100%;
  height: 100vh;
  background: #ffffff;

  .banner-box {
    width: 100%;

    img {
      width: 100%;
    }
  }

  .wait-box, .pass-box, .error-box {
    width: 100%;
    text-align: center;
    box-sizing: border-box;

    img {
      width: 54px;
      height: 54px;
      padding: 30px;
    }

    .title-box {
      font-size: 18px;
      font-weight: 400;
      color: #333333;
      line-height: 28px;
    }

    .text-box {
      font-size: 13px;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      margin-top: 10px;
    }

    .code-box {
      img {
        width: 212px;
        height: 212px;
      }
    }

    p {
      font-size: 15px;
      font-weight: 500;
      color: #666666;
      line-height: 21px;
      letter-spacing: 1px;
    }
  }

  .btn-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 35px;
  }
}

</style>
