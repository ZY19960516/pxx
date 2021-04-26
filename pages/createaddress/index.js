// pages/createaddress/index.js

const AddressJudge = require('./utils/index')
const lsd = require('../../request/address')
const Crypt = require('../../request/utils/cryptTool')
let eventChannel = {}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: '',
        business: '',
        userName: '',
        userPhone: '',
        address:'',
        regionArr: [],
        addressId: '',
        addrType:2
    },
    onBusinessFinished: function(e) {
        this.setData({business: e.detail.value})
    },
    
    onUserNameFinished: function(e) {
        this.setData({userName: e.detail.value})
    },

    onPhoneFinished: function(e) {
        this.setData({userPhone: e.detail.value})
    },

    onFinisehdRegion: function(e) {
        let regionArr = e.detail.region
        this.setData({
            region: regionArr.join(""),
            regionArr
        })
    },

    onAddressFinished: function(e) {
        this.setData({address: e.detail.value})
    },

    onSelectAdd:function() {
        ///data数据解构
        const {business, userName, userPhone, regionArr, address, addressId} = this.data
        ///判断数据是否符合要求
        if ((this.data.addrType==2&&AddressJudge.isBusinessLegal(business)||this.data.addrType==1)&&
            AddressJudge.isUserNameLegal(userName) && 
            AddressJudge.isUserPhoneLegal(userPhone) &&
            AddressJudge.isRegionLegal(regionArr)  && 
            AddressJudge.isAddressLegal(address)) {
            ///组装请求参数
            let params = {
                deliveryName: business,
                address,
                name: Crypt.Encrypt(userName),
                phone: Crypt.Encrypt(userPhone),
                type: this.data.addrType,
                isDefault: 0,
                province: regionArr[0],
                city: regionArr[1],
                area: regionArr[2]
            }
            if (addressId.length) {
                params = {id:addressId, ...params}
            }            
            this.submitAddress(params)
        }
    },

    ///提交地址数据
    submitAddress:function(params) {
        console.log('params', params);
        ///发送网络请求
        lsd.updateAddress(params)
        .then(res => { //请求成功
            wx.navigateBack({
                success: function (r) {
                  //返回地址给上个页面
                  eventChannel.emit('onPageResult', res);
                }
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            addrType:options.addrType||2
        })
        eventChannel = this.getOpenerEventChannel()
        wx.setNavigationBarTitle({title: options.title || '新增地址'})
        if (options.address) { //修改地址
            const item = JSON.parse(decodeURIComponent(options.address)) 
            this.setData({
                region: `${item.province}${item.city}${item.area}`,
                business: item.deliveryName || '',
                userName: item.name.val || '',
                userPhone: item.phone.val || '',
                address:item.address || '',
                regionArr: [item.province, item.city, item.area],
                addressId: item.id
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