<template>
  <div class="content-container">
    <div class="content-box" >
      <div v-if="courses" class="content" ref="content" v-html="courses.describe"></div>
      <div v-else class="content" ref="content" v-html="currentStep&&currentStep.describe"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContentDetail',
    props:['courses','currentStep'],
  }
</script>

<style lang="scss" scoped>
  .content-container {
    padding: 10px 10px 0;
    background: #ffffff;
    .content-box {

      .content {
        width: 100%;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 24px;
      }
      .content::v-deep img{
        width: 100%;
      }
    }

    .scroll-box{
      height: auto;
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
