// pages/creategroup/index.js

const lsd = require('../../request/group')
const ConfigUtils = require('../../utils/config')
const GrpopUtils = require('./utils/utils')
const Constant = require('../../request/utils/constant')
const judge = require('../../utils/judge')

const groupPrivices = ConfigUtils.groupPrivices
const groupCopys = ConfigUtils.groupCopys
const groupUserShows = ConfigUtils.groupUserShows
const groupHelpSoldSource = ConfigUtils.groupHelpSoldSource



Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        products:[], //团购商品
        ///团购标题
        groupTittle: '',
        //标签(只能添加一个)
        tagEnable: true,
        //表示默认有一个文字输入框
        introduces: [GrpopUtils.defaultText()],

        ///团隐私数据源
        groupPrivices: groupPrivices,
        priviceIndex: 0,
        privice:groupPrivices[0],


        ///起购金额
        startPrice: '',
        // showStartPrice:false,
        // startPriceIndex:0,
        ///复制团购数据
        copySource:groupCopys,
        copySourceIndex: 0,
        copyValue: groupCopys[0],
        
        ///物流方式
        logistics: {
            type: 1,
            name: '快递',
            addressIds:[],
        },

        ///跟团人展示
        groupUserShowIndex:0,
        groupUserShow: groupUserShows[0],
        groupUserShowSource: groupUserShows,
        ///设置团长帮卖
        helpSoldIndex: 0,
        helpSold: groupHelpSoldSource[0],
        helpSoldSource: groupHelpSoldSource,
        //跟团提醒
        followTips: '',

        ///团购时间
        timeRange: [],
        startTime: '',
        endTime: '',
        startIndexs:[],
        endIndexs:[],

        // 标记是否是编辑
        isEdit:false,
         // 标记是否是创建团
        isCreate:true,
        // 团id
        groupId: ''
    },

    // 反显数据
    showExistGroup() {
        lsd.getGroupDetial(this.data.groupId).then(res => {
            console.log('获取结果==res', res);
            if (res) {
                const logistics = {
                    type: res.logisticsMode,
                    name: res.logisticsMode == 1 ? '快递' : (res.logisticsMode == 2 ? '自提' : '其他'),
                    addressIds:[],
                }
                ///团隐私数据源
                var priviceIndex = 0
                var privice = {}
                this.data.groupPrivices.forEach((item, index) => {
                    if (res.privacySettings == item.type) {
                        priviceIndex = index
                        privice = item
                    }
                })
                ///复制团购数据
                var copySourceIndex = 0
                var copyValue = {}
                this.data.copySource.forEach((item, index) => {
                    if (res.copy == item.type) {
                        copySourceIndex = index
                        copyValue = item
                    }
                })

                ///跟团人展示
                var groupUserShowIndex = 0
                var groupUserShow = {}
                this.data.groupUserShowSource.forEach((item, index) => {
                    if (res.leaderShow == item.type) {
                        groupUserShowIndex = index
                        groupUserShow = item
                    }
                })

                ///设置团长帮卖 
                var helpSoldIndex = 0
                var helpSold = {}
                this.data.helpSoldSource.forEach((item, index) => {
                    if (res.helpBuy == item.type) {
                        helpSoldIndex = index
                        helpSold = item
                    }
                })

                //1-文字 2-小图 3-大图 4-视频 5-标签
                var introduces = JSON.parse(res.groupContent)
                var tagEnable = true
                if (introduces.length > 0) {
                    introduces.forEach((el, index) => {
                        if (index == 0) {
                            el.upEnable = false
                            el.dwonEnable = true
                        } else if (index == introduces.length-1) {
                            el.upEnable = true
                            el.dwonEnable = false
                        } else {
                            el.upEnable = true
                            el.dwonEnable = true
                        }
                        if (el.type == 5) { ///标签只能有一个
                            tagEnable = false
                        }
                    })
                }
                // 对产品添加编辑标识 isEdit: 0-新增 1-编辑
                res.groupProductList.forEach(el => {
                    if (this.data.isEdit == false) {
                        el.isEdit = 0
                    } else {
                        el.isEdit = 1
                    }
                })
                console.log('introduces=', introduces);
                this.setGroupTime(res.startTime || '', res.endTime || '')
                this.setData({
                    groupTittle: res.groupTittle || '',
                    products: res.groupProductList || [],
                    followTips: res.followTips || '',
                    logistics,
                    priviceIndex,
                    privice,
                    startPrice: res.startingAmount || '',
                    copySourceIndex,
                    copyValue,
                     ///设置团长帮卖 
                    helpSoldIndex,
                    helpSold,
                    groupUserShowIndex,
                    groupUserShow,
                    introduces,
                    tagEnable
                })
            }
        }).catch(er => {
            console.log('获取开团信息失败=',er);
            
        })
    },

    /** 生命周期函数--监听页面加载 */
    onLoad: function (options) {
        this.getUserAvatarInfo()
        console.log(options);
        if (options.groupId) { //复制0，不传id  编辑1 
            GrpopUtils.removeLocalStore() //把之前的缓存清掉
            this.data.isEdit = (parseInt(options.isEdit) || 0) == 0 ? false : true
            this.data.isCreate = false
            this.data.groupId = options.groupId || ''
            this.showExistGroup()
        } else {
            this.setGroupTime()
        }
    },

    onUnload() {
        GrpopUtils.removeLocalStore() //把之前的缓存清掉
    },

    ///获取用户信息
    getUserAvatarInfo:function() {
        const userInfo = wx.getStorageSync(Constant.storageKey.userInfo_key)
        this.setData({userInfo})
    },

    ///设置时间
    setGroupTime:function(startT='', endT='') {
        const startRes = GrpopUtils.getSource(true)
        const endRes = GrpopUtils.getSource(false)
        
        this.setData({
            timeRange: startRes.range,
            startTime: startT ? startT : startRes.timeStr,
            startIndexs:startRes.selectIndex,

            endTime: endT ? endT : endRes.timeStr,
            endIndexs:endRes.selectIndex
        })
    },
    onGroupStartChange: function(e) {
        this.setData({
            startTime: e.detail.timeStr,
            startIndexs: e.detail.selects
        })
    },
    onGroupEndChange:function(e) {
        this.setData({
            endTime: e.detail.timeStr,
            endIndexs: e.detail.selects
        })
    },

    //拼接数据
    appendingDate:function(curDate) {
        return curDate.year+curDate.month+curDate.day+curDate.hour+curDate.minute+curDate.second
    },

    ///团购标题输入完成
    onFinishedInput:function(e) {
        this.setData({groupTittle: e.detail.value})
    },

    ///点击发布按钮
    onSelectFooterBtn:function() {
        GrpopUtils.submitGroupSource(this.data)
    },

    ///点击五个标签 //1-文字 2-小图 3-大图 4-视频 5-标签
    groupToolBarSelect: function (e) {
        const type = e.detail.index
        const source = GrpopUtils.addModules(type, [...this.data.introduces])
        if (type == 5 && this.data.tagEnable) {
            this.setData({introduces: source, tagEnable: false})
        } else {
            this.setData({introduces: source})
        }
    },

    /// ---- 文字操作完成 --- 
    onTextFinsehd: function(e) {
        const index = e.currentTarget.dataset.index
        const inputValue = e.detail.value
        const source = GrpopUtils.finishedToSave(index, inputValue, [...this.data.introduces])
        this.setData({introduces: source})
    },

    /// --- 小图操作完成 --
    onMinFinished: function(e) {
        const index = e.currentTarget.dataset.index
        const images = e.detail.images
        const source = GrpopUtils.finishedToSave(index, images, [...this.data.introduces])
        this.setData({introduces: source})
        console.log(index, '-', images);
    },

    /// --- 大图操作完成 --
    onLargeFinished: function(e) {
        const index = e.currentTarget.dataset.index
        const image = e.detail.largeImage
        const source = GrpopUtils.finishedToSave(index, image, [...this.data.introduces])
        this.setData({introduces: source})
        console.log(index, '-', image);
    },

    /// --- 视频操作完成 --
    onVideoFinished: function(e) {
        const index = e.currentTarget.dataset.index
        const videoUrl = e.detail.videoUrl
        const source = GrpopUtils.finishedToSave(index, videoUrl, [...this.data.introduces])
        this.setData({introduces: source})
        console.log(index, '-', videoUrl);
    },

    /// --- 标签操作完成 --
    onTagFinished: function(e) {
        const index = e.currentTarget.dataset.index
        const tags = e.detail.tags
        const source = GrpopUtils.finishedToSave(index, tags, [...this.data.introduces])
        this.setData({introduces: source})
        console.log(index, '-', tags);
    },

    onMoveUp:function(e) {
        const index = e.currentTarget.dataset.index
        const source = GrpopUtils.moveUpModule(index, [...this.data.introduces])
        this.setData({ introduces: source })
    },

    onMoveDwon:function(e) {
        const index = e.currentTarget.dataset.index
        const source = GrpopUtils.moveDownModule(index, [...this.data.introduces])
        this.setData({ introduces: source })
    },

    ///删除操作
    onDelete:function(e) {
        const index = e.currentTarget.dataset.index
        let deleteSource = this.data.introduces[index]
        const tagEnable = (deleteSource.type == 5) ? true : this.data.tagEnable
        const source = GrpopUtils.deleteModule(e.currentTarget.dataset.index, [...this.data.introduces])
        this.setData({ introduces: source , tagEnable}) 
    },
    ///选择物流
    onSelectLogistics:function(e) {
        const logisticsStr = encodeURIComponent(JSON.stringify(this.data.logistics))
        wx.navigateTo({
          url: `/pages/logistics/index?logistics=${logisticsStr}`,
        })
    },
    ///设置团优惠 这个版本先不做这个
    // settingDiscount:function() {
    //     wx.navigateTo({
    //       url: '/pages/groupdiscount/index',
    //     })
    // },

    ///设置团购隐私
    pickerPrivices:function(e) {
        const index = e.detail.index
        this.setData({priviceIndex: index, privice: this.data.groupPrivices[index]})
    },
    ///设置起购金额
    settingStartPrice:function(e) {
        const money = judge.inputMoney(e.detail.value)
        this.setData({startPrice: money})
    },
    
    /** 弹窗选择时候的逻辑
    onCancelStartPrice:function() {
        this.setData({showStartPrice: false})
    },
    onConfirmStartPrice:function(e) {
        console.log(e.detail.condition.value);
        this.setData({
            showStartPrice: false,
            startPrice: e.detail.amount,
            selectIndex: e.detail.condition.index
        })
    }, 
    */
    ///是否允许复制团购
    settingCopy:function(e) {
        const index = e.detail.index
        this.setData({copySourceIndex: index, copyValue: this.data.copySource[index]})
    },

    ///跟团人展示
    settingGroupUserShow:function(e) {
        const index = e.detail.index
        this.setData({groupUserShowIndex: index, groupUserShow: this.data.groupUserShowSource[index]})
    },
    ///设置团长帮卖
    settingGrouperHelpSold:function(e) {
        const index = e.detail.index
        this.setData({helpSoldIndex: index, helpSold: this.data.helpSoldSource[index]})
    },

    //设置跟团提醒
    followTipsFinished:function(e) {
        this.setData({followTips: e.detail.value})
    },

    //点击导入商品
    onAddProduct:function() {
        wx.navigateTo({
          url: '/pages/productlibrary/index',
        })
    },

    //删除商品
    onDeleteSelectProduct: function(e) {
        const index = e.currentTarget.dataset.index
        let products = [...this.data.products]
        products.splice(index, 1)
        this.setData({products})
    },

    //输入完成可购买数量
    onInputBuyNumber:function(e) {
        const value = e.detail.value
        const index = e.currentTarget.dataset.index
        let products = [...this.data.products]
        products[index].limitBuy  = value
        this.setData({ products: products}, console.log);
    },

    /** 生命周期函数--监听页面显示 */
    onShow: function () {
        const selectPros = GrpopUtils.getSelectProduct()
        const logistics = GrpopUtils.selectLogistics(this.data.logistics)
        let products = [...this.data.products]
        if (selectPros.length > 0) {
            //isEdit: 0-新增 1-编辑
            selectPros.forEach(el => el.isEdit = 0)
            if (products.length == 0) {
                products = selectPros
            } else {
                selectPros.forEach(el => products.push(el))
                    // const index = this.data.products.findIndex(item => el.id == item.id)
                    // if (index == -1) {
                    // }
                // })
            }
        }

        this.setData({
            products,
            logistics
        }, () => {
            wx.removeStorageSync(Constant.storageKey.group_select_products_key)
        })
    }
})