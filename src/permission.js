import qs from 'qs'
import router from '@/router'
import store from '@/store'
import wechatAuth from '@/plugins/wechatAuth'
// 设置APPID
wechatAuth.setAppId(process.env.VUE_APP_WECHAT_APPID)
const whiteList = ['/404']
router.beforeEach(async (to, from, next) => {
  let url = window.location.href;
  if (url.includes('?from=')) { // 判断是否携带了 from 参数，这一步灵活变通，只要能判断出是从微信分享链接进来的就 OK
    // url = url.replace(/cn.+.#/, 'cn/#'); // 利用正则表达式去掉微信携带的 ?from=singlemessage&isappinstalled=0 这串参数，如果这串参数对于你当前的页面有用处的话，可以重新拼接到你正常的链接后面去
    window.location.href = window.location.origin + window.location.pathname + window.location.hash; // 重定向到正常链接
  }
  // 在白名单，直接进入
  if (whiteList.indexOf(to.path) !== -1) {
    return next()
  }
  const {loginStatus} = store.getters
  switch (Number(loginStatus)) {
    case 0:
      // 获取跳转地址
      wechatAuth.redirect_uri = processUrl()
      await store.dispatch('user/setLoginStatus', 1)
      window.location.href = wechatAuth.authUrl
      break
    case 1:
      try {
        wechatAuth.returnFromWechat(window.location.href)
        const code = wechatAuth.code
        // 通过code换取token
        await store.dispatch('user/loginWechatAuth', code)
        await store.dispatch('user/setLoginStatus', 2)
        // hash
        if (process.env.NODE_ENV !== 'development' && router.mode === 'hash') {
          window.location.href = window.location.origin + window.location.pathname + window.location.hash
        } else {
          next()
        }
      } catch (err) {
        await store.dispatch('user/setLoginStatus', 0)
        next()
      }
      break
    case 2:
      next()
      break
    default:
      break
  }
})

/**
 * 处理url链接
 * @returns {string}
 */
function processUrl() {
  // 本地环境换通过auth.html拿code
  const url = window.location.href
  // 解决多次登录url添加重复的code与state问题
  const urlParams = qs.parse(url.split('?')[1])
  let redirectUrl = url
  if (urlParams.code && urlParams.state) {
    delete urlParams.code
    delete urlParams.state
    const query = qs.stringify(urlParams)
    if (query.length) {
      redirectUrl = `${url.split('?')[0]}?${query}`
    } else {
      redirectUrl = `${url.split('?')[0]}`
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 中间授权页地址
    return `${process.env.VUE_APP_WECHAT_AUTH_URL}?backUrl=${redirectUrl}`
  }
  return redirectUrl
}
