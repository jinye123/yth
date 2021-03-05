import Vue from 'vue'
import Router from 'vue-router'
import PaySuccessPage from '../views/paySuccess'
Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index'),
    meta: {
      title: '圣商在线',
      keepAlive: true,
      hasTabBar:true
    }
  },
  {
    path: '/campList',
    name: 'campList',
    component: () => import('@/views/camp/campList'),
    meta: {
      title: '训练营列表',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/liveTv',
    name: 'liveTv',
    component: () => import('@/views/liveTv/index'),
    meta: {
      title: '直播',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/camp',
    name: 'camp',
    component: () => import('@/views/camp/index'),
    meta: {
      title: '训练营',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/camp/qrCode',
    name: 'qrCode',
    component: () => import('@/views/camp/qrCode'),
    meta: {
      title: '添加老师',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/camp/hb',
    name: 'hb',
    component: () => import('@/views/camp/hb'),
    meta: {
      title: '分享返回红包',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/camp/follow',
    name: 'follow',
    component: () => import('@/views/camp/follow'),
    meta: {
      title: '关注公众号',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('@/views/card/index'),
    meta: {
      title: '圣商在线年卡包',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/card/cardList',
    name: 'cardList',
    component: () => import('@/views/card/cardList'),
    meta: {
      title: '课程中心',
      keepAlive: false,
      hasTabBar:true
    }
  },
  {
    path: '/card/sharePoster',
    name: 'sharePoster',
    component: () => import('@/views/card/sharePoster'),
    meta: {
      title: '分享海报',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/card/publicQrCode',
    name: 'publicQrCode',
    component: () => import('@/views/card/publicQrCode'),
    meta: {
      title: '添加老师',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/card/essenceQrCode',
    name: 'essenceQrCode',
    component: () => import('@/views/card/essenceQrCode'),
    meta: {
      title: '添加老师',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/more',
    name: 'more',
    component: () => import('@/views/more/index'),
    meta: {
      title: '更多课程',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/offlineCourse',
    name: 'offlineCourse',
    component: () => import('@/views/offlineCourse/index'),
    meta: {
      title: '精华研讨会',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/offlineCourse/detail',
    name: 'offlineCourseDetail',
    component: () => import('@/views/offlineCourse/detail'),
    meta: {
      title: '会议',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/offlineCourse/question',
    name: 'offlineCourseQuestion',
    component: () => import('@/views/offlineCourse/question'),
    meta: {
      title: '问卷调查',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail/index'),
    meta: {
      title: '课程详情',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('@/views/confirmOrder/coupon'),
    meta: {
      title: '优惠券',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/authenticate',
    name: 'authenticate',
    component: () => import('@/views/authenticate/index'),
    meta: {
      title: '身份认证',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: () => import('@/views/confirmOrder/index'),
    meta: {
      title: '确认订单',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/groupBuy',
    name: 'groupBuy',
    component: () => import('@/views/groupBuy/index'),
    props: (route) => ({ cid: route.query.cid,uid: route.query.uid }),
    meta: {
      title: '课程拼团',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: PaySuccessPage,
    meta: {
      title: '关注圣商',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/receive',
    name: 'receive',
    component: () => import('@/views/receive/index'),
    meta: {
      title: '课程领取',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/giftRecord',
    name: 'giftRecord',
    component: () => import('@/views/giftRecord/index'),
    meta: {
      title: '赠送记录',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/sendFriends',
    name: 'sendFriends',
    component: () => import('@/views/sendFriends/index'),
    meta: {
      title: '送好友',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/dayUpdate',
    name: 'dayUpdate',
    component: () => import('@/views/dayUpdate/index'),
    meta: {
      title: '每日更新',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/dayDetail',
    name: 'dayDetail',
    component: () => import('@/views/dayUpdate/detail'),
    meta: {
      title: '课程简介',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/message/index'),
    meta: {
      title: '消息列表',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my/index'),
    meta: {
      title: '个人中心',
      keepAlive: false,
      hasTabBar:true,
    }
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('@/views/my/edit'),
    meta: {
      title: '修改信息',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/purchased',
    name: 'purchased',
    component: () => import('@/views/my/purchased'),
    meta: {
      title: '',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/my/receive',
    name: 'myReceive',
    component: () => import('@/views/my/receive'),
    meta: {
      title: '我的领取',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/my/receiveCode',
    name: 'myReceiveCode',
    component: () => import('@/views/my/receiveCode'),
    meta: {
      title: '我的领取',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/extension',
    name: 'extension',
    component: () => import('@/views/my/extension'),
    meta: {
      title: '会员推广',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/my/extensionCenter',
    name: 'extensionCenter',
    component: () => import('@/views/my/extensionCenter'),
    meta: {
      title: '推广中心',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('@/views/information/index'),
    meta: {
      title: '资讯',
      keepAlive: true,
      hasTabBar:true,
    }
  },
  {
    path: '/information/detail',
    name: 'informationDetail',
    component: () => import('@/views/information/detail'),
    meta: {
      title: '资讯',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/kcap',
    name: 'kcap',
    component: () => import('@/views/kcap/index'),
    meta: {
      title: '课程安排',
      keepAlive: false,
      hasTabBar:false,
    }
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({y: 0}),
    routes: router
  })
const VueRouter=new createRouter()
VueRouter.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
    location.reload();
    // const targetPath = $router.history.pending.fullPath;
    // $router.replace(targetPath);
  }
});

export default VueRouter
