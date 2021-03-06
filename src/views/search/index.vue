<template>
  <div class="page-box">
    <form action="/">
      <van-search
        v-model="value"
        shape="round"
        clearable
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="search-container">
      <div class="search-box">
        <div class="header-box">大家都在搜...</div>
        <div class="body-box">
          <div class="item-box" v-for="item  in [0,1,2,3,4]">
            公开研讨会
          </div>
        </div>
      </div>
      <div class="search-box">
        <div class="header-box">
          我的搜索记录
          <van-icon name="delete-o" size="15px" color="#6C6D6E"/>
        </div>
        <div class="body-box">
          <div class="item-box" v-for="item  in [0,1,2,3,4]">
            公开研讨会
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'

export default {
  name: "index",
  data() {
    return {
      value:''
    }
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
  }
}
</script>

<style scoped lang="scss">
.page-box {
  background: #ffffff;

  .search-container {
    padding:20px 15px;

    .search-box {
      .header-box {
        width: 100%;
        height: 12px;
        font-size: 14px;
        font-weight: 400;
        color: #6C6D6E;
        line-height: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .body-box {
        display: flex;
        flex-wrap: wrap;
        padding: 15px 0;

        .item-box {
          margin-right: 15px;
          margin-bottom: 12px;
          font-size: 12px;
          font-weight: 400;
          color: #333333;
          box-sizing: border-box;
          padding: 8px 15px;
          background: #F2F3F4;
          border-radius: 15px;
        }
      }
    }
  }
}

</style>
