<template>
  <div class="page-box">
    <div class="course-list">
      <van-list
        :immediate-check="false"
        v-model="loading0"
        :finished="finished0"
        finished-text="没有更多了"
        @load="onLoad0"
        v-if="listData.length"
      >
        <van-card
          @click="goDetailHandle(item.id)"
          v-for="item in listData"
          :desc="item['subTitle']"
          :title="item['title']"
          :thumb="item['purl']"
        >
          <template slot="thumb">
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              :src="item['purl']"
            />
          </template>
          <template slot="num" v-if="item['userState']===4">
            <div class="price-box">已订阅</div>
          </template>
          <template slot="num" v-else-if="item['userState']">
            <div class="price-box">已购</div>
          </template>
          <template slot="num" v-else-if="item['isDisCount']">
            <div class="price-box"><span class="original-price">￥{{item['price']}}</span>￥{{item['disPrice']}}</div>
          </template>
          <template slot="num" v-else-if="item['isGroupon']">
            <div class="price-box"><span class="original-price">￥{{item['price']}}</span>￥{{item['groupCourses']&item['groupCourses']['disPrice']}}</div>
          </template>
          <template slot="num" v-else>
            <div class="price-box">￥{{item['price']}}</div>
          </template>
          <template slot="price">
            <div class="num-box">{{item['count']}}人一起学习</div>
          </template>
        </van-card>
      </van-list>
      <van-empty style="width: 100%;height: 100vh" v-else description="暂无数据"/>

    </div>
  </div>
</template>

<script>
  import {
    getMoreCoursesListByCategoryId,
    getMoreCoursesListByKeyword
  } from '../../api'

  export default {
    name: 'More',
    data() {
      return {
        listData: [],
        loading0: false,
        finished0: false,
        pageIndex0: 0,
      }
    },
    created() {
      this.getDataList()
    },
    methods: {
      onLoad0() {
        this.pageIndex0 = this.pageIndex0 + 1
        this.getDataList()
      },
      getDataList(){
        const {keyword} = this.$route.query
        if(keyword){
          this._getMoreCoursesListByKeyword()
        }else {
          this._getMoreCoursesListByCategoryId()
        }
      },
      _getMoreCoursesListByCategoryId() {
        const {categoryId} = this.$route.query
        getMoreCoursesListByCategoryId({categoryId,page:this.pageIndex0}).then(res => {
          const {content, numberOfElements} = res
          this.listData = content
          if (numberOfElements < 15) {
            this.finished0 = true;
          }
          this.loading0 = false;
        })
      },
      _getMoreCoursesListByKeyword(){
        const {keyword} = this.$route.query
        getMoreCoursesListByKeyword({keyword,page:this.pageIndex0}).then(res => {
          const {content, numberOfElements} = res
          this.listData = content
          if (numberOfElements < 15) {
            this.finished0 = true;
          }
          this.loading0 = false;
        })
      },
      goDetailHandle(id){
        this.$router.push({path:`/detail?id=${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .course-list {
    margin: 8px 0;

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
      }
    }

    .grid-container {
      .img-box {
        width: 168px;
        height: 126px;
        overflow: hidden;
        border-radius: 4px;
      }

      .title-box {
        color: #222222;
        font-size: 14px;
        font-weight: bold;
        line-height: 24px;
      }

      .update-box {
        font-size: 12px;
        color: #999999;
        line-height: 24px;
      }

      .price-box {
        color: #C99743;
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
</style>
