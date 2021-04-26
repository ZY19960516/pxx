// 账单明细
const https = require('../../../request/mine')
Page({

    /**
     * 页面的初始数据
     */
    
    data: {
        date:'',
        type:'',
        list:[ ],
        nomore: false,
        page: 1,
        tipsShow:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.findMemberPage()
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
        setTimeout(()=>{
            this.setData({
                tipsShow:false
            })
        },2000)
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
        this.findMemberPage();
    },
    
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.nomore) {
            this.data.page++;
            this.findMemberPage();
        }
    },

    findMemberPage () {
        let params = {
            size:10,
            page:this.data.page
        }
        https.findMemberPage(params).then(res => {
            let list = []
            if (res.current == 1) {
                list = res.records;
            } else {
                list = [...this.data.list, ...res.records];
            }
            let newList = list.map(item=>{
                item['type'] = 3
                return item
            })
            this.setData({
                list: newList,
                nomore: res.last,
                page: res.current,
            });
            wx.stopPullDownRefresh();
            })
            .catch((error) => {
                wx.stopPullDownRefresh();
                console.log(JSON.stringify(error));
            });
    }
})