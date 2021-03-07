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
      <div class="form-box" v-show="!nextStatus">
        <van-form
          size="large"
          input-align="right"
        >
          <van-field
            is-link
            label="证件类型"
            value="居民身份证"
            readonly
          />
          <van-field
            label="姓 名"
            v-model="cardForm.name"
            placeholder="真实姓名"
            readonly
          />
          <van-field
            label="性 别"
            :value="cardForm.sex"
            placeholder="性 别"
            readonly
          />
          <van-field
            readonly
            label="证件号码"
            v-model="cardForm.idNumber"
            placeholder="证件号码"
          >
          </van-field>
          <div class="btn-box">
            <van-button
              round
              block
              type="info"
            >
              拍照识别身份证
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      nextStatus: false,
      type: '',
      cardForm: {
        name: '',
        idNumber: '',
        sex: '',
      },
    }
  },
  created() {

  },
  methods: {}
}
</script>

<style scoped lang="scss">
.auth-container {
  width: 100%;
  height: 100vh;
  background: #ffffff;
  box-sizing: border-box;

  .form-box {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }

  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 166px;
    box-sizing: border-box;
    padding: 15px;
  }
}
</style>
