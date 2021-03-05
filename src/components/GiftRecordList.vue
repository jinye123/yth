<template>
  <div class="card-list">
    <van-card
      v-for="item in recCourses"
    >
      <template slot="title">
        <p class="card-title-box">
          {{item['title']}}
        </p>
      </template>
      <template slot="thumb">
        <van-image
          @click="handleClick(item.coursesId)"
          width="100%"
          height="100%"
          fit="cover"
          :src="item['purl']"
        />
      </template>
      <template slot="num">
        <van-button
          v-if="!hasGift"
          round style="height: 23px;width: 56px"
          @click="giftHandle(item.id)"
          size="mini"
          color="#D64848"
        >
          赠 送
        </van-button>
        <van-button
          v-if="hasGift"
          round style="height: 23px;width: 55px"
          size="mini"
          color="#CACACA"
        >
          已 赠
        </van-button>
      </template>
      <template slot="price">
        <div class="num-box"><span style="font-size: 14px">{{item['createTime']}}</span></div>
      </template>
    </van-card>
  </div>
</template>

<script>
  export default {
    name: 'GiftRecordList',
    props:['recCourses','hasGift'],
    data(){
      return {
        dataList:[]
      }
    },
    methods:{
      handleClick(id){
        this.$emit('click',id)
      },
      giftHandle(id){
        this.$emit('giftHandle',id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-list{
    .van-cell__title {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
    }

    .more-course-box {
      color: #EE4F4D;
      font-size: 12px;
    }

    .van-card {
      background: #ffffff;
      margin-top: 0;

      .van-card__title {
        font-size: 14px;
        color: #222222;
      }

      .card-title-box{
        font-size: 14px;
        color: #222222;
        font-weight:bold;
        line-height: 21px;
        span{
          vertical-align: middle;
          display: inline-block;
          width:46px;
          height:15px;
          background:linear-gradient(270deg,rgba(254,185,54,1) 0%,rgba(254,132,2,1) 100%);
          border-radius:2px;
          font-size:9px;
          text-align: center;
          line-height: 15px;
          color: #ffffff;
          margin-right: 5px;
        }
      }

      .num-box {
        font-size: 12px;
        color: #666666;
      }
    }
  }
</style>
