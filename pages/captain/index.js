// pages/captain/index.js
const Constant = require('../../request/utils/constant')
const https = require('../../request/mine')
import share from '../../utils/share.js'
Page({
   /**
    * 页面的初始数据
    */
   data: {
      userInfo: {},
      curUserId: '',
      isPullFresh: true,
      isLoadMore: false,
      isOverShare:true,//全局设置是否重写分享
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      let userId = wx.getStorageSync(Constant.storageKey.userId_key) || null
      if (options.id == userId) {
         //是自己的 主页
         wx.setNavigationBarTitle({
            title: '我的主页',
         })
      } else {
         wx.setNavigationBarTitle({
            title: options.title + '的主页',
         })
      }

      this.setData({
         isMine: options.id == userId,
         curUserId: options.id
      })
      this.findUserInfo()
   },

   findUserInfo() {
      https.findUserInfo({
         userId: this.data.curUserId
      }).then(res => {

         var introduction = res.introduction || 'ta还没有给店铺添加~'
         var addr = res.address || 'ta还没有添加位置'
         if (this.data.isMine) {
            introduction = res.introduction || '介绍自己的店铺更容易获得关注哦~'
            addr = res.address || '去添加位置，让更多的人购买'
         }
         res.introduction = introduction
         res.address = addr
         this.setData({
            userInfo: res
         })
      })
   },

   editHome() {
      if (this.data.isMine)
         wx.navigateTo({
            url: `../setting/index`
         })
   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {
      this.findUserInfo()
      this.setData({
         isPullFresh: true
      })
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {
      this.setData({
         isLoadMore: true
      })
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage(e) {
      const groupItem = e.target ? e.target.dataset.item : ''
      const groupTittle = e.from == 'button' ? groupItem.groupTittle : '立省多'
      const img = groupItem.imgList && groupItem.imgList.length > 0 ? groupItem.imgList[0] : 'https://c.lishengduo.com/wt/images/minip_icon.png'
      const groupId = groupItem.id ? groupItem.id : ''
      return share.getGroupShareInfo(groupTittle,img,e.from,groupId)
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },
})