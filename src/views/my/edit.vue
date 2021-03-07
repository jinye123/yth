<template>
  <div class="page-box edit-container">
    <van-form
      size="large"
      input-align="right"
    >
      <van-field
        center
        name="avatar"
        label="头像"
      >
        <template #input>
          <van-uploader>
            <img style="width: 40px;height: 40px" src="./img/avatar.png" alt="">
          </van-uploader>
        </template>
      </van-field>
      <van-field
        v-model="formData.name"
        name="name"
        label="昵称"
        placeholder="请输入昵称"
      >
      </van-field>
      <van-field
        v-model="formData.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        name="address"
        label="实名认证"
      >
        <template #input>
          <van-button
            round
            size="small"
            style="width: 63px;height: 26px"
            color="linear-gradient(to right, #3594FE, #1680FF)"
          >
            去认证
          </van-button>
        </template>
      </van-field>
      <van-field
        v-model="formData.address"
        is-link
        name="address"
        label="常住地"
        placeholder="请输入常住地"
      />
      <van-field
        v-model="formData.email"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱账号"
      />
      <van-field
        v-model="formData.company"
        name="company"
        label="公司"
        placeholder="请输入公司名称"
      />
      <van-field
        v-model="formData.zw"
        name="zw"
        label="职位"
        placeholder="请输入职位"
      />
      <div class="btn-box">
        <van-button
          color="#F5CD39"
          block
          round
        >
          <span style="color: #130F00;font-size: 16px">保 存</span>
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

export default {
  name: 'Edit',
  data() {
    return {
      formData: {
        avatar: '',
        name: '',
        phone: '',
        address: '中国',
        email: '',
        company: '',
        zw: ''
      }
    }
  },
  computed: {},
  mounted() {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>

.edit-container {
  width: 100%;
  height: 100%;
  background: #ffffff;
  padding: 0 10px;
  box-sizing: border-box;

  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    box-sizing: border-box;
    padding: 15px;
  }
}
</style>
