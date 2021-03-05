<template>
  <div class="play-list">
    <div @click="itemHandleClick(item.id)" class="item-box" v-for="(item,index) in recCourses">
      <LastWatch v-if="item['lastWatch']===1" />
      <div class="top-box" :class="currentPlayIndex===index?'active':''">
        {{item.title}}
      </div>
      <div class="bottom-box">
        <div class="count-box">{{item['createTime'].split(' ')[0]}} | {{item['count']}}人学习</div>
        <div @click.stop="playHandleClick(item.id)" class="icon-box">
          <van-icon
            v-if="currentPlayIndex===index"
            color="#EDA322"
            size="18"
            :name="isPlaying?'pause-circle-o':'play-circle-o'" />
          <van-icon v-else size="18" name="play-circle-o" />
          <img @click.stop="showHandle" style="margin-left: 20px;height: 15px;" src="../assets/img/more.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LastWatch from "./LastWatch";
  export default {
    name: "PlayList",
    props:['recCourses','currentPlayIndex','isPlaying'],
    components:{
      LastWatch
    },
    data(){
      return {
        dataList:[]
      }
    },
    methods:{
      playHandleClick(id){
        this.$emit('iconClick',id)
      },
      itemHandleClick(id){
        this.$emit('itemClick',id)
      },
      showHandle(){
        this.$emit('showShare')
      }
    }
  }
</script>

<style scoped lang="scss">
  .play-list{
    background: #ffffff;
    border-radius: 5px;
    .item-box{
      width: 100%;
      height: 76px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 15px;
      border-bottom: 1px solid #EDEDED;
      position: relative;
      .top-box{
        font-size: 15px;
        font-weight: 500;
        color: #333333;
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .active{
        color: #EDA322;
      }
      .bottom-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .count-box{
          color: #666666;
          font-size: 11px;
        }
        .icon-box{
          i{
            color: #818181;
          }
        }
      }
    }
    .item-box:last-child{
      border: none;
    }
  }
</style>
