<template>
  <div class="page-box container-box">
    <van-tabs
      v-model="activeId"
      color="#EDB46F"
      line-height="2px"
      line-width="22px"
      sticky
      swipeable
      animated
    >
      <van-tab :name="1" title="公开课程">
        <Cascade :type="0" />
      </van-tab>
      <van-tab :name="2" title="精华课程">
        <Cascade :type="1" />
      </van-tab>
    </van-tabs>
  </div>

</template>

<script>
  import Cascade from "./components/cascade";
  export default {
    name: 'yearCard',
    components: {
      Cascade
    },
    data() {
      return {
        activeId:'',
      }
    },
    created() {
      const {id} = this.$route.query
      this.activeId = Number(id)
    },
    methods:{

    }
  }
</script>
