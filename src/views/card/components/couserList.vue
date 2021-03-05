<template>
  <div>
    <div
      @click="goDetailHandle(item.id)"
      class="information-item"
      v-for="item in courseList"
      :key="item.id"
    >
      <div class="left-box">
        <van-image
          radius="4px"
          width="100px"
          height="78px"
          fit="cover"
          :src="item.purl"
        />
      </div>
      <div class="right-box">
        <div>
          <div class="van-multi-ellipsis--l2 title-box">{{item.title}}</div>
          <div class="subtitle-box">{{item.subTitle}}</div>
        </div>
        <div class="bottom-box">
          <div class="num-box">{{item.count}}人一起学习</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getMoreCoursesListByCategoryId} from "@/api";

export default {
  name: "couserList",
  props:['id'],
  data(){
    return{
      courseList: [],
    }
  },
  mounted() {
    this._getMoreCoursesListByCategoryId(this.id)
  },
  watch:{
    id(newValue){
      this.courseList=[];
      this._getMoreCoursesListByCategoryId(newValue)
    }
  },
  methods:{
    goDetailHandle(id) {
      this.$router.push({path: `/detail?id=${id}`})
    },
    _getMoreCoursesListByCategoryId(id) {
      getMoreCoursesListByCategoryId({categoryId:id}).then(res => {
        this.courseList = res;
      })
    }
  }
}
</script>

<style scoped lang="scss">
.body-box {
  width: 100%;
  height: calc(100vh - 95px);
  display: flex;
  background: #ffffff;

  .left-box {
    border-right: 1px solid #F6F7F8;
  }

  .information-list {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0 15px;
    box-sizing: border-box;
    background: #ffffff;

    .information-item {
      width: 100%;
      height: 110px;
      padding: 15px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #EFEFEF;
      background: #ffffff;
      display: flex;

      .right-box {
        flex: 1;
        padding-right: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 10px;

        .title-box {
          font-weight: 500;
          color: #222222;
          line-height: 16px;
          font-size: 14px;
        }

        .subtitle-box {
          margin-top: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #666666;
          line-height: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 130px;
          white-space: nowrap;
        }

        .bottom-box {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .num-box {
            font-size: 11px;
            font-weight: 400;
            color: #A5A5A5;
            line-height: 12px;
          }
        }
      }
    }
  }
}

.van-sidebar-item {
  background-color: #ffffff;
  border-bottom: 1px solid #F6F7F8;
}

.van-sidebar-item--select::before {
  width: 4px;
  height: 30px;
}
</style>
