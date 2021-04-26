// pages/mine/index.js
const https = require('../../../request/mine')
Page({

    /**
     * 页面的初始数据
     */
    
    data: {
        balance: ''
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
        this.findUserInfo()
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
        setTimeout(() => {
            wx.stopPullDownRefresh();
        }, 1000);
    },
    findUserInfo() {
      let userId = wx.getStorageSync('userId_key')
      https.findUserInfo({ userId }).then(res => {
        let balance = res.accountAmount / 100
          this.setData({
            balance
          })
      })
    },
    goWithdrawal () {
        wx.navigateTo({
            url: `/pages/mine/Withdrawal/index?balance=${this.data.balance}`,
        })
    },
    goWithdrawalList() {
        //提现记录
        wx.navigateTo({
            url: `/pages/mine/withdrawalRecordList/index`,
        })
    },
    gobillingDetails() {
         //账单明细
         wx.navigateTo({
            url: `/pages/mine/IncomeDetails/index`,
        })
    }
})