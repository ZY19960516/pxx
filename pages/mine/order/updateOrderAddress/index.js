// pages/updateOrderAddress/index.js

const AddressJudge = require('../../../createaddress/utils/index')
const lsd = require('../../../../request/mine')
const Crypt = require('../../../../request/utils/cryptTool')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: '',
        receiptCity:'',
        receiptArea:'',
        receiptProvince:'',
        receiptName: '',
        receiptPhone: '',
        receiptAddress:'',
        regionArr: [],
        orderNo: '',
    },
    
    onUserNameFinished: function(e) {
        this.setData({receiptName: e.detail.value})
    },

    onPhoneFinished: function(e) {
        this.setData({receiptPhone: e.detail.value})
    },

    onFinisehdRegion: function(e) {
        let regionArr = e.detail.region
        this.setData({
            region: regionArr.join(""),
            regionArr
        })
    },

    onAddressFinished: function(e) {
        this.setData({receiptAddress: e.detail.value})
    },

    onSelectAdd:function() {
        ///data数据解构
        const { receiptName, receiptPhone, regionArr, receiptAddress, orderNo} = this.data
        ///判断数据是否符合要求
        if (
            AddressJudge.isUserNameLegal(receiptName) && 
            AddressJudge.isUserPhoneLegal(receiptPhone) &&
            AddressJudge.isRegionLegal(regionArr)  && 
            AddressJudge.isAddressLegal(receiptAddress)) {
            ///组装请求参数
            let params = {
                receiptAddress,
                receiptName: receiptName,
                receiptPhone:receiptPhone,
                receiptProvince: regionArr[0],
                receiptCity: regionArr[1],
                receiptArea: regionArr[2],
                orderNo:orderNo
            }
            this.submitAddress(params)
        }
    },

    ///提交地址数据
    submitAddress:function(params) {
        ///发送网络请求
        lsd.updateOrderAddress(params)
        .then(res => { //请求成功
            wx.$showText('操作成功')
            wx.navigateBack({delta: 1})
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const addressInfo = JSON.parse(decodeURIComponent(options.orderinfo)) 
        if (addressInfo) { //修改地址
            this.setData({
                region: `${addressInfo.receiptProvince}${addressInfo.receiptCity}${addressInfo.receiptArea}`,
                receiptName: addressInfo.receiptName.val || '',
                receiptPhone: addressInfo.receiptPhone.val || '',
                receiptAddress:addressInfo.receiptAddress || '',
                regionArr: [addressInfo.receiptProvince, addressInfo.receiptCity, addressInfo.receiptArea],
                orderNo: addressInfo.orderNo
            })
        }
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