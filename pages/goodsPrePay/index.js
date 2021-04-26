// pages/goodsPrePay/index.js
const lsd = require('../../request/address')
const lsd1 = require('../../request/home')
const Crypt = require('../../request/utils/cryptTool')
const Constant = require('../../request/utils/constant')

import {
    showText
} from '../../utils/Toast'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: [],
        goodsList: [],
        totalNum: 0, //购买数量
        totalPrice: 0, //总价
        groupInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.groupInfo = JSON.parse(decodeURIComponent(options.groupInfo))
        console.log("groupInfo>>>>", this.data.groupInfo);

        this.data.goodsList = JSON.parse(decodeURIComponent(options.goodsList))
        this.computeTotalPrice()
        this.setData({
            goodsList: this.data.goodsList
        })

        this.getAddressList()
    },

    getAddressList() {
        lsd.getUserAddress(1).then(res => {
            console.log(res);
            var addr = res[0]
            this.updateAddr(addr)
        })
    },

    OnNumResult(e) {
        const goods = e.detail
        console.log("商品数量变化>>>>>", this.data.goodsList);
        this.computeTotalPrice(goods)
    },

    computeTotalPrice(goods) {
        //计算选择的商品 总价 
        var tmpPrice = 0
        var tmpNum = 0
        for (let value of this.data.goodsList) {
            if (goods && value.id == goods.id && value.ruleId == goods.ruleId) {
                value.num = goods.num
            }
            const num = parseInt(value.num)
            //计算选择商品总数
            tmpNum += num
            //计算选择商品的总价
            tmpPrice += value.proPrice * num
        }
        this.setData({
            totalPrice: tmpPrice,
            totalNum: tmpNum,
        })
    },

    buy() {
        var info = {
            groupInfoId: this.data.groupInfo.id,
            productInfoList: [],
            receiptRemarks: "",
            selfAddressId: 0,
            userAddressId: this.data.address.id
        }

        if (!info.userAddressId) {
            showText('请先添加收件人')
            return
        }
        for (let value of this.data.goodsList) {
            var goods = {}
            goods.buyNum = value.num
            goods.isSingleRule = value.isSingleRule
            goods.proId = value.id
            goods.ruleId = value.ruleId

            info.productInfoList.push(goods)
        }

        console.log("提交订单>>>>", info);

        lsd1.submitOrder(info).then(res => {
            this.requestPayment(res.weChatPayParams, res.orderNo)
        })
    },

    requestPayment(obj, orderNo) {
        const that = this
        wx.requestPayment({
            timeStamp: obj.timeStamp,
            nonceStr: obj.nonceStr,
            package: obj.packageParam,
            signType: obj.signType,
            paySign: obj.sign,
            appId: obj.appId,
            success() {
                that.queryPayStatus(orderNo)
            },
            fail() {
                that.payFail()
            }
        })
    },

    queryPayStatus(orderNo) {
        lsd1.quryOrderStatus(orderNo).then(res => {
            // 0-失败 1-成功 2-支付中
            switch (res.payStatus) {
                case 1:
                    const typeIndex = this.data.groupInfo.userId == wx.getStorageSync(Constant.storageKey.userId_key) ? 0 : 1
                    wx.navigateTo({
                        url: `/pages/mine/order/index?typeIndex=${typeIndex}`,
                    })
                    getApp().globalData.homeRefresh = true
                    getApp().globalData.needRefreshMine = true
                    break;
                default:
                    this.payFail()
                    break;
            }
        })
    },

    //新增地址、选择地址
    selAddress() {
        const t = this
        if (!this.data.address || !this.data.address.name) { //没有维护地址
            wx.navigateTo({
                url: '/pages/createaddress/index?addrType=1',
                events: {
                    onPageResult(res) {
                        t.updateAddr(res)
                    }
                }
            })
        } else { //有地址，跳转选择地址页面
            wx.navigateTo({
                url: `/pages/address/index?type=1&select=true`,
                events: {
                    onPageResult(res) {
                        t.setData({
                            address: res,
                        })
                    }
                }
            })
        }
    },

    payFail() {
        showText("支付失败")
    },

    updateAddr(addr) {
        addr.name = addr.name.val
        addr.phone = addr.phone.val
        this.setData({
            address: addr
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