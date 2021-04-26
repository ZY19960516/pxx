// pages/home/index.js
import share from '../../utils/share.js'
const Constant = require('../../request/utils/constant')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPullFresh: true,
        isLoadMore: false,
        keyword: '',
        isLogin: Constant.judementIsLogin(),
        isOverShare:true,//全局设置是否重写分享
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getChannel()
        this.setData({
            search: this.search.bind(this)
        })
    },

    getChannel() {
        // eslint-disable-next-line
        let page = getCurrentPages()
        let currentPage = page[page.length - 1]
        let ApkChannel = currentPage.options.ApkChannel
        console.log(ApkChannel, 'ApkChannel')
        wx.setStorageSync('ApkChannel', ApkChannel)
    },

    search: function (value) {
        console.log(">>>>>search", value);

        this.setData({
            keyword: value
        })
    },

    clearSearch() {
        this.setData({
            keyword: ''
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
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
        if (getApp().globalData.homeRefresh) {
            this.setData({
                isPullFresh: true,
                isLogin: Constant.judementIsLogin()
            })
            getApp().globalData.homeRefresh = false
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
})