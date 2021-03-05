import wx from 'weixin-js-sdk';
import {getWxConfig} from '../api'

export default function wxConfigApi(options) {
  //options是分享的配置内容*/
  getWxConfig(
    process.env.VUE_APP_WECHAT_APPID,
    {
      url: encodeURI(location.href.split('#')[0]),
    }).then(data=>{
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名
      jsApiList: [
        'chooseWXPay',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
      ]
    });
    wx.ready(()=>{
      wx.onMenuShareAppMessage({
        title: options['title'],
        desc: options['subTitle'],
        link: options['link'],
        imgUrl: options['purl'],
        type: '',
        dataUrl: '',
        success: ()=>{
          if(options['success']){
            options['success']()
          }
        }
      })
      wx.onMenuShareTimeline({
        title: options['title'],
        link: options['link'],
        imgUrl: options['purl'],
        success: ()=>{
          if(options['success']){
            options['success']()
          }
        }
      })
    });
    wx.error(function(){
      console.log('微信验证失败')
    });
  })
}
