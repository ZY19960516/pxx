//w物流信息
const https = require('../../../../request/mine')
Page({

    /**
     * 页面的初始数据
     */
    
    data: {
        orderNo:'',
        logisticsNumber:'',
        logisticsName:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.orderNo = options.orderNo
        if (options.logisticsNumber && options.logisticsName) {
            this.setData ({
                logisticsNumber:options.logisticsNumber,
                logisticsName:options.logisticsName
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
       console.log('chudi ');
    },

    sendGoods () {
        let params = {
            logisticsName:this.data.logisticsName,
            logisticsNumber:this.data.logisticsNumber,
            orderNo:this.data.orderNo
        }
        https.sendGoods(params).then(res => {
            wx.navigateBack({delta: 1})
        }).catch(error => {
            console.log(JSON.stringify(error))
        })
    },
    saveLogistics () {
        if (this.data.logisticsNumber && this.data.logisticsName) {
            this.sendGoods()
        } else {
            wx.$showText("请完整填写物流信息")
        }
    },
    inputNumber (e) {
        this.setData({
            logisticsNumber:e.detail.value 
        })
    },
    inputName (e) {
        this.setData({
            logisticsName:e.detail.value 
        })
    }
})
