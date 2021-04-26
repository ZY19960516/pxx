// pages/mine/index.js
const https = require('../../request/mine')
const Constant = require('../../request/utils/constant')

import share from '../../utils/share.js'
import { navagationPage,judementIsLogin } from "../../request/utils/constant";

Page({

    /**
     * 页面的初始数据
     */

    data: {
        // statusBarHeight: statusBarHeight,
        haveCommunity: '',
        isactive: false,
        userInfo: {},
        isLogin:false,
        isPullFresh: true,
        isLoadMore: false,
        userId:null,
        isOverShare:true,//全局设置是否重写分享
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let userId = wx.getStorageSync(Constant.storageKey.userId_key) || null
      this.setData({
        userId
     })
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
        if (judementIsLogin()) {
            this.findUserInfo()
            if (!this.data.isLogin) {
                this.setData({
                    isLogin:true
                })
            }
        }
        if (getApp().globalData.needRefreshMine) {
            this.setData({
                isPullFresh: true
            })
            getApp().globalData.needRefreshMine = false
        }
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
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.onShow()
        setTimeout(() => {
            wx.stopPullDownRefresh();
        }, 1000);
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
    onShareAppMessage: function (e) {
        const groupItem = e.target ? e.target.dataset.item : ''
        const groupTittle = e.from == 'button' ? groupItem.groupTittle : '立省多'
        const img = groupItem.imgList && groupItem.imgList.length > 0 ? groupItem.imgList[0] : 'https://c.lishengduo.com/wt/images/minip_icon.png'
        const groupId = groupItem.id ? groupItem.id : ''
        return share.getGroupShareInfo(groupTittle,img,e.from,groupId)
    },

    findUserInfo() {
        let userId = wx.getStorageSync('userId_key')
        https.findUserInfo({ userId }).then(res => {
            this.setData({
                userInfo: res
            })
        })
    },
    goAddress() {
        navagationPage('/pages/address/index?type=1')
    },
    goProductlibrary() {
        navagationPage('/pages/productlibrary/index')
    },
    goHomepage() {
        navagationPage(`/pages/captain/index?id=${this.data.userInfo.userId}&fromPage=mine`)
    },
    goWallet() {
        navagationPage(`/pages/mine/wallet/index?balance=${this.data.userInfo.accountAmount/100}`)
    },
    goIncomeDetails () {
        navagationPage(`/pages/mine/IncomeDetails/index`)
    },
    goSetting() {
        navagationPage('/pages/setting/index')
    },
    goVerification() {
        navagationPage(`/pages/mine/Verification/index?id=${this.data.userInfo.userId}`)
    },
    goleagueMember () {
        navagationPage('/pages/mine/leagueMember/index')
    },
    goOrder() {
        navagationPage('/pages/mine/order/index')
    },
    goLogin () {
        navagationPage('/page/login/index')
    }
})