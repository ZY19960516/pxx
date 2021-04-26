// 商品核销
const https = require('../../../request/mine')
Page({

    /**
     * 页面的初始数据
     */
    
    data: {
        date:'',
        typeArray:['待提货','已提货'],
        typeIndex:0,
        // type:'待提货',
        userId:'',
        list:[],
        verBtnflag:false,
        orderNo:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.userId = options.id
        this.findOrderInfoWriteOffList()
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


    findOrderInfoWriteOffList () {
        let params = {
            groupInfoId:this.data.userId,
            searchWord:'',
            type:this.data.typeIndex
        }
        https.findOrderInfoWriteOffList(params).then(res => {
            this.setData({list:res})
            console.log(this.data.list,'list');
        }).catch(error => {
            console.log(JSON.stringify(error))
        })
    },
    selectType (e) {
        let {index} = e.currentTarget.dataset
        this.setData({typeIndex:index})
        // this.data.type = item
        this.findOrderInfoWriteOffList()
    },
    getData(e) {
        console.log(e,'eee');
        if (e.detail) {
            this.setData({verBtnflag:true,orderNo:e.detail})
        }
    },
    confirmWriteOff () {
        console.log('aaaaaaaaaaa');
        let params = {
            orderNo:this.data.orderNo
        }
        https.confirmWriteOff(params).then(res => {
            this.setData({list:res})
            console.log(this.data.list,'list');
        }).catch(error => {
            console.log(JSON.stringify(error))
        })
    }
})