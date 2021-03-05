<template>
  <div class="page-box">
    <van-tabs sticky v-model="activeName">
      <van-tab title="未赠出" name="a">
        <div class="container-box">
          <van-list
            v-model="loading0"
            :finished="finished0"
            finished-text="没有更多了"
            @load="onLoad0"
          >
            <GiftRecordList @click="handleClick" :hasGift="false" @giftHandle="giftHandle" :recCourses="giftList0" />
          </van-list>
          <van-empty class="custom-image" :image="emptySrc" style="height: 100%" v-if="!giftList0.length" description="暂无赠送">
            <p>您还没有成功赠送的内容哦～</p>
          </van-empty>
        </div>
      </van-tab>
      <van-tab title="已赠出" name="b">
        <div class="container-box">
          <GiftRecordList @click="handleClick" :hasGift="true" :recCourses="giftList2" />
          <van-empty class="custom-image" :image="emptySrc"  style="height: 100%" v-if="!giftList2.length" description="暂无赠送">
            <p>您还没有成功赠送的内容哦～</p>
          </van-empty>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import {getGiftRecordList} from '../../api'
  import emptySrc from './img/gift_empty.png'
  import GiftRecordList from "../../components/GiftRecordList";
  export default {
    name: "index",
    data() {
      return {
        activeName: 'a',
        giftList0:[],
        giftList2:[],
        emptySrc:emptySrc,
        loading0:false,
        finished0:false,
        pageIndex0:1,
      };
    },
    components:{
      GiftRecordList
    },
    created() {
      this._getGiftRecordList(0)
      // this._getGiftRecordList(2)
    },
    methods:{
      handleClick(id){
        this.$router.push({path:`/detail?id=${id}`})
      },
      giftHandle(id){
        this.$router.push({path:`/sendFriends?id=${id}`})
      },
      onLoad0(){
        this.pageIndex0=this.pageIndex0+1
        this._getGiftRecordList(0)
      },
      _getGiftRecordList(shareStatus){
        getGiftRecordList({shareStatus, pageIndex:this[`pageIndex${shareStatus}`]}).then(res=>{
          const {records} = res;
          this[`giftList${shareStatus}`] = this[`giftList${shareStatus}`].concat(records);
          if(records.length<10){
            this[`finished${shareStatus}`]=true;
          }
          this[`loading${shareStatus}`] = false;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-box{
    width: 100%;
    background: #ffffff;
    height: calc(100vh - 50px);
    .custom-image{
      p{
        color: #9e9e9e;
        font-size: 12px;
      }
    }
  }
</style>
