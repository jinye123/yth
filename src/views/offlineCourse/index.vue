<template>
  <div class="page-box">
    <div class="course-list">
      <div v-if="listData.length">
        <van-card
          @click="goDetailHandle(item.id)"
          v-for="item in listData"
          :title="item['name']"
          :thumb="item['purl']"
        >
          <template slot="thumb">
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              :src="item['cover']"
            />
          </template>
          <template slot="desc">
            <p style="margin-top: 20px;font-size: 12px;display: flex">
              <van-icon style="margin-right: 4px" name="location-o" />
              <span style="line-height: 12px;font-size: 12px">{{item['address']}}</span>
            </p>
          </template>
          <template slot="num">
            <div class="price-box"></div>
          </template>
          <template slot="price">
            <div class="num-box">
              <van-icon style="margin-right: 5px" name="clock-o" />
              {{item['startTime'].split(' ')[0]}}至{{item['endTime'].split(' ')[0]}}
            </div>
          </template>
        </van-card>
      </div>
      <div v-if="!loading&&!listData.length" class="empty-box">
        <div class="text-box">
          1月份全国精华会议将在<span style="color: #FFE9C3;font-weight: 300">3月15日前</span><br/>
          发布上线！
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getLineMeetList
  } from '../../api'

  export default {
    name: 'More',
    data() {
      return {
        listData: [],
        loading:false
      }
    },
    created() {
      this._getLineMeetList()
    },
    methods: {
      _getLineMeetList() {
        this.loading=true;
        getLineMeetList({}).then(res => {
          const {items} = res;
          this.loading=false;
          this.listData=items
        })
      },
      goDetailHandle(id){
        this.$router.push({path:`/offlineCourse/detail?id=${id}`})
      }
    }
  }
</script>

<style lang="scss">
  .course-list {
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

      .price-box {
        color: #C99743;
        font-size: 14px;
        .original-price{
          color: #A7AEB4;
          font-size: 12px;
          text-decoration: line-through;
          margin-right: 8px;
        }
      }

      .num-box {
        font-size: 12px;
        color: #666666;
        display: flex;
        align-items: center;
      }
    }

    .empty-box{
      width: 100%;
      height: 100vh;
      background: url("./img/empty.png");
      background-size: 100% 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      .text-box{
        text-align: center;
        color: #FFFFFF;
        font-size: 15px;
        margin-bottom: 60px;
        line-height: 26px;
        letter-spacing: 3px;
        font-weight: 300;
      }
    }

  }
</style>
