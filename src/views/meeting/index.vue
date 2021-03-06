<template>
  <div class="page-box">
    <div class="offline-container">
      <div class="banner-box">
        <van-image
          radius="8px"
          width="100%"
          height="223"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
      </div>
      <div class="title-box">
        <div class="title">
          天津 - 商业报国之《科创时代》公开研讨会
        </div>
        <div class="price">
          免费
        </div>
        <div class="time">
          <van-icon style="margin-right: 5px" name="clock-o"/>
          2020/06/06 09:30 - 2020/06/09 12:00
        </div>
        <div class="address">
          <van-icon style="margin-right: 4px;" name="location-o"/>
          北京市顺义区顺安路6号-乔波国际会议中心
        </div>
      </div>
      <div class="line-box"></div>
      <div class="meet-members-box">
        <div class="meeting-title">
          进群大家一起聊聊 <img style src="./img/jin.png" alt="">
        </div>
        <div class="avatar-container">
          <div class="avatar-box" v-for="item in avatars">
            <img :src="item" alt="">
          </div>
          <div>
            <span style="color: #F24841">29</span>人已报名，限额999人
          </div>
          <div class="join-btn">
            免费进群学习
          </div>
        </div>

      </div>
      <div class="tutors-box">
        <div class="title-box">
          <img src="./img/icon.png" alt="">主讲导师<img src="./img/icon.png" alt="">
        </div>
        <div class="person-box" v-for="item in dataInfo['tutors']">
          <div class="person-avatar-box">
            <van-image
              round
              width="118px"
              height="118px"
              :src="item['header']"/>
            <div class="name-box">{{ item['name'] }}</div>
          </div>
          <div class="text-box">
            <div v-html="item['identityInfo']"></div>
          </div>
        </div>
      </div>
      <div class="detail-box">
        <div class="title-box">
          <img src="./img/icon.png" alt="">课程详情<img src="./img/icon.png" alt="">
        </div>
        <div class="text-box" v-for="item in dataInfo['details']" v-html="item['context']"/>
      </div>
      <div class="map-box">
        <div class="title-box">
          <img src="./img/icon.png" alt="">地图导航<img src="./img/icon.png" alt="">
        </div>
        <baidu-map
          :center="center"
          :zoom="zoom"
          class="bm-view"
          @ready="handler"
          ak="4UmDHfHX8CN7rw7AG5Sm1F9RuxFcyv4l">
          <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
            <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">{{ dataInfo['address'] }}
            </bm-info-window>
          </bm-marker>
        </baidu-map>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页"/>
      <van-goods-action-icon icon="share-o" text="邀请"/>
      <van-goods-action-button
        type="danger"
        color="#F5CD39"
      >
        <span style="font-size: 16px;color: #130F00">立即报名</span>
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import {
  BaiduMap,
  BmMarker,
  BmInfoWindow
} from 'vue-baidu-map'

export default {
  name: "detail",
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow
  },
  data() {
    return {
      dataInfo: {
        details: [
          {
            context: "<img src='https://img.bshapp.com/lm-zDfP4aCAuNytnhUWnAxvMxz-f'>",
            name: "会议详情",
          }
        ],
        tutors: [
          {
            cardNo: "412822198110052677",
            header: "https://img.bshapp.com/FrgS7pofVKIcc7GXTy3SYiEU2CAC",
            id: 97,
            identityInfo: "<p>圣商教育运营商&nbsp;</p><p>圣商教育卓越精华研讨会导师&nbsp;</p><p>全国运营商服务委员会执委 &nbsp;</p><p>曾担任华东大区首任总经理&nbsp;</p><p>圣创IC投资家俱乐部学员</p>",
            name: "张冬",
            telephone: "13738094036",
          },
          {
            cardNo: "371328198807295035",
            header: "https://img.bshapp.com/FgUIUmweN8JBZbANeiTQcQZ0QXT0",
            id: 98,
            identityInfo: "<p>圣商教育运营商&nbsp;</p><p>圣商卓越精华研讨会导师&nbsp;</p><p>2016年年会获得“大爱导师”称号</p>",
            name: "杨民",
            telephone: "15266239319",
          }
        ]
      },
      avatars: [
        "https://img01.yzcdn.cn/vant/cat.jpeg",
        "https://img01.yzcdn.cn/vant/cat.jpeg",
        "https://img01.yzcdn.cn/vant/cat.jpeg",
        "https://img01.yzcdn.cn/vant/cat.jpeg",
        "https://img01.yzcdn.cn/vant/cat.jpeg",
      ],
      show: false,
      center: {
        lng: 0,
        lat: 0
      },
      zoom: 3,
      markerPoint: {
        lng: 0,
        lat: 0
      },
    }
  },
  computed: {},
  created() {

  },
  methods: {
    infoWindowClose() {
      this.show = false
    },
    infoWindowOpen() {
      this.show = true
    },
    handler({BMap, map}) {
      console.log(BMap, map)
    }
  }
}
</script>

<style scoped lang="scss">
.offline-container {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 60px;

  .banner-box {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background: #ffffff;
  }

  .title-box {
    padding: 0 15px 20px;
    background: #ffffff;

    .title {
      width: 80%;
      font-size: 20px;
      font-weight: bold;
      color: #222222;
      line-height: 26px;
    }

    .price {
      font-size: 21px;
      font-weight: 500;
      color: #EA8833;
      line-height: 11px;
      padding: 20px 0;
    }

    .time, .address {
      font-size: 13px;
      font-weight: 500;
      color: #636465;
      display: flex;
      align-items: center;
      line-height: 25px;
    }
  }

  .line-box {
    width: 100%;
    height: 5px;
    background: #F3F5F6;
  }

  .meet-members-box {
    width: 100%;
    box-sizing: border-box;
    padding: 18px;

    .meeting-title {
      font-size: 12px;
      color: #130F00;
      font-weight: 500;
      padding-bottom: 15px;

      img {
        width: 10px;
        height: 10px;
      }
    }

    .avatar-container {
      height: 100%;
      display: flex;
      padding-left: 15px;
      align-items: center;
      justify-content: space-between;

      .avatar-box {
        width: 33px;
        height: 33px;
        border-radius: 50%;
        border: 1px solid #ffffff;
        margin-left: -20px;

        img {
          width: 33px;
          height: 33px;
          border-radius: 50%
        }
      }

      .join-btn {
        width: 92px;
        height: 29px;
        background: #F5CD39;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 500;
        color: #130F00;
        line-height: 29px;
        text-align: center;
      }
    }
  }

  .tutors-box {
    background: #F5F9FC;
    width: 100%;
    box-sizing: border-box;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title-box {
      background: transparent;
      font-size: 20px;
      font-weight: bold;
      color: #222222;
      line-height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin: 0 20px;
        width: 18px;
      }
    }

    .person-box {
      width: 345px;
      box-sizing: border-box;
      padding: 100px 15px 30px;
      background: #FFFFFF;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      margin-top: 80px;
      position: relative;

      .person-avatar-box {
        width: 118px;
        height: 118px;
        border: 4px solid #F7D0A2;
        border-radius: 50%;
        position: absolute;
        top: -60px;
        left: 50%;
        margin-left: -60px;
        display: flex;
        justify-content: center;

        .name-box {
          padding: 0 20px;
          height: 28px;
          background: linear-gradient(360deg, #DFB984 0%, #F7D7A2 100%);
          border-radius: 14px;
          font-size: 15px;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 28px;
          text-align: center;
          position: absolute;
          bottom: -14px;
        }
      }

      .text-box {
        width: 100%;
        box-sizing: border-box;
        font-size: 13px;
        color: rgba(102, 102, 102, 1);
        line-height: 24px;
        text-align: center;
      }

      .text-box::v-deep img {
        width: 100%;
      }
    }
  }

  .detail-box, .map-box {
    width: 100%;
    box-sizing: border-box;
    padding: 30px 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title-box {
      background: transparent;
      padding-bottom: 30px;
      font-size: 20px;
      font-weight: bold;
      color: #222222;
      line-height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin: 0 20px;
        width: 18px;
      }
    }

    .text-box {
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;
    }

    .text-box::v-deep img {
      width: 100%;
    }

    .bm-view {
      width: 100%;
      height: 300px;
    }
  }

}

.bottom-btn-box {
  width: 100%;
  height: 56px;
  padding: 0 12px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

</style>
