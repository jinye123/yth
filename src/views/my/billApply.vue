<template>
  <div class="page-box">
    <div class="header-box">
      发票申请说明
    </div>
    <p>
      尊敬的学员您好，如您需要申请课程发票，请详细阅读下面开票流程：
    </p>
    <p>
      第一步，申请发票，填写发票信息并提交，等待工作人员信息审核。
    </p>
    <p>
      第二步，信息审核通过后，下载关系证明模版，填写信息并签字盖章，将关系证明材料和本人身份证正反面复印件一份邮寄给总部，邮寄后在业务平台提交快递信息，方便工作人员跟踪、查收快递。等待工作人员材料审核结果。
    </p>
    <p>
      第三步，材料审核通过后，我们会及时安排物流公司邮寄发票，发票的快递信息科通过业务平台进行查询。
    </p>
    <p>
      注意事项：课程发票只能在相应类型课程的签到之日起20日之内提交相关信息。 7.0 版运营商合作款只能在完款之日起的20天内提交相关信息。超过时限将视同自动放弃开票需求。谢谢您的阅读！
    </p>
    <div class="footer-box">
      <div class="btn-item" @click="$router.push('/my/billApplyDz')">申请发票</div>
      <div class="btn-item">下载关系证明模版</div>
      <div class="btn-item">发票列表</div>
      <div class="btn-item">《高级研讨》协议模版</div>
      <div class="btn-item">《我命由我》协议模版</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {}
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
  padding: 10px 30px;
  box-sizing: border-box;

  .header-box {
    font-size: 19px;
    font-weight: bold;
    color: #141517;
    padding: 30px 0;
  }

  p {
    font-size: 14px;
    color: #333333;
    line-height: 26px;
    margin-bottom: 22px;
  }

  .footer-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .btn-item{
      padding: 10px 15px;
      background: #2C80FF;
      border-radius: 5px;
      color: #ffffff;
      font-size: 12px;
      margin-bottom: 10px;
    }
  }

}
</style>
