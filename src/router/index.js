import Vue from 'vue'
import Router from 'vue-router'
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
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index'),
    meta: {
      title: '搜索',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/meeting',
    name: 'meeting',
    component: () => import('@/views/meeting/index'),
    meta: {
      title: '会议',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/pay/index'),
    meta: {
      title: '购买',
      keepAlive: false,
      hasTabBar:false
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/message/index'),
    meta: {
      title: '消息列表',
      keepAlive: false,
      hasTabBar:true,
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
    path: '/my/ticket',
    name: 'ticket',
    component: () => import('@/views/my/ticket'),
    meta: {
      title: '我的门票',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/my/history',
    name: 'history',
    component: () => import('@/views/my/classHistory'),
    meta: {
      title: '上课记录',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/my/payHistory',
    name: 'history',
    component: () => import('@/views/my/payHistory'),
    meta: {
      title: '缴费记录',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/my/invite',
    name: 'invite',
    component: () => import('@/views/my/invite'),
    meta: {
      title: '邀请关系',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/my/billApply',
    name: 'billApply',
    component: () => import('@/views/my/billApply'),
    meta: {
      title: '电子申请',
      keepAlive: false,
      hasTabBar:false,
    }
  },
  {
    path: '/my/billApplyDz',
    name: 'billApplyDz',
    component: () => import('@/views/my/billApplyDz'),
    meta: {
      title: '发票申请',
      keepAlive: false,
      hasTabBar:false,
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
    path: '/authenticate',
    name: 'authenticate',
    component: () => import('@/views/authenticate/index'),
    meta: {
      title: '实名认证',
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
