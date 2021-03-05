<template>
  <div class="msg-wrap">
    <div class="msg-list">
      <div class="item" v-for="(item, index) in msgList" :key="index" @click.stop="enterPage">
        <div class="item-left">
          <img src="./images/msg_1.png" alt="" class="img">
          <div v-if="!item.isLook" class="badge-box"></div>
        </div>
        <div class="item-right">
          <div class="name">小助手</div>
          <div class="desc">亲爱的同学，恭喜你已报名[ {{item.title}} ]快来一起学习吧~</div>
        </div>
      </div>
      <van-empty v-if="!msgList.length" style="height: 100%" description="暂无消息哦~" />
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import {getMessageList} from '../../api'
  import {getMessageHistoryTime,saveMessageHistoryTime} from '../../utils/cache'
export default {
  name: 'Message',
  data() {
    return {
      msgList: []
    }
  },
  methods:{
    _getMessageList(){
      const messageHistoryTime=getMessageHistoryTime()
      getMessageList().then(res=>{
        this.msgList=res.map(item=>{
          if(item['pay_time']-messageHistoryTime>=0||!messageHistoryTime){
            item.isLook=false
          }else {
            item.isLook=true
          }
          return item
        })
        saveMessageHistoryTime(dayjs().valueOf())
      })
    },
    enterPage() {
      this.$router.push({path:'/my'})
    }
  },
  created() {
    this._getMessageList()
  }
}
</script>

<style lang="less" scoped>
.msg-wrap{
  padding: 16px 16px 50px;
  height: 100vh;
  box-sizing: border-box;
  background: #ffffff;
  .msg-list{
    height: 100%;
    padding-bottom: 16px;
    box-sizing: border-box;
    .item{
      display: flex;
      margin-bottom: 16px;
      .item-left{
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;
        .img{
          width: 100%;
          height: 100%;
        }
        .badge-box{
          position: absolute;
          right: -2px;
          top: -2px;
          width: 10px;
          height: 10px;
          background: red;
          border-radius: 50%;
        }
      }
      .item-right{
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(245,245,245,1);
        flex: 1;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        .name, .desc{
          margin-bottom: 5px;
        }
      }

    }
  }
}
</style>
