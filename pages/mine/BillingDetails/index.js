// 账单明细
const https = require('../../../request/mine')
Page({

    /**
     * 页面的初始数据
     */
    
    data: {
        date:'',
        typeArray:['全部','收入','支出'],
        typeIndex:0,
        type:'',
        list:[
           
        ],
        nomore: false,
        page: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.billingDetails()
       //首次进入页面拿到所有数据 拿到数组第一个vdate赋值给日期组件（取最近有数据日期）  点击日期组件可筛选 条件为日期和类型-收入支出 筛选后为当前选择条件的列表
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
        this.data.page = 1;
        this.billingDetails();
    },
    
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('chudile');
        if (!this.data.nomore) {
            this.data.page++;
            this.billingDetails();
        }
    },
    
    billingDetails () {
        let params = {
            type:this.data.typeIndex,
            size:10,
            page:this.data.page
        }
        https.billingDetails(params).then(res => {
            let list = []
            if (res.current == 1) {
                list = res.records;
            } else {
                list = [...this.data.list, ...res.records];
            }
            this.setData({
                list: list,
                nomore: res.last,
                page: res.current,
            });
            wx.stopPullDownRefresh();
            })
            .catch((error) => {
                wx.stopPullDownRefresh();
                console.log(JSON.stringify(error));
            });
    },
    bindDateChange(e) {
        this.setData({
          date: e.detail.value
        })
        this.billingDetails()
    },
    selectType (e) {
        let {index} = e.currentTarget.dataset
        this.setData({typeIndex:index,page:1,nomore:false})
        // this.page = 1
        // this.nomore = false
        // this.type = item
        this.billingDetails()
    }
})