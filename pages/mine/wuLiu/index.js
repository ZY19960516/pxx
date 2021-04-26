// pages/mine/wuLiu/index.js
import { copyMsgToClipboard } from "../../../utils/util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        historys: [
            // {time: "2020-12-14 14:14:14", message: "快件已到达深证市，正发往宝安区"},
            // {time: "2020-12-13 13:13:13", message: "快件到达湖南分拣区，下一站发往深圳"},
            // {time: "2020-12-12 12:12:12", message: "商家已发货"}
        ],
        isFinished: false, //标识是否完成
        lgcName: "", //物流公司名称
        lgcNo: "", //物流单号
    },

    onSelectCopy() {
        let copyData = this.data.lgcNo || ''
        copyMsgToClipboard(copyData)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {lgcName, lgcNo} = options
        this.setData({lgcName: lgcName || "" , lgcNo: lgcNo || ""})
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})