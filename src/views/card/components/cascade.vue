<template>
  <div class="body-box">
    <div class="left-box">
      <van-sidebar style="width: 90px" v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="(item,index) in cardList" :title="item.name" :key="index"/>
      </van-sidebar>
    </div>
    <div class="right-box">
      <div class="information-list">
        <couserList :id="currentId" />
      </div>
    </div>
  </div>
</template>

<script>
  import {getCardList} from '../../../api'
  import CardList from '../../../components/CardList'
  import couserList from "./couserList";

  export default {
    name: "Card",
    components: {
      CardList,
      couserList
    },
    props: {
      type: {
        type: Number,
        default: () => 0
      }
    },
    data() {
      return {
        cardList: [],
        activeKey: 0,
        currentId:'',
      }
    },
    mounted() {
      this._getYearCardList(this.type)
    },
    methods: {
      onChange(index) {
        const {id} = this.cardList[index]
        this.currentId=id;
      },
      _getYearCardList(type) {
        getCardList(type).then(res => {
          this.cardList = res;
          this.currentId=this.cardList[0].id;
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
