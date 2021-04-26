// pages/login/index.js
const UserAuth = require('../../request/userInfo');
const Constant = require('../../request/utils/constant')
const Toast = require('../../utils/Toast')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        appName: Constant.APP_NAME
    },

    getUserInfo:function(res) {
        if (res.detail.errMsg === 'getUserInfo:ok') { //已授权
            const {userInfo, iv, encryptedData} = res.detail
            console.log('res.detail=', res.detail);
            //提交给后台
            const params = {encryptedData, iv, ...userInfo}
            UserAuth.uploadEncrypDataIV(params).then(() => {
                Toast.showText('登录成功!', 2000)
                wx.setStorageSync(Constant.storageKey.userInfo_key, userInfo)
                getApp().globalData.homeRefresh = true
                getApp().globalData.needRefreshMine = true
                wx.navigateBack()
                console.log('登录成功 --');
            }).catch(er => {
                console.log('登录失败 --', er);
            })
        }
    },

    onSelectLoginLater() {
        wx.navigateBack()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        
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

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
})