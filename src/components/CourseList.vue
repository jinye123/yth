<template>
  <div class="content-container">
    <div class="content-box" ref="contentWrap">
      <div class="content" ref="content">
        <div @click="handleClick(item,index)" class="classes-item-box" v-for="(item,index) in coursesSteps">
          <van-tag style="margin:2px 5px 0 0;height:12px;font-size: 10px;" v-if="courses['userState']<=0&&item['tryFlag']" color="#FFEAEA" text-color="#D64848">试听</van-tag>
          <van-tag style="margin:2px 5px 0 0;height:12px;font-size: 10px;" v-else plain >{{item['type']?'音频':'视频'}}</van-tag>
          <p :class="{currentStep:index===currentPlayIndex}" >{{item.title}}</p>
          <div class="time-box">{{item.duration}}分钟</div>
          <LastWatch v-if="item['lastWatch']===1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LastWatch from "./LastWatch";
  export default {
    name: 'CourseList',
    props:['coursesSteps','courses','currentPlayIndex'],
    data() {
      return {

      }
    },
    components:{
      LastWatch
    },
    methods:{
      handleClick(item,index){
        this.$emit('setCurrentPlayHandle',item,index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-container {
    background: #ffffff;
    .content-box {
      .content {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        .classes-item-box{
          width: 100%;
          background: #ffffff;
          min-height: 54px;
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          box-sizing: border-box;
          font-size: 14px;
          border-bottom: 1px solid #F8F8F8;
          position: relative;
          p{
            vertical-align: top;
            flex: 1;
            line-height: 20px;
            font-size: 14px;
          }
          .currentStep{
            color: #DCAA53;
          }
          .time-box{
            color: #666666;
            font-size: 11px;
            line-height: 20px;
            width: 45px;
            text-align: right;
          }
        }
      }
    }

    .more {
      height: 39px;
      line-height: 39px;
      text-align: center;
      font-size: 12px;
      color: rgba(213, 95, 95, 1);
    }
  }
</style>
