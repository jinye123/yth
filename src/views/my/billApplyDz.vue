<template>
  <div class="page-box">
    <div class="item-box">
      <div class="header-box">
        发票基本信息
      </div>
      <van-form
        size="large"
        input-align="right"
      >
        <van-field
          required
          v-model="formData.name"
          name="name"
          label="本人姓名"
          placeholder="请输入本人姓名"
        >
        </van-field>
        <van-field
          required
          v-model="formData.phone"
          name="phone"
          label="本人身份证"
          placeholder="请输入本人身份证"
        />
        <van-field
          required
          v-model="formData.phone"
          name="phone"
          label="本人电话"
          placeholder="请输入本人电话"
        />
        <van-field
          required
          v-model="formData.address"
          is-link
          name="address"
          label="发票类型"
          placeholder="请选择发票类型"
        />
        <van-field
          required
          v-model="formData.address"
          is-link
          name="address"
          label="款项类型"
          placeholder="请选择款项类型"
        />
        <van-field
          required
          v-model="formData.address"
          name="address"
          label="发票金额"
          placeholder="请输入发票金额"
        />

      </van-form>
    </div>
    <div class="item-box">
      <div class="header-box">
        学员对公单位信息
      </div>
      <van-form
        size="large"
        input-align="right"
      >
        <van-field
          required
          v-model="formData.name"
          name="name"
          label="单位名称"
          placeholder="请填写对公单位名称"
        >
        </van-field>
        <van-field
          required
          v-model="formData.phone"
          name="phone"
          label="单位电话"
          placeholder="请填写对公单位电话"
        />
        <van-field
          required
          v-model="formData.phone"
          name="phone"
          label="单位税号"
          placeholder="请填写对公单位税号"
        />
        <van-field
          required
          v-model="formData.address"
          name="address"
          label="开户银行"
          placeholder="请填写对公单位开户银行"
        />
        <van-field
          required
          v-model="formData.address"
          name="address"
          label="开户行账号"
          placeholder="请填写对公单位开户行账号"
        />
        <van-field
          required
          v-model="formData.address"
          name="address"
          label="单位地址"
          placeholder="请填写对公单位地址"
        />

      </van-form>
    </div>
    <div class="item-box">
      <div class="header-box">
        快递邮寄信息
      </div>
      <van-form
        size="large"
        input-align="right"
      >
        <van-field
          required
          v-model="formData.name"
          name="name"
          label="接收人姓名"
          placeholder="请填写快递接收人姓名"
        >
        </van-field>
        <van-field
          required
          v-model="formData.phone"
          name="phone"
          label="接收人电话"
          placeholder="请填写快递接收人电话"
        />
        <van-field
          required
          v-model="formData.phone"
          name="phone"
          label="接收人地址"
          placeholder="请填写快递接收人地址"
        />
        <van-field
          v-model="formData.address"
          readonly
          name="address"
          label="备    注"
        />
        <van-field
          input-align="left"
          style="background: #F7F7F7;text-align: left"
          rows="2"
          autosize
          type="textarea"
          placeholder="如有特殊需求请填写备注"
          show-word-limit
        />
      </van-form>
    </div>

    <div class="item-box">
      <van-form
        size="large"
        input-align="right"
      >
        <div class="title-box"><span>*</span>个人和公司关系证明扫描</div>
        <van-field name="uploader" readonly>
          <template #label>
            <van-uploader>
              <div class="img-box">+</div>
            </van-uploader>
          </template>
        </van-field>
      </van-form>
    </div>
    <div class="item-box">
      <van-form
        size="large"
        input-align="right"
      >
        <div class="title-box"><span>*</span>个人身份正面扫描</div>
        <van-field name="uploader" readonly>
          <template #label>
            <van-uploader>
              <div class="img-box">+</div>
            </van-uploader>
          </template>
        </van-field>
      </van-form>
    </div>
    <div class="item-box">
      <van-form
        size="large"
        input-align="right"
      >
        <div class="title-box"><span>*</span>个人身份反面扫描</div>
        <van-field name="uploader" readonly>
          <template #label>
            <van-uploader>
              <div class="img-box">+</div>
            </van-uploader>
          </template>
        </van-field>
      </van-form>
    </div>
    <div class="item-box">
      <van-form
        size="large"
        input-align="right"
      >
        <div class="title-box"><span>*</span>协议</div>
        <van-field name="uploader" readonly>
          <template #label>
            <van-uploader>
              <div class="img-box">+</div>
            </van-uploader>
          </template>
        </van-field>
      </van-form>
    </div>
    <div class="btn-box">
      <van-button
        color="#F5CD39"
        block
        style="height: 45px"
      >
        <span style="color: #130F00;font-size: 16px">立即申请</span>
      </van-button>
    </div>
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
        address: '',
        email: '',
        company: '',
        zw: '',
        uploader:''
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
  background: #F5F6F7;
  padding: 10px 15px;
  box-sizing: border-box;
  .item-box{
    background: #FFFFFF;
    box-shadow: 0px 1px 6px 0px #F3F3F4;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 15px;
    .header-box{
      font-size: 18px;
      font-weight: bold;
      color: #141517;
      padding: 20px 0;
    }
    .title-box{
      font-size: 15px;
      font-weight: 400;
      color: #222222;
      line-height: 15px;
      padding: 20px 10px;
      span{
        font-size: 15px;
        font-weight: 400;
        color: #F24841;
        line-height: 15px;
      }
    }
  }

  .img-box{
    width: 54px;
    height: 54px;
    border: 2px solid #E7E7E7;
    color: #979797;
    font-size: 30px;
    text-align: center;
    line-height: 54px;
  }


}
</style>
