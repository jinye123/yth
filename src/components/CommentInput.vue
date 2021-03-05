<template>
  <div class="comment-input-box">
    <van-field
      @click.stop
      v-model="value"
      ref="commentInput"
      class="comment-input"
      placeholder="评论" />
    <van-button @click.stop="sendHandle" style="width: 80px" round color="#E02E24" size="small">发 布</van-button>
  </div>
</template>

<script>
  export default {
    name: "CommentInput",
    data(){
      return{
        value:''
      }
    },
    methods:{
      focusHandle(){
        this.$refs.commentInput.focus()
        setTimeout(()=>{
          document.body.scrollTop = document.body.scrollHeight;
        },300);
      },
      sendHandle(){
        if(this.value.trim()){
          this.$emit('sendHandle',encodeURIComponent(this.value));
          this.value="";
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .comment-input-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 54px;
    padding: 10px;
    box-sizing: border-box;
    background: #ffffff;
    .comment-input{
      margin-right: 10px;
      /*border: 1px solid #F3F3F3;*/
      /*border-radius: 15px;*/
      /*height: 30px;*/
      /*padding: 2px 2px;*/
    }
  }
</style>
