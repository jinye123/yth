<template>
  <div class="page-box">
    <div class="kcap-container">
      <img v-if="refer==='camp'" src="./img/camp.jpg" alt="">
      <img v-if="refer==='public'" src="./img/public.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      refer:''
    }
  },
  created() {
    const {refer} = this.$route.query;
    this.refer=refer
  }
}
</script>

<style scoped lang="scss">
.kcap-container{
  width: 100%;
  height: 100vh;
  img{
    width: 100%;
  }
}
</style>
