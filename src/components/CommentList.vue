<template>
  <div class="comment-list">
    <div class="comment-item" v-for="item in commentList">
      <div class="avatar-box">
        <van-image
          round
          width="32px"
          height="32px"
          :src="item.headimgurl"
        />
      </div>
      <div class="comment-box">
        <h3>{{item['nickName']}}</h3>
        <p>{{codeEmoji(item.content)}}</p>
        <div class="reply-box" v-if="item.child">
          <span>{{item.child[0]['manageName']}}：</span>
          {{item.child[0].content}}
        </div>
        <div class="bottom-box">
          <div class="time-box">{{item['createTime']}}</div>
        </div>
      </div>
    </div>
    <van-empty v-if="!commentList.length" description="快来发表评论吧！" />
  </div>
</template>

<script>
  export default {
    name: "CommentList",
    props:['commentList'],
    methods:{
      codeEmoji(text){
        return decodeURIComponent(text)
      }
    }
  }
</script>

<style scoped lang="scss">
  .comment-list {
    background: #ffffff;
    padding: 15px;
    .comment-item{
      display: flex;
      .avatar-box{
        width: 32px;
        height: 32px;
      }
      .comment-box{
        padding-top: 8px;
        margin-left: 15px;
        box-sizing: border-box;
        flex: 1;
        h3{
          color: #333333;
          font-size: 14px;
          font-weight: bold;
        }
        p{
          padding-top: 8px;
          color: #666666;
          font-size: 13px;
          line-height: 24px;
        }
        .reply-box{
          font-size: 12px;
          padding-top: 10px;
          line-height: 20px;
          span{
            color: #B68934;
          }
        }
        .bottom-box{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0 10px;
          border-bottom: 1px solid #F4F4F4;
          margin-bottom: 5px;
          .time-box{
            color: #999999;
            font-size: 12px;
          }
          .comment-panel{
            display: flex;
            align-items: center;
            .icon-box{
              margin: 0 9px;
              font-size: 12px;
              color: #333333;
              i{
                font-size: 15px;
                vertical-align: middle;
              }
            }

          }
        }
      }
    }
  }
</style>
