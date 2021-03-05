import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import '@/assets/css/index.scss'
import '@/assets/font/iconfont.css'
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
//  IE 兼容
import '@babel/polyfill'
// 移动端适配
import 'lib-flexible/flexible.js'
// 授权
import '@/permission'
// filters
import '@/filters'
// title
import '@/plugins/wechatTitle'
// 安卓字体
import './plugins/androidFontReset'
// VConsole
import VConsole from 'vconsole'
if(window.location.href.indexOf('zxtest1.ssdjz.cn')>=0){
  new VConsole()
}
import VueAwesomeSwiper from "vue-awesome-swiper";
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper);
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
