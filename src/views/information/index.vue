<template>
  <div class="page-box container-box">
    <van-list
      :immediate-check="false"
      v-model="loading0"
      :finished="finished0"
      finished-text="没有更多了"
      @load="onLoad0"
      v-if="articleList.length"
    >
    <div class="information-list">
      <div @click="goDetailHandle(item.id)" class="information-item" v-for="item in articleList">
        <div class="left-box">
          <div>
            <div class="title-box">{{item.title}}</div>
            <div class="subtitle-box">{{item.subTitle}}</div>
          </div>
          <div class="bottom-box">
            <div class="tag-box">
              <van-tag round color="#FDECED" text-color="#F85A5B">{{item.category}}</van-tag>
            </div>
            <div class="num-box">{{item.count}}人已看</div>
          </div>
        </div>
        <div class="right-box">
          <van-image
            radius="4px"
            width="120px"
            height="90px"
            fit="contain"
            :src="item.purl"
          />
        </div>
      </div>
    </div>
    </van-list>
    <van-empty style="height: calc(100vh - 50px)" v-else description="暂无资讯" />
  </div>
</template>

<script>
  import {getArticleList} from '../../api'
  export default {
    name: "index",
    data(){
      return{
        articleList:[],
        loading0:false,
        finished0:false,
        pageIndex0:0,
      }
    },
    created() {
      this._getArticleList()
    },
    methods:{
      goDetailHandle(id){
        this.$router.push({path:'/information/detail',query:{id:id}})
      },
      onLoad0(){
        this.pageIndex0=this.pageIndex0+1
        this._getCoursesInf()
      },
      _getArticleList(){
        getArticleList({
          page:this.pageIndex0,
        }).then(res=>{
          const {content} = res;
          this.articleList=content;
          if(content.length<15){
            this.finished0=true;
          }
          this.loading0 = false;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .information-list{
    width: 100%;
    min-height: calc(100vh - 50px);
    overflow: auto;
    padding: 0 15px;
    box-sizing: border-box;
    background: #ffffff;
    .information-item{
      width: 100%;
      height: 125px;
      padding: 15px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #EFEFEF;
      background: #ffffff;
      display: flex;
      .left-box{
        flex: 1;
        padding-right: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title-box{
          font-weight: 500;
          color: #222222;
          line-height: 22px;
          font-size: 16px;
        }
        .subtitle-box{
          margin-top: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #666666;
          line-height: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 207px;
          white-space: nowrap;
        }

        .bottom-box{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .num-box{
            font-size: 11px;
            font-weight: 400;
            color: #A5A5A5;
            line-height: 12px;
          }
        }
      }
    }
  }
</style>
