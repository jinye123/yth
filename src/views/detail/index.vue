<template>
  <div class="page-box container-box">
    <div class="base-info-box">
      <div class="cover-box">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="courses['purl']"
        />
        <div v-show="false" class="yaoqing-top-box">司壮叶 邀请您来一起学习</div>
      </div>
      <div class="discount-container" v-if="!courses['userState']&&courses['activityState']===1">
        <div class="discount-box">
          <div class="left-box">
            <p>圣商六周年五折</p>
            <div class="price-box">
<!--              ￥{{courses['disPrice']}}<span>原价¥{{courses.price}}</span>-->
            </div>
          </div>
          <div class="right-box">
            <p>距离结束还剩</p>
            <div class="count-down-container">
              <van-count-down  format="HH:mm:ss" :time="time">
                <template v-slot="timeData">
                  <span class="block" v-if="timeData.days">{{ 24*timeData.days+timeData.hours }}</span>
                  <span class="block" v-else>{{timeData.hours<=9?'0'+timeData.hours:timeData.hours  }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes<=9?'0'+ timeData.minutes:timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds<=9?'0'+timeData.seconds:timeData.seconds }}</span>
                </template>
              </van-count-down>
            </div>
          </div>
        </div>
      </div>
      <div class="course-list">
        <van-card
          :desc="courses['subTitle']"
          :title="courses.title"
        >
          <template slot="price">
            <div class="num-box">{{courses['count']}}人一起学习</div>
          </template>
          <template slot="num">
            <div @click="showFx = true" class="price-box">
              <span style="font-size: 12px;margin-right: 4px" class="icon icon-fenxiang"></span>
              分享
            </div>
          </template>
        </van-card>
      </div>
      <div class="share-box" @click="sharedHandleHb">
        <span style="size: 11px;color: #B68934;margin-top: 3px" class="icon icon-fenxiang1"></span>
        <span>分享海报</span>
      </div>
    </div>
    <div class="content-box">
      <van-tabs sticky swipeable animated>
        <van-tab title="内容详情">
          <content-detail :courses="courses" />
        </van-tab>
        <van-tab title="课程目录">
          <van-list
            :immediate-check="false"
            v-model="loading0"
            :finished="finished0"
            finished-text="没有更多了"
            @load="onLoad0"
          >
            <course-list
              @setCurrentPlayHandle="setCurrentPlayHandle"
              :courses="courses"
              :coursesSteps="coursesSteps" >
            </course-list>
          </van-list>
        </van-tab>
        <van-tab title="推荐课程">
          <card-list @click="goDetailHandle" :recCourses="recCourses"/>
        </van-tab>
      </van-tabs>
    </div>
    <div class="notice-container" v-if="hasGroupList.length&&courses['userState']===-1">
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in hasGroupList" :key="item.id">
          <div class="grouping-box">
            <div class="item-box">
              <van-image
                style="margin-right: 5px"
                fit="cover"
                round
                width="30px"
                height="30px"
                :src="item.head"
              />
              <span style="color: #FD3D36;margin-right: 5px">{{item['realname']}}</span>刚已拼成
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-goods-action v-if="courses['userState']>0">
<!--      <van-goods-action-icon style="width: 80px" icon="gift-o" text="送好友" @click="onGiveHandle" />-->
      <van-goods-action-icon to="/" >
        <span style="size: 12px;margin-bottom: 5px" class="icon icon-shouye1"></span>
        <div>首页</div>
      </van-goods-action-icon>
      <van-goods-action-icon @click="showZx = true" >
        <span style="size: 12px;margin-bottom: 5px" class="icon icon-zixun"></span>
        <div>客服</div>
      </van-goods-action-icon>
      <van-button style="height: 100%" @click="showFx = true" color="linear-gradient(to left, #DDA96D, #F3D0A0)" type="primary" block>
        <span style="color:#785327;font-size:15px;font-weight:bold;">邀请好友一起学习</span>
      </van-button>
    </van-goods-action>
    <van-goods-action v-else>
<!--      <van-goods-action-icon style="width: 80px" icon="gift-o" text="送好友" @click="showGiftPopup=true" />-->
      <template v-if="courses['isVip']">
        <template v-if="courses['status']===10">
          <van-button
            style="height: 100%"
            :to="`/card?id=${courses['isVip']}`"
            color="linear-gradient(to right, #FFE9CE, #FFCC89)"
            type="primary"
            block>
          <span style="color: #843800;font-size: 15px;font-weight: bold">
            {{userInfo['vipInfo']['public']['cardId'] === courses['isVip']?'开通公开年卡免费听':'开通精华年卡免费听'}}
          </span>
          </van-button>
        </template>
        <template v-else>
          <van-button
            style="height: 100%"
            @click="payHandle(0)"
            color="#ffffff"
            type="primary"
            block>
          <span style="color: #333333;font-size: 15px;font-weight: bold">
            <span style="color: #DBA74F;font-size: 18px">
             ¥{{courses.price}}
            </span>
            直接购买
          </span>
          </van-button>
          <van-button
            style="height: 100%"
            :to="`/card?id=${courses['isVip']}`"
            color="linear-gradient(to right, #FFE9CE, #FFCC89)"
            type="primary"
            block>
          <span style="color: #843800;font-size: 15px;font-weight: bold">
            {{userInfo['vipInfo']['public']['cardId'] === courses['isVip']?'开通公开年卡免费听':'开通精华年卡免费听'}}
          </span>
          </van-button>
        </template>
      </template>
      <template v-else>
        <van-goods-action-icon to="/" >
          <span style="size: 12px;margin-bottom: 5px" class="icon icon-shouye1"></span>
          <div>首页</div>
        </van-goods-action-icon>
        <van-goods-action-icon @click="showZx = true" >
          <span style="size: 12px;margin-bottom: 5px" class="icon icon-zixun"></span>
          <div>客服</div>
        </van-goods-action-icon>
        <div class="discount-btn-box"  v-if="courses['activityState']===2" style="width: 100%;height: 100%">
          <div class="single-content" @click="payHandle(0)">
            <p class="text-box">单课购买</p>
            <div class="price-box">￥{{courses['price']}}</div>
          </div>
          <div class="group-content" @click="payHandle(2)" >
            <img style="position: absolute;right: 0;top: 0;width: 36px" src="./img/xsq.png" alt="">
            <p class="text-box">{{activity['isNew']?'新人拼团':'拼团购买'}}</p>
            <div class="price-box">￥{{activity['isNew']?activity['newPrice']:activity['disPrice']}}</div>
          </div>
        </div>
        <div class="discount-btn-box"  v-else-if="courses['activityState']===1" @click="payHandle(1)"  style="width: 100%;height: 100%">
          <div class="discount-content" style="height: 100%;flex: 1">
            <p class="discount-box">原价 ¥{{courses.price}}</p>
            <div class="price-box">￥{{activity['disPrice']}}</div>
          </div>
          <van-button style="height: 100%;flex: 1" color="linear-gradient(to bottom, #FA451D, #FE6B18)" type="primary" block>立即购买</van-button>
        </div>
        <van-button
          v-else
          style="height: 100%"
          @click="payHandle(0)"
          color="linear-gradient(to right, #F9D2AE, #FF8B69)"
          type="primary"
          block>
          购买课程 ¥{{courses.price}}
        </van-button>
      </template>
    </van-goods-action>

    <Menus :courses="courses" />
    <van-overlay :show="showZx" @click="showZx = false">
      <div style="padding:0 60px;height: 100%;display: flex;align-items: center;justify-content: center">
        <img style="width: 100%" src="./img/pop_code_ask@2x.png" alt="">
      </div>
    </van-overlay>
    <van-overlay :show="showFx" @click="showFx = false">
      <div style="padding: 0 10px">
        <img style="width: 100%" src="./img/pop_share_tips.png" alt="">
      </div>
    </van-overlay>
    <van-overlay :show="showShare" @click="showShare = false">
      <div class="share-container">
        <div class="hb-container" @click.stop>
          <img :src="HbSrc" alt="">
        </div>
        <div class="text-box">
          长按图片选择"保存"或"发送给朋友
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="showForm" @click="showForm = false" >
      <div class="formContainer">
        <div class="formBox" @click.stop>
          <p>还差一步就可以听课啦～</p>
          <van-form label-width="60px" label-align="center" @submit="onSubmitPhone">
            <van-field
              v-model="userForm.phone"
              name="phone"
              label="手机号"
              placeholder="手机号"
            />
            <van-field
              v-model="userForm.code"
              type="text"
              name="code"
              label="验证码"
              placeholder="验证码"
            >
              <template #button>
                <span class="line-box"></span>
                <span v-if="showCountDown">
                  <van-count-down
                    ref="countDown"
                    millisecond
                    :time="codeTime"
                    :auto-start="false"
                    format="ss"
                    @finish="finishCountDown"
                  />
                </span>
                <span v-else class="code-box" @click="getCodeHandle">获取验证码</span>
              </template>
            </van-field>
            <div class="agreement-box">
              <van-checkbox
                icon-size="12px"
                checked-color="#E25C5A"
                v-model="checked">
               我已阅读并同意 <a :href="urlLink+'/privacy.html'">《圣商在线隐私政策》</a>与<a :href="urlLink+'/xy.html'">《圣商在线服务协议》</a>
              </van-checkbox>
            </div>
            <div style="margin-top: 20px;display: flex;justify-content: center">
              <van-button style="width: 134px;height: 36px" round block color="#E25C5A" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>
    <van-popup
      :safe-area-inset-bottom="true"
      v-model="showPopup"
      round
      position="bottom"
    >
      <div class="popup-container">
        <div class="top-box">
          <div class="title-box">请选择开团类型</div>
          <div class="bottom-line-box"></div>
        </div>
        <div class="bottom-box">
          <div @click="payHandle(2,1)" :class="isNew===0?'active-price-box':''" class="price-item">
            <div class="price-box">¥ <span>{{activity['disPrice']}}</span></div>
            <div class="text-box">不限新老用户拼团</div>
          </div>
          <div @click="payHandle(2,2)" :class="isNew===1?'active-price-box':''" class="price-item">
            <div class="price-box">¥ <span>{{activity['newPrice']}}</span></div>
            <div class="text-box">须邀请新人拼团</div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
      :safe-area-inset-bottom="true"
      v-model="showGiftPopup"
      round
      position="bottom"
    >
      <div class="popup-container">
        <div class="title-box">{{courses.title}}</div>
        <van-cell-group>
          <van-cell style="height: 50px" title="赠送数量" >
            <van-stepper v-model="giveNum" disable-input max="10" />
          </van-cell>
          <van-cell style="height: 50px" title="支付金额" >
            <div style="font-size: 14px;color: #333333;">¥{{payPrice}}</div>
          </van-cell>
          <van-cell>
            <van-button
              block
              color="#FF8B69"
              size="normal"
              @click="mzPayHandle"
            >
              确认支付
            </van-button>
          </van-cell>
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  import CardList from './../../components/CardList'
  import ContentDetail from '../../components/ContentDetail'
  import CourseList from './../../components/CourseList'
  import Menus from './../../components/Menus'
  import {
    getCoursesInf,       // 获取课程详情
    getRecommendList,    // 推荐课程

    getPayOrder,         // 创建支付订单
    getPayOrderMz,       // 创建买赠支付订单
    createGroupOrder,    // 创建拼团支付订单

    getShareCode,        // 获取海报
    addStatisticsShare,  // 添加分享统计
    getShareToken,       // 换新token

    getCode,             // 获取code
    submitPhone,         // 绑定手机号
  } from '../../api'
  import {mapActions, mapGetters} from "vuex";
  import dayjs from 'dayjs'
  import wxConfigApi from '../../utils/weixinApi';
  import {Toast} from 'vant'
  import {mobile} from '../../utils/validate'
  import {testPlatform} from '../../utils/platform'

  export default {
    name: 'index',
    components: {
      CardList,
      ContentDetail,
      CourseList,
      Menus
    },
    computed:{
      ...mapGetters({
        userInfo:'userInfo'
      }),
      time() {
        if(this.courses['activityState']){
          return dayjs(this.activity['endTime']).diff(dayjs())
        }else {
          return ''
        }
      },
      urlLink(){
        return process.env.VUE_APP_BASE_API
      },
      payPrice(){
        return  this.courses.price*this.giveNum
      }
    },
    data() {
      return {
        showZx:false,
        showFx: false,
        showShare: false,
        courses:{},
        activity:{},
        coursesSteps:[],
        recCourses:[],
        HbSrc:'',
        hasGroupList:[],
        showForm:false,
        userForm:{
          phone:'',
          code:''
        },
        checked:true,
        codeTime:60*1000,
        showCountDown:false,
        showPopup:false,
        showGiftPopup:false,
        giveNum:1,
        isNew:1,

        loading0:false,
        finished0:false,
        pageIndex0:0,
      }
    },
    created() {
      this._getRecommendList();
      const {id,token,pack,shareId} = this.$route.query;
      this._getCoursesInf(id,token,pack,shareId)
    },
    watch:{
      $route(newValue,oldValue){
        if(newValue.query.id!==oldValue.query.id){
          const {id} = newValue.query;
          this._getCoursesInf(id)
        }
      }
    },
    methods: {
      ...mapActions({
        getInfo:'user/getInfo',
        setShowTip:'app/setShowTip',
      }),
      onLoad0(){
        this.pageIndex0=this.pageIndex0+1
        const {id,token,pack,shareId} = this.$route.query;
        this._getCoursesInf(id,token,pack,shareId)
      },
      mzPayHandle(){
        if(testPlatform()){
          Toast('请在手机端完成支付')
          return;
        }
        getPayOrderMz({
          "quantity": this.giveNum,
          "price": this.courses['isDisCount']?this.courses['disPrice']:this.courses['price'],
          "amount": this.payPrice,
          "coursesId": this.courses.id
        }).then(res=>{
          const {result,sponsorId,type}=res
          wx.chooseWXPay({
            timestamp: result.timeStamp,
            nonceStr: result.nonceStr,
            package: result.packageValue,
            signType: result.signType,
            paySign: result.paySign,
            success: ()=> {
              this.$router.replace({path:'/giftRecord'})
            }
          });
        })
      },
      // 提交
      onSubmitPhone(){
        const {phone,code}=this.userForm
        if(!this.checked){
          Toast('请确认您已知晓平台相关协议')
        }else if(mobile(phone)&&code){
          submitPhone(this.userForm).then(async ()=>{
            await this.getInfo()
            this.showForm=false;
            Toast('手机号绑定成功')
          })
        }else {
          Toast('请输入正确的手机号和验证码')
        }
      },
      // 完成倒计时
      finishCountDown(){
        this.codeTime = 60*1000
        this.showCountDown=false
      },
      // 获取验证码
      getCodeHandle(){
        const {phone}=this.userForm
        if(mobile(phone)){
          getCode(phone).then(()=>{
            this.showCountDown=true;
            Toast('发送验证码成功')
            this.$nextTick(()=>{
              this.$refs.countDown.start();
            })
          })
        }else {
          Toast('请输入正确的手机号')
        }
      },
      // 设置当前播放索引=>跳转到播放列表
      setCurrentPlayHandle(item,index){
        const {id,pack} = this.$route.query
        if(this.courses['userState']===-1){
          if(item['tryFlag']===1){
            if(pack){
              this.$router.push({'path':`/mediaPlayer?id=${id}&stepId=${item.id}&size=${index}&pack=${pack}`})
            }else {
              this.$router.push({'path':`/mediaPlayer?id=${id}&stepId=${item.id}&size=${index}`})
            }
          }else {
            Toast('拼团中...')
          }
        }else if(this.courses['userState']){
          if(this.userInfo.phone){
            if(pack){
              this.$router.push({'path':`/mediaPlayer?id=${id}&stepId=${item.id}&size=${index}&pack=${pack}`})
            }else {
              this.$router.push({'path':`/mediaPlayer?id=${id}&stepId=${item.id}&size=${index}`})
            }
          }else {
            this.showForm=true
          }
        }else if(item['tryFlag']===1){
          if(pack){
            this.$router.push({'path':`/mediaPlayer?id=${id}&stepId=${item.id}&size=${index}&pack=${pack}`})
          }else {
            this.$router.push({'path':`/mediaPlayer?id=${id}&stepId=${item.id}&size=${index}`})
          }
        }else {
          this.setShowTip(true)
        }
      },
      // 点击推荐课程
      goDetailHandle(id){
        this.$router.push({path:'/detail',query:{id:id}})
      },
      // 运营商渠道获生成分享内容
      _getShareToken(token){
        getShareToken({
          param:token
        }).then(res=>{
          let {title,purl,subTitle} = this.courses
          let {id}= this.$route.query
          wxConfigApi({
            title:title,
            subTitle:subTitle?subTitle:'已完更',
            link:location.href.split('#')[0]+'#/detail?id='+id+'&token='+res,
            purl:purl,
            success:()=>{
              addStatisticsShare({
                "linkId": 0,
                "page": location.href.split('#')[1].split('?')[0],
                "plinkId": id,
              })
            }
          })
        })
      },
      // 获取课程信息
      _getCoursesInf(id,token,pack,shareId){
        getCoursesInf(id,{
          pack:pack,
          token:token,
          page:this.pageIndex0,
          shareId
        }).then(res=>{
          const {coursesDetail,coursesDetail:{stepInfoPage:{content}},activity} = res;
          this.courses=coursesDetail;
          this.coursesSteps=[...this.coursesSteps,...content];
          if(content.length<15){
            this.finished0=true;
          }
          this.loading0 = false;
          if(token){
            this._getShareToken(token)
          }else {
            wxConfigApi({
              title:coursesDetail.title,
              subTitle:coursesDetail.subTitle?coursesDetail.subTitle:'已完更',
              link: location.href.split('#')[0]+'#/detail?id='+id+'&shareId='+this.userInfo.unionId,
              purl:coursesDetail.purl,
              success:()=>{
                addStatisticsShare({
                  "linkId": 0,
                  "page": location.href.split('#')[1].split('?')[0],
                  "plinkId": coursesDetail.id,
                })
              }
            })
          }
          if(this.courses['activityState']){
            this.activity=activity[this.courses['activityState']]
          }
        })
      },
      // 获取推荐课程列表
      _getRecommendList(){
        getRecommendList().then(res=>{
          this.recCourses=res;
        })
      },
      // 发起支付
      payHandle(flag,isPay=0){
        if(this.courses['userState']===-1){
          Toast('您已在拼团中')
          return;
        }
        if(testPlatform()){
          Toast('请在手机端完成支付')
          return;
        }
        const data={
          orderType:0,
          productId:this.courses.id,
          price:this.courses.price,
        }
        if(flag===1){
          data.price=this.activity['disPrice']
        }else if(flag===2){
          data.orderType=1;
          if(this.activity['isNew']===1){
            if(isPay===0){
              this.showPopup=true
              return;
            } else if(isPay===1){
              this.isNew=0;
              data.price=this.activity['disPrice']
            }else if(isPay===2){
              this.isNew=1;
              data.price=this.activity['newPrice']
            }
          }else{
            data.price=this.activity['disPrice']
          }
        }
        if(flag===2){
          data.combinationId=this.activity['id']
          createGroupOrder(data).then((res)=>{
            wx.chooseWXPay({
              timestamp: res.timeStamp,
              nonceStr: res.nonceStr,
              package: res.packageValue,
              signType: res.signType,
              paySign: res.paySign,
              success: ()=> {
                this.$router.replace({path:`/groupBuy?uid=${this.userInfo.uid}&cid=${this.activity.id}`})
              }
            });
          })
        }else {
          if (flag===0){
            const {shareId} = this.$route.query;
            data['shareId']=shareId
          }
          getPayOrder(data).then(res=>{
            this.$router.push({
              path:'/confirmOrder',
              query:{
                orderId:res,
                to:encodeURIComponent('/paySuccess')
              }
            })
          })
        }
      },
      // 生产海报
      sharedHandleHb() {
        getShareCode(this.courses.id,{tag:0}).then(res=>{
          const {url}=res;
          this.HbSrc=url
          this.showShare = true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .play-container {
    .cover-box {
      width: 100%;
      height: 280px;
      box-sizing: border-box;
      padding: 30px 0;
      background: darkcyan;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .img-box {
        width: 209px;
        height: 156px;
        border-radius: 10px;
        overflow: hidden;
        background: darkgoldenrod;
      }

      .title-box {
        font-size: 16px;
        font-weight: bold;
        color: rgba(34, 34, 34, 1);
        line-height: 16px;
      }

      .des-box {
        font-size: 13px;
        color: rgba(153, 153, 153, 1);
        line-height: 13px;
      }
    }
  }

  .cover-box {
    width: 100%;
    height: 280px;
    background: darkcyan;
    position: relative;

    .yaoqing-top-box {
      width: 375px;
      height: 42px;
      background: rgba(0, 0, 0, 0.5);
      line-height: 42px;
      text-align: center;
      color: #ffffff;
    }
  }

  .discount-container {
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #ffffff;

    .discount-box {
      width: 355px;
      height: 71px;
      background: linear-gradient(270deg, rgba(254, 107, 24, 1) 0%, rgba(250, 69, 29, 1) 100%);
      border-radius: 10px;
      position: absolute;
      top: -25px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;

      .left-box {
        p {
          font-size: 20px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }

        .price-box {
          font-size: 14px;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;

          span {
            margin-left: 10px;
            text-decoration: line-through;
            font-size: 12px;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;
          }
        }
      }

      .right-box {
        p {
          font-size: 15px;
          color: rgba(255, 255, 255, 1);
        }

        .count-down-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;

          .van-count-down {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .colon {
            display: inline-block;
            margin: 0 5px;
            color: #ffffff;
            height: 24px;
            line-height: 24px;
          }

          .block {
            display: inline-block;
            line-height: 24px;
            width: 24px;
            height: 24px;
            color: #F87510;
            font-size: 16px;
            text-align: center;
            border-radius: 4px;
            font-weight: normal;
            background-color: #ffffff;
          }
        }
      }
    }
  }

  .share-box{
    position: fixed;
    z-index: 1;
    right: 0;
    top: 250px;
    box-sizing: border-box;
    width: 76px;
    height: 30px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
    border-radius: 15px 0px 0px 15px;
    font-size: 12px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    text-align: center;
  }

  .course-list {
    .van-cell__title {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
    }

    .more-course-box {
      color: #EE4F4D;
      font-size: 12px;
    }

    .van-card {
      background: #ffffff;
      margin-top: 0;

      .van-card__title {
        font-size: 14px;
        color: #222222;
      }

      .price-box {
        color: #666666;
        font-size: 12px;
      }

      .num-box {
        font-size: 12px;
        color: #666666;
      }
    }
  }

  .content-box {
    width: 100%;
    margin: 8px 0;
  }

  .discount-btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    .group-content{
      box-sizing: border-box;
      padding: 5px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 100%;
      flex: 1;
      background: #FF6C04;
      position: relative;
      .text-box{
        font-size: 15px;
        color: #ffffff;
        line-height: 12px;
      }
      .price-box {
        font-size: 15px;
        color: #ffffff;
        line-height: 15px;
      }
    }
    .single-content{
      box-sizing: border-box;
      padding: 5px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      flex: 1;
      height: 100%;
      background: #F3504A;
      .text-box{
        font-size: 15px;
        color: #ffffff;
        line-height: 12px;
      }
      .price-box {
        font-size: 15px;
        color: #ffffff;
        line-height: 15px;
      }
    }

    .discount-content {
      box-sizing: border-box;
      padding: 5px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 150px;
      height: 44px;
      background: #FFF9ED;

      .discount-box {
        font-size: 12px;
        color: rgba(252, 88, 27, 1);
        line-height: 12px;
        text-decoration: line-through
      }

      .price-box {
        font-size: 13px;
        font-weight: bold;
        color: rgba(252, 88, 27, 1);
        line-height: 15px;
      }


    }
  }

  .share-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .hb-container{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70%;
      img {
        width: 100%;
      }
      .leader-box{
        position: absolute;
        left: 10px;
        top: 5px;
        display: flex;
        align-items: center;
        .user-box{
          margin-left: 5px;
          font-size: 10px;
          color: #ffffff;
          p{
            line-height: 15px;
            width: 60%;
          }
        }
      }
    }
    .text-box{
      margin-top: 20px;
      color:#ffffff;
      font-size: 16px;
      font-weight:bold;
      padding: 6px 40px;
      border-radius: 10px;
      /*background: linear-gradient(to left, #DDA96D, #F3D0A0);*/
    }

    .bottom-box {
      position: absolute;
      bottom: 0;

    }

  }

  .other-group-buy {
    margin-top: 8px;
    .title-box{
      display: flex;
      align-items: center;
      span{
        font-size: 15px;
        color: #333333;
        margin-left: 8px;

      }
    }
    .value-box{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .other-info-box{
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        h5{
          font-size: 13px;
          color: #333333;
          line-height: 15px;
          span{
            color: #E02E24;
          }
        }
        p{
          font-size: 12px;
          display: flex;
          align-items: center;
          .van-count-down{
            margin-left: 4px;
            font-size: 12px;
            color: #666666;
          }
        }
      }
    }
  }

  .other-group-buy {
    margin-top: 8px;
    .title-box{
      display: flex;
      align-items: center;
      span{
        font-size: 15px;
        color: #333333;
        margin-left: 8px;

      }
    }
    .value-box{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .other-info-box{
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        h5{
          font-size: 13px;
          color: #333333;
          line-height: 15px;
          span{
            color: #E02E24;
          }
        }
        p{
          font-size: 12px;
          display: flex;
          align-items: center;
          .van-count-down{
            margin-left: 4px;
            font-size: 12px;
            color: #666666;
          }
        }
      }
    }
  }

  .notice-container{
    position: fixed;
    bottom: 50px;
    width: 100%;
    height:40px;
    background:rgba(255,249,237,1);
    padding: 0 10px;
    box-sizing: border-box;
    .notice-swipe {
      width: 100%;
      height: 40px;
      line-height: 40px;
      .grouping-box{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .item-box{
          display: flex;
          align-items: center;
          .van-count-down{
            color: #F3504A;
            font-size: 12px;
          }
        }
      }
    }
  }

  .formContainer{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    .formBox{
      box-sizing: border-box;
      padding: 32px 0 10px;
      width:80%;
      height:300px;
      background:rgba(255,255,255,1);
      border-radius:12px;
      p{
        width:100%;
        font-size:17px;
        font-weight:500;
        color:#000000;
        line-height:24px;
        text-align: center;
      }
      .van-form{
        margin-top: 20px;
        .van-field__label{
          color: #333333;
          font-size: 15px;
          span{
            font-size: 12px;
          }
        }
      }
      .line-box{
        display: inline-block;
        height: 18px;
        width: 1px;
        background: #E7E7E7;
        vertical-align: middle;
      }
      .van-count-down{
        display: inline-block;
        width: 70px;
        color: #D64848;
        margin-left: 10px;
        text-align: center;
      }
      .code-box{
        font-size: 13px;
        color: #D64848;
        margin-left: 10px;
        display: inline-block;
        width: 70px;
        vertical-align: middle;
      }
      .agreement-box{
        font-size: 12px;
        padding: 20px 20px 0;
        display: flex;
        align-items: flex-start;
        span{
          margin-left: 10px;
        }
        a{
          color: #E25C5A;
        }
      }
    }
  }
  .popup-container{
    width: 100%;
    height: 100%;
    .title-box{
      color: #222222;
      font-size: 17px;
      font-weight: bold;
      padding: 20px;
      line-height: 28px;
    }
    .top-box{
      height: 50px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title-box{
        color: #333333;
        font-size: 15px;
        font-weight: bold;
      }
      .bottom-line-box{
        width:51px;
        height:3px;
        background:rgba(255,139,105,1);
        border-radius:2px;
        position: absolute;
        bottom: 0;
      }
    }
    .bottom-box{
      width: 100%;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      box-sizing: border-box;
      .price-item{
        width:161px;
        height:88px;
        background:rgba(245,245,245,1);
        border-radius:10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        .price-box{
          font-size: 21px;
          color: #333333;
          font-weight: 500;
        }
        span{
          font-size: 29px;
          /*font-weight: bold;*/
        }
        .text-box{
          font-weight:500;
          color: #5E5E5E;
          font-size: 13px;
        }
      }
      .active-price-box{
        background: #FF8B69;
        color: #ffffff;
        .price-box{
          color: #ffffff;
        }
        .text-box{
          color: #ffffff;
        }
      }
    }
  }

</style>
