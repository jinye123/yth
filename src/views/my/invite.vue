<template>
  <div class="page-box">
    <div class="header-box">
      邀请人信息
    </div>
    <van-cell-group>
      <van-cell size="large" title="姓名" value="阎涛青" />
      <van-cell size="large" title="证件类型" value="身份证" />
      <van-cell size="large" title="证件号码" value="145432988734560346" />
      <van-cell size="large" title="电话" value="18699345680" />
    </van-cell-group>
  </div>
</template>

<script>

export default {
  name: 'index',
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
.page-box {
  width: 100%;
  height: 100%;
  background: #ffffff;
  padding: 10px 10px;
  box-sizing: border-box;

  .header-box{
    font-size: 20px;
    font-weight: bold;
    color: #141517;
    padding: 30px 10px;
  }

}
</style>
