// pages/copyGroup/index.js

const lsd = require('../../request/group')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        listSource:[],
        groupContent:[],
        isRefresh: false,
        isLoadMore: false,
        isLast:false,
        page: 1
    },

    onSelectCopy(e) {
        const item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: `/pages/creategroup/index?groupId=${item.id}&isEdit=0`
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCopyList()
    },

    getCopyList() {
        lsd.getCopyGroupList(this.data.page).then(res => {
            console.log(res);
            this.stopRefresh()
            this.data.page = parseInt(res.current)
            var records =  res.records || []
            if (records.length > 0) {
                records.forEach((el, index) => {
                    records[index].groupContent = JSON.parse(el.groupContent)
                })
                console.log(records);
            }
            if (this.data.isLoadMore) {
                this.data.isLoadMore = false
                records = [...this.data.listSource, ...records]
            }
            this.setData({
                listSource: records,
                isLast:  res.last
            })
        }).catch(er => {
            this.stopRefresh()
        })
    },

    stopRefresh() {
        if (this.data.isRefresh) {
            this.data.isRefresh = false
            wx.stopPullDownRefresh()
        }
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.data.page = 1
        this.data.isRefresh = true
        this.data.isLoadMore = false
        this.getCopyList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.isLast) {
            return
        }
        this.data.page += 1
        this.data.isRefresh = false
        this.data.isLoadMore = true
        this.getCopyList()
    }
})