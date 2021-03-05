<template>
  <div class="page-box edit-container">
    <van-form
      v-if="!isEditCard"
      error-message-align="right"
      size="large"
      :show-error-message="false"
      input-align="right"
      @submit="onSubmit">
      <!--      <van-field center name="uploader" label="头像">-->
      <!--        <template #input>-->
      <!--          <van-uploader v-model="uploader">-->

      <!--          </van-uploader>-->
      <!--        </template>-->
      <!--      </van-field>-->
      <van-field
        size="large"
        v-model="userInfo.realname"
        name="realname"
        label="真实姓名"
        placeholder="请填写真实姓名"
      />
      <van-field
        size="large"
        name="sex"
        label="性 别"
      >
        <template #input>
          <van-radio-group v-model="userInfo.sex" direction="horizontal">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        size="large"
        v-model="userInfo.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        size="large"
        v-model="userInfo.wxno"
        name="wxno"
        label="微信号"
        placeholder="微信号"
      />
      <div class="btn-box">
        <van-button color="#E25C5A">保 存</van-button>
      </div>
    </van-form>
    <van-form
      v-else
      error-message-align="right"
      size="large"
      :show-error-message="false"
      input-align="right"
      @submit="onSubmit2">
      <van-field
        size="large"
        v-model="idNumber"
        name="idNumber"
        label="身份证号"
        placeholder="请输入身份证号"
      />
      <div class="btn-box">
        <van-button color="#E25C5A">验 证</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import {
    saveUserInfo,
    checkUserRole
  } from '../../api'
  import store from '../../store'
  import {Toast} from 'vant'
  import {mapState} from 'vuex'
  import {mobile} from '../../utils/validate'

  export default {
    name: 'Edit',
    data() {
      return {
        isEditCard:false,
        idNumber:''
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
    },
    mounted() {
      const {flag} = this.$route.query
      this.isEditCard=flag
    },
    methods: {
      onSubmit(values) {
        const {realname, phone, wxno} = values
        if (realname.trim() === '') {
          Toast('名字不能为空')
        } else if (phone === '') {
          Toast('手机号码不能为空')
        } else if (!mobile(phone)) {
          Toast('手机号码格式不正确')
        } else if (wxno.trim() === '') {
          Toast('微信号不能为空')
        } else {
          saveUserInfo({id:this.userInfo.uid,...values}).then(() => {
            store.dispatch('user/getInfo').then(() => {
              Toast.success('修改成功');
              this.$router.replace({path:'/my'})
            })
          })
        }
      },
      onSubmit2(values) {
        const {idNumber} = values
        if (idNumber.trim() === '') {
          Toast('身份证号不能为空')
        } else if (idNumber.length!==18) {
          Toast('身份证号格式不对')
        } else {
          checkUserRole({idNumber}).then(() => {
            store.dispatch('user/getInfo').then(() => {
              Toast.success('修改成功');
            })
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-container {
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 20px 10px;
    box-sizing: border-box;

    .btn-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50%;

      .van-button {
        width: 165px;
        height: 43px;
      }
    }
  }
</style>
