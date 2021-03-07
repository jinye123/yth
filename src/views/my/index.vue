<template>
  <div class="page-box container-box">
    <div class="header-box" @click="clickHandle">
      <div class="left-box">
        <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="">
        <div class="info-box">
          <div class="name-box">洪晓寒</div>
          <div class="role-box">普通会员</div>
        </div>
      </div>
      <div class="right-box">
        <van-icon name="arrow" size="15px" color="#C8C9CC" />
      </div>
    </div>
    <div class="more-service">
      <div class="title-box">
        更多服务
      </div>
      <div class="category-container">
        <div class="category-item">
          <img src="./img/dd.png" alt="">
          订单记录
        </div>
        <div class="category-item" @click="$router.push('/my/invite')">
          <img src="./img/yq.png" alt="">
          邀请关系
        </div>
        <div class="category-item" @click="$router.push('/my/history')">
          <img src="./img/sk.png" alt="">
          上课记录
        </div>
        <div class="category-item" @click="$router.push('/my/billApply')">
          <img src="./img/fp.png" alt="">
          发票申请
        </div>
        <div class="category-item">
          <img src="./img/ye.png" alt="">
          账户余额
        </div>
        <div class="category-item" @click="$router.push('/my/ticket')">
          <img src="./img/mp.png" alt="">
          我的门票
        </div>
        <div class="category-item">
          <img src="./img/ss.png" alt="">
          扫一扫
        </div>
        <div class="category-item">
          <img src="./img/xs.png" alt="">
          线上课程
        </div>
      </div>
    </div>
    <div class="menu-list">
      <div class="menu-item">
        <div class="left-box">
          <img src="./img/xx.png" alt="">
          <div class="name-box">我的消息</div>
        </div>
        <div class="right-box">
          <van-icon name="arrow" size="15px" color="#C8C9CC" />
        </div>
      </div>

      <div class="menu-item">
        <div class="left-box">
          <img src="./img/xy.png" alt="">
          <div class="name-box">服务协议</div>
        </div>
        <div class="right-box">
          <van-icon name="arrow" size="15px" color="#C8C9CC" />
        </div>
      </div>
      <div class="menu-item">
        <div class="left-box">
          <img src="./img/bz.png" alt="">
          <div class="name-box">帮助与反馈</div>
        </div>
        <div class="right-box">
          <van-icon name="arrow" size="15px" color="#C8C9CC" />
        </div>
      </div>
      <div class="menu-item">
        <div class="left-box">
          <img src="./img/kf.png" alt="">
          <div class="name-box">在线客服</div>
        </div>
        <div class="right-box">
          <van-icon name="arrow" size="15px" color="#C8C9CC" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'My',
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    }),
  },
  data() {
    return {

    }
  },
  methods: {
    clickHandle(){
      this.$router.push('/edit')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-box{
  padding: 0 18px;
}
.header-box {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left-box{
    display: flex;
    align-items: center;
    img{
      width: 64px;
      height: 64px;
      box-shadow: 0px 1px 6px 0px #F3F3F4;
      border: 1px solid #E5E6E9;
      border-radius: 50%;
    }
    .info-box{
      margin-left: 12px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name-box{
        font-size: 17px;
        font-weight: bold;
        color: #130F00;
        line-height: 24px;
      }
      .role-box{
        width: 78px;
        height: 22px;
        background: linear-gradient(270deg, #2C3B6C 0%, #3F4B84 40%, #293365 100%);
        border-radius: 11px;
        font-size: 12px;
        font-weight: 500;
        color: #FDE784;
        line-height: 22px;
        text-align: center;
      }
    }
  }
}

.more-service{
  width: 100%;
  height: 184px;
  background: #FFFFFF;
  box-shadow: 0px 1px 6px 0px #F3F3F4;
  border-radius: 10px;
  margin-bottom: 15px;
  .title-box{
    font-size: 17px;
    font-weight: bold;
    color: #130F00;
    line-height: 24px;
    padding: 10px 22px;
  }
  .category-container{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    .category-item{
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      img{
        width: 36px;
        height: 36px;
        margin-bottom: 5px;
      }
    }
  }
}

.menu-list{
  width: 345px;
  height: 253px;
  background: #FFFFFF;
  box-shadow: 0px 1px 6px 0px #F3F3F4;
  border-radius: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  padding: 10px;
  .menu-item{
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-box{
      display: flex;
      align-items: center;
      img{
        width: 36px;
        height: 36px;
      }
      .name-box{
        font-size: 15px;
        font-weight: 500;
        color: #000001;
        line-height: 14px;
        margin-left: 10px;
      }
    }
  }
}

</style>
