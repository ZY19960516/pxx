//app.js
const request = require('./request/openId')
import {getGroupShareInfo} from './utils/share.js'
import {showText,showSuccess} from './utils/Toast'
wx.$showText = showText
wx.$showSuccess = showSuccess
App({
  onLaunch: function () {
    request.getWXOpenId()
    this.overShare()
  },
  overShare: function () {
    //监听路由切换
    //间接实现全局设置分享内容
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1],
        data;
      if (view) {
        data = view.data;
        // console.log('是否重写分享方法', data.isOverShare);
        if (!data.isOverShare) {
          data.isOverShare = true;
          view.onShareAppMessage = function () {
            //你的分享配置
            return {
              title: '立省多',
              path: '/pages/home/index',
              imageUrl: 'https://c.lishengduo.com/wt/images/minip_icon.png',
            };
          }
        }
      }
    })
  },
  globalData: {
    productSpecs: [], ///商品规格
    homeRefresh: false,
    needRefreshMine:false,
  }
})