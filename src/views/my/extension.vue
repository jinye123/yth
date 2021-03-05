<template>
  <div class="course-list">
    <van-list
      :immediate-check="false"
      v-model="loading0"
      :finished="finished0"
      finished-text="没有更多了"
      @load="onLoad0"
      v-if="listData.length"
    >
      <van-cell title="单元格" size="large" v-for="item in listData" >
        <template #title>
          <div class="left-box">
            <van-image
              round
              width="44px"
              height="44px"
              :src="item['headimgurl']"
            />
            <span>{{item['nickname']}}</span>
          </div>

        </template>
        <div class="right-box">
          成交时间{{item['createTime'].split(' ')[0]}}
        </div>
      </van-cell>
    </van-list>
    <van-empty style="height: 100vh" v-else description="暂无数据!"/>
    <GoHome />
  </div>
</template>

<script>
  import {getInviteList} from '../../api'
  import GoHome from '../../components/GoHome'
  export default {
    name: "extension",
    data(){
      return{
        listData:[],
        loading0: false,
        finished0: false,
        pageIndex0: 0,
      }
    },
    components:{
      GoHome
    },
    created() {
      this._getInviteList()
    },
    methods:{
      onLoad0() {
        this.pageIndex0 = this.pageIndex0 + 1
        this._getInviteList()
      },
      _getInviteList(){
        getInviteList({
          page:this.pageIndex0
        }).then(res=>{
          const {content, numberOfElements} = res
          this.listData = content
          if (numberOfElements < 15) {
            this.finished0 = true;
          }
          this.loading0 = false;
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .course-list {
    min-height: 100vh;
    .left-box{
      display: flex;
      align-items: center;
      span{
        margin-left: 10px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .right-box{
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>
