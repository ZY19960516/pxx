// pages/mine/index.js
const https = require('../../../request/mine')
Page({

    /**
     * 页面的初始数据
     */
    
    data: {
        isAllScreen: false,
        Locationname: '',
        isactive:false,
        userInfo:{}
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
    
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    
	goSetpage () {
        wx.navigateTo({
            url: '/pages/setting/index'
         })
    },
    findUserInfo () {
		https.findUserInfo().then(res => {
			console.log(res)
            this.setData({userInfo: res})
		})
    },
    chooseLocation () {
         var that = this
         wx.chooseLocation({
            success (res) {
            that.Locationname = res.name
            that.setData({Locationname:res.name})
            }
         })
     },
     showAction () {
         wx.showActionSheet({
         itemList: ["修改团信息", `${this.isactive ? '开启团购' : '结束团'}` ,"复制团","删除团"],
         itemColor: "#000000",
         success: function (res) {
         if (!res.cancel) {
             if (res.tapIndex == 0) {
                 
             } else if (res.tapIndex == 1) {
             }
         }
         },
     });
     }
})