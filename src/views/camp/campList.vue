<template>
  <div class="page-box">
    <div class="camp-container">
      <div v-for="(item,index) in campList" class="course-list" >
        <van-cell>
          <template #title>
            <span class="custom-title">{{item['title']}}</span>
          </template>
        </van-cell>
        <div class="training-camp-box">
          <img @click="goTrainCampHandle(item,index)" :src="item['purl']" alt="">
        </div>
      </div>
    </div>
    <GoHome2 />
  </div>
</template>

<script>
  import {getCampList} from '../../api'
  import GoHome2 from "../../components/GoHome2";

  export default {
    name: "campList",
    components:{
      GoHome2
    },
    data() {
      return {
        campList: []
      }
    },
    created() {
      this._getCampList()
    },
    methods: {
      goTrainCampHandle(item,index) {
        if(index===0&&item['isBuy']){
          this.$router.push({
            path: `/camp/qrCode`,
            query: {id: item.id}
          })
        }else {
          this.$router.push({
            path: `/camp`,
            query: {id: item.id,index}
          })
        }
      },
      _getCampList() {
        getCampList().then(res => {
          this.campList = res
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .camp-container{
    width: 100%;
    height: 100vh;
    background: #ffffff;
  }
  .course-list {
    margin: 8px 0;

    .van-cell__title {
      font-size: 18px;
      color: #333333;
      font-weight: bold !important;
    }

    .van-cell__value {
      font-size: 12px;
      font-weight: 500;
      color: #999999;
    }

    .van-card__title {
      line-height: 20px;
      max-height: 40px;
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
        width: 168px;
      }

      .update-box {
        font-size: 12px;
        color: #999999;
        line-height: 24px;
        height: 24px;
        width: 168px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .price-box {
        color: #C99743;
        font-size: 14px;
        line-height: 24px;
      }
    }

    .count-down-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .van-count-down {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .colon {
        display: inline-block;
        margin: 0 5px;
        color: #62616E;
        height: 24px;
        line-height: 24px;
      }

      .block {
        display: inline-block;
        line-height: 24px;
        min-width: 24px;
        height: 24px;
        color: #E7D7B1;
        font-size: 16px;
        text-align: center;
        border-radius: 4px;
        font-weight: normal;
        background: linear-gradient(to bottom, #62616E, #323438);
        box-sizing: border-box;
        padding: 0 2px;
      }
    }

    .training-camp-box {
      width: 100%;
      height: 132px;
      box-sizing: border-box;
      padding: 0 15px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }

</style>
