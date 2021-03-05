<template>
  <div class="page-box">
    <div class="live-tv-container">
      <van-tabs
        v-model="activeId"
        color="#EDB46F"
        line-height="2px"
        line-width="22px"
        sticky
        swipeable
      >
        <van-tab :name="1" title="直播列表">
          <div class="live-list">
            <div  class="live-item" v-for="item in list0">
              <div class="left-box">
                <div class="time-box">
                  {{formatDay(item['startTime'])}}<br/>
                  {{formatWeek(item['startTime'])}}<br/>
                  {{formatTime(item['startTime'])}}
                </div>
                <div class="line"></div>
              </div>
              <div class="right-box">
                <div class="img-box">
                  <van-image
                    radius="5px"
                    width="100%"
                    height="100%"
                    fit="cover"
                    :src="item['imageUrl']"
                  />
                  <div class="tag-box">
                    {{setStateHandle(item['startTime'],item['endTime'])}}
                  </div>
                </div>
                <div class="title-box">
                  {{item['name']}}
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab :name="2" title="往期直播">
          <div class="live-list">
            <div class="live-item" v-for="item in list1">
              <div class="right-box right-box2">
                <div class="img-box2">
                  <van-image
                    radius="5px"
                    width="100%"
                    height="100%"
                    fit="cover"
                    :src="item['imageUrl']"
                  />
                </div>
                <div class="title-box">
                  {{item['name']}}
                </div>
                <div class="btn-box">
                  <div class="time-box">
                    <van-icon size="18" name="clock-o"/>
                    {{formatDay(item['startTime'])}} {{formatWeek(item['startTime'])}} {{formatTime(item['startTime'])}}
                  </div>
                  <van-button
                    style="width: 84px;height: 32px"
                    round
                    size="small"
                    color="linear-gradient(to right, #F7C239, #F6A533)">
                    查看回放
                  </van-button>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: "index",
  data() {
    return {
      activeId: 1,
      list0: [
        {
          "id": 1,
          "name": "沟通如此简单高效",
          "imageUrl": "https://s.ssjygw.com/zx/20210102/1.jpg",
          "pers": 1,
          "duration": 1,
          "startTime": "2021-01-02 13:25:42",
          "year": 2021,
          "month": 0,
          "day": 2,
          "time": "13:25:42",
          "week": 7,
          "endTime": "2021-01-02 13:25:42",
          "liveUrl": "https://appn0nnu6qq9267.h5.xiaoeknow.com/v1/course/alive/l_5febd6d8e4b04db7c097e479?type=2"
        }, {
          "id": 2,
          "name": "科创时代之资本利润",
          "imageUrl": "https://s.ssjygw.com/zx/20210102/2.jpg",
          "pers": 2,
          "duration": 1,
          "startTime": "2021-01-02 13:29:48",
          "year": 2021,
          "month": 0,
          "day": 2,
          "time": "13:29:48",
          "week": 7,
          "endTime": "2021-01-02 13:29:48",
          "liveUrl": "https://appn0nnu6qq9267.h5.xiaoeknow.com/v1/course/alive/l_5fe06b35e4b0231ba88e0c5b?type=2"
        }, {
          "id": 3,
          "name": "刘子敏基金定投直播间",
          "imageUrl": "https://s.ssjygw.com/zx/20210102/3.jpg",
          "pers": 3,
          "duration": 2,
          "startTime": "2021-01-02 13:30:50",
          "year": 2021,
          "month": 0,
          "day": 2,
          "time": "13:30:50",
          "week": 7,
          "endTime": "2021-01-02 13:30:50",
          "liveUrl": "https://appn0nnu6qq9267.h5.xiaoeknow.com/v1/course/alive/l_5fdf15a6e4b0231ba88dd2cc?type=2"
        }, {
          "id": 8,
          "name": "快速搞懂商业模式",
          "imageUrl": "https://s.ssjygw.com/zx/20210104/yihonglaoshi.jpeg",
          "pers": 3,
          "duration": 1,
          "startTime": "2021-01-20 18:00:00",
          "year": 2021,
          "month": 0,
          "day": 20,
          "time": "18:00:00",
          "week": 4,
          "endTime": "2021-01-20 19:00:00",
          "liveUrl": ""
        }, {
          "id": 9,
          "name": "刘子敏：财富桌垫详解",
          "imageUrl": "https://s.ssjygw.com/zx/20210104/4.jpg",
          "pers": 2,
          "duration": 1,
          "startTime": "2021-01-20 20:30:00",
          "year": 2021,
          "month": 0,
          "day": 20,
          "time": "20:30:00",
          "week": 4,
          "endTime": "2021-01-20 21:30:00",
          "liveUrl": ""
        }, {
          "id": 7,
          "name": "人人必学的金融思维课",
          "imageUrl": "https://s.ssjygw.com/zx/20210104/zhaodonghuizhibo.jpeg",
          "pers": 2,
          "duration": 2,
          "startTime": "2021-01-30 12:00:00",
          "year": 2021,
          "month": 0,
          "day": 30,
          "time": "12:00:00",
          "week": 7,
          "endTime": "2021-01-30 14:00:00",
          "liveUrl": ""
        }
      ],
      list1: [
        {
          "id": 1,
          "name": "沟通如此简单高效",
          "imageUrl": "https://s.ssjygw.com/zx/20210102/1.jpg",
          "pers": 1,
          "duration": 1,
          "startTime": "2021-01-02 13:25:42",
          "year": 2021,
          "month": 0,
          "day": 2,
          "time": "13:25:42",
          "week": 7,
          "endTime": "2021-01-02 13:25:42",
          "liveUrl": "https://appn0nnu6qq9267.h5.xiaoeknow.com/v1/course/alive/l_5febd6d8e4b04db7c097e479?type=2"
        }, {
          "id": 2,
          "name": "科创时代之资本利润",
          "imageUrl": "https://s.ssjygw.com/zx/20210102/2.jpg",
          "pers": 2,
          "duration": 1,
          "startTime": "2021-01-02 13:29:48",
          "year": 2021,
          "month": 0,
          "day": 2,
          "time": "13:29:48",
          "week": 7,
          "endTime": "2021-01-02 13:29:48",
          "liveUrl": "https://appn0nnu6qq9267.h5.xiaoeknow.com/v1/course/alive/l_5fe06b35e4b0231ba88e0c5b?type=2"
        }, {
          "id": 3,
          "name": "刘子敏基金定投直播间",
          "imageUrl": "https://s.ssjygw.com/zx/20210102/3.jpg",
          "pers": 3,
          "duration": 2,
          "startTime": "2021-01-02 13:30:50",
          "year": 2021,
          "month": 0,
          "day": 2,
          "time": "13:30:50",
          "week": 7,
          "endTime": "2021-01-02 13:30:50",
          "liveUrl": "https://appn0nnu6qq9267.h5.xiaoeknow.com/v1/course/alive/l_5fdf15a6e4b0231ba88dd2cc?type=2"
        }, {
          "id": 8,
          "name": "快速搞懂商业模式",
          "imageUrl": "https://s.ssjygw.com/zx/20210104/yihonglaoshi.jpeg",
          "pers": 3,
          "duration": 1,
          "startTime": "2021-01-20 18:00:00",
          "year": 2021,
          "month": 0,
          "day": 20,
          "time": "18:00:00",
          "week": 4,
          "endTime": "2021-01-20 19:00:00",
          "liveUrl": ""
        }, {
          "id": 9,
          "name": "刘子敏：财富桌垫详解",
          "imageUrl": "https://s.ssjygw.com/zx/20210104/4.jpg",
          "pers": 2,
          "duration": 1,
          "startTime": "2021-01-20 20:30:00",
          "year": 2021,
          "month": 0,
          "day": 20,
          "time": "20:30:00",
          "week": 4,
          "endTime": "2021-01-20 21:30:00",
          "liveUrl": ""
        }, {
          "id": 7,
          "name": "人人必学的金融思维课",
          "imageUrl": "https://s.ssjygw.com/zx/20210104/zhaodonghuizhibo.jpeg",
          "pers": 2,
          "duration": 2,
          "startTime": "2021-01-30 12:00:00",
          "year": 2021,
          "month": 0,
          "day": 30,
          "time": "12:00:00",
          "week": 7,
          "endTime": "2021-01-30 14:00:00",
          "liveUrl": ""
        }
      ],
      weeks:["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    formatDay(time){
      return dayjs(time).format(`MM月DD日`)
    },
    formatWeek(time){
      return this.weeks[dayjs(time).day()]
    },
    formatTime(time){
      return dayjs(time).format(`HH:mm`)
    },
    setStateHandle (startTime,endTime) {
      if(dayjs(startTime) - dayjs() > 0){
        return '未开始'
      }else if(dayjs(endTime) - dayjs() < 0){
        return '已结束'
      }else {
        return '直播中'
      }
    },
  }
}
</script>

<style scoped lang="scss">
.live-tv-container {
  width: 100%;
  height: 100vh;

  .live-list {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px;

    .live-item {
      width: 100%;
      display: flex;
      margin-bottom: 20px;

      .left-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .time-box {
          font-size: 12px;
          font-weight: 500;
          color: #666666;
          line-height: 21px;
          text-align: center;
        }

        .line {
          flex: 1;
          width: 1px;
          background: #E1E2E3;
        }
      }

      .right-box {
        width: 280px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0px 1px 6px 0px #F3F3F4;
        border-radius: 10px;
        padding: 10px;

        .img-box {
          width: 260px;
          height: 116px;
          position: relative;

          .tag-box {
            position: absolute;
            font-size: 10px;
            color: #FFFFFF;
            width: 46px;
            height: 18px;
            background: rgba(0, 0, 0, .34);
            border-radius: 2px;
            box-sizing: border-box;
            left: 5px;
            top: 5px;
            text-align: center;
            line-height: 18px;
          }
        }

        .img-box2 {
          width: 323px;
          height: 144px;
          border-radius: 5px;
        }

        .title-box {
          font-size: 14px;
          font-weight: bold;
          color: #252A31;
          line-height: 24px;
          padding: 10px 0;
        }

        .btn-box {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .time-box {
            display: flex;
            align-items: center;
            font-size: 12px;
            font-weight: 400;
            color: #9E9EA0;
            line-height: 12px;
          }
        }
      }

      .right-box2 {
        width: 100%;
      }
    }

  }
}

</style>
