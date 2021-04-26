// components/group-list/group-list.js
const lsd = require('../../request/utils/request')
const https = require('../../request/mine')
const Constant = require('../../request/utils/constant')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        /**1全部 2指定团员 */
        type: {
            type: Number,
            value: 1
        },
        /**type=2时传要查询的userId */
        userId: {
            type: String,
            value: ''
        },
        /**搜索关键词 */
        keyword: {
            type: String,
            value: ''
        },

        isPullFresh: {
            type: Boolean,
            value: true
        },
        isLoadMore: {
            type: Boolean,
            value: false
        }

    },

    options: {
        addGlobalClass: true
    },

    observers: {
        'isPullFresh': function (v) {
            if (this.data.hasInit && v) {
                this.data.curPage = 1
                this.data.nomore = false
                this.getGroupList()
            }
        },

        'isLoadMore': function (v) {
            if (this.data.hasInit && v && !this.data.nomore && Constant.judementIsLogin()) {
                this.data.curPage++
                this.getGroupList()
            }
        },

        'keyword': function (v) {
            if (this.data.hasInit) {
                this.data.curPage = 1
                this.data.nomore = false
                this.getGroupList()
            }
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        curPage: 1,
        nomore: false, //是否没有更多数据
        hasInit: false,
        list: [],
        curLoginUserId: null,
        hasResp: false,
        noDataMsg: '暂无开团记录',
        noDataBtnMsg: '去开个团',
        showNoDataBtn: true
    },

    ready: function () {
        this.setData({
            curLoginUserId: wx.getStorageSync(Constant.storageKey.userId_key) || null
        })

        //组件初始化完成后自动加载数据
        this.getGroupList()
        this.data.hasInit = true
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getGroupList() {
            if (!Constant.judementIsLogin()) {
                this.setData({
                    hasResp: true
                })
                setInterval(() => {
                    wx.stopPullDownRefresh()
                }, 1000);
                return
            }
            const params = {
                page: this.data.curPage,
                size: "10",
                type: this.data.type
            }

            if (this.data.keyword)
                params.keyword = this.data.keyword

            if (this.data.userId) {
                params.appointUserId = this.data.userId
            } else {
                //如果外部声明是查看指定成员，但是又没传要看的成员id则自动用当前登录用户的id
                if (this.data.type == 2) {
                    params.appointUserId = this.data.curLoginUserId
                }
            }
            lsd.request('GET', Constant.requestURL.groupList, params).then(res => {
                var tmp = this.data.list;
                if (res.first) {
                    tmp = res.records
                } else {
                    tmp = tmp.concat(res.records)
                }
                if (!tmp || tmp.length == 0) {
                    var tips = this.data.keyword ? '暂无搜索结果~' : '暂无开团记录'
                    this.setData({
                        noDataMsg: tips,
                        noDataBtnMsg: '去开个团',
                        showNoDataBtn: !this.data.keyword || !Constant.judementIsLogin()
                    })
                }
                this.setData({
                    list: tmp,
                    nomore: res.last,
                    hasResp: true
                })

                wx.stopPullDownRefresh()
            }).catch(e => {
                console.log(e)
                wx.stopPullDownRefresh()

                this.setData({
                    hasResp: true
                })
            })
        },

        //自己发起的团操作按钮
        showAction(e) {
            let that = this
            let groupStatus = e.target.dataset.groupstatus
            console.log(groupStatus, 'groupStatus');
            wx.showActionSheet({
                itemList: ["修改团信息", `${ groupStatus==1 ? '结束团' : '开启团购'}`, "删除团"],
                itemColor: "#000000",
                success: function (res) {
                    if (!res.cancel) {
                        let id = e.target.dataset.id
                        if (res.tapIndex == 0) {
                            // /修改团信息
                            wx.navigateTo({
                                url: `/pages/creategroup/index?groupId=${id}&isEdit=1`
                            })
                        } else if (res.tapIndex == 1) {
                            if (groupStatus == 1) {
                                //进行中状态要关闭
                                that.updateStartOrEndGroupInfo(id, 0)
                            } else {
                                //未开始或者结束状态要开启
                                that.updateStartOrEndGroupInfo(id, 1)
                            }
                        } else if (res.tapIndex == 2) {
                            // /删除团
                            that.deletePtGroupInfo(id)
                        }
                    }
                },
            });
        },

        updateStartOrEndGroupInfo(id, type) {
            let params = {
                groupId: id,
                type: type
            }
            https.updateStartOrEndGroupInfo(params).then(res => {
                if (res) {
                    this.getGroupList()
                }
            }).catch(e => {
                console.log(e)
            })
        },

        //删除开团信息
        deletePtGroupInfo(id) {
            let params = {
                id
            }
            https.deletePtGroupInfo(params).then(res => {
                this.getGroupList()
            }).catch(e => {
                console.log(e)
            })
        },


        //跳转团长个人主页
        intoCaptain(e) {
            const item = e.mark.myMark
            if (item.userId != this.data.userId) //点击的id与当前主页团长id一样就不跳转了
                wx.navigateTo({
                    url: `../captain/index?id=${item.userId}&title=${item.groupUserName}`,
                })
        },

        //进入团详情
        intoDetail(e) {
            wx.navigateTo({
                url: `../groupDetail/index?id=${e.mark.myMark.id}&title=${e.mark.myMark.groupTittle}`,
            })
        },

        share(item) {
            console.log(item,'000000');
        },
    }
})