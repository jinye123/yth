<template>
  <div class="card-list">
    <van-card
      @click="handleClick(item.id)"
      v-for="item in recCourses"
      :desc="item['subTitle']"
    >
      <template slot="title">
        <p class="card-title-box">
          <span v-if="isDist">爆款拼团</span>
          {{item['title']}}
        </p>
      </template>
      <template slot="thumb">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="item['purl']"
        />
      </template>
      <template slot="num">
        <div class="price-box" v-if="!isDist">￥{{item['price']}}</div>
        <div class="price-box" v-else>限时拼团价￥{{item['newPrice']}}</div>
      </template>
      <template slot="price">
        <div class="num-box" v-if="!isDist">{{item['count']}}人一起学习</div>
        <div class="num-box" v-else><span style="font-size: 14px">原价￥{{item['price']}}</span></div>
      </template>
    </van-card>
  </div>
</template>

<script>
  export default {
    name: 'CardList',
    props:['recCourses','isDist'],
    data(){
      return {
        dataList:[]
      }
    },
    methods:{
      handleClick(id){
        this.$emit('click',id)
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

      .price-box {
        color: #C99743;
        font-size: 14px;
      }

      .num-box {
        font-size: 12px;
        color: #666666;
      }
    }
  }
</style>
