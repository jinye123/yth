<template>
  <div class="page-box">
    <div class="day-detail-container">
      <div class="banner-box">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="coursesVo.purl"
        />
      </div>
      <div class="title-box">
        <van-cell center>
          <p>{{coursesVo.subTitle}}</p>
        </van-cell>
      </div>
      <div class="tab-box">
        <van-cell>
          <template #title>
            <span class="custom-title">课程详情</span>
            <div class="line-tip-box"></div>
          </template>
        </van-cell>
      </div>
      <div class="container-box" v-html="coursesVo.describe"></div>
    </div>
  </div>
</template>

<script>
  import {getCoursesInfo} from '../../api'
  export default {
    name: "detail",
    data(){
      return{
        coursesVo:{}
      }
    },
    created() {
      this._getCoursesInfo()
    },
    methods:{
      _getCoursesInfo(){
        const {id}=this.$route.query
        getCoursesInfo(id).then(res=>{
          this.coursesVo=res;
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .day-detail-container {
    width: 100%;
    .banner-box{
      width: 100%;
      height: 280px;
      box-sizing: border-box;
    }
    .title-box{
      width: 100%;
      p{
        color: #222222;
        font-size:16px;
        font-weight:bold;
      }
    }
    .tab-box{
      .line-tip-box{
        background: #C99743;
      }
    }
    .container-box{
      box-sizing: border-box;
      width: 100%;
      background: #ffffff;
      padding: 10px;
      color: #666666;
      font-size: 14px;
      line-height:24px;
    }
    .container-box::v-deep p{
      width: 100%;
      color: #666666;
      font-size: 14px;
      line-height:24px;
    }
  }
</style>
