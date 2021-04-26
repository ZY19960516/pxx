// pages/logistics/index.js 物流
const ConfigUtils = require('../../utils/config')
const groupLogistics = ConfigUtils.groupLogistics
const Constant = require('../../request/utils/constant')
const Toast = require('../../utils/Toast')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataSource: [],
        logistics: {},
        addressIds: []
    },

    getDefault:function() {
        return [   
            {name: groupLogistics[0].name, type: groupLogistics[0].type, itemTitle: '', value : '', selected: true}
            // {name: groupLogistics[1].name, type: groupLogistics[1].type,  itemTitle: '设置自提点', value : '', selected: false},
            // {name: groupLogistics[2].name, type: groupLogistics[2].type,  itemTitle: '', value : '', selected: false}
        ]
    },

    onSelectToSet:function(e) {
        const addressIdstr = encodeURIComponent(JSON.stringify(this.data.addressIds))
        wx.navigateTo({
         url: `/pages/address/index?type=2&select=true&addressIds=${addressIdstr}`,
        })
    },
    
    onStatusChange:function(e) {
        console.log(e);
        const index = e.currentTarget.dataset.index
        let source = this.changeSourceSelect(index, [...this.data.dataSource])
        this.setData({
            dataSource:source,
            logistics: source[index]
        })
    },

    onSelectFinished:function() {
        const logistics = this.data.logistics
        let addressIds = [...this.data.addressIds]
        if (logistics.type == 2) { //选择结束清除选择的自提点id
            if (addressIds.length == 0) {
                Toast.showText('请设置自提点')
                return
            }
            wx.removeStorageSync(Constant.storageKey.group_select_address_id_key)
        } else { //自提 需要返回地址id,不是自提的就把地址置空
            addressIds = []
        } 
        ///保存物流方式
        wx.setStorageSync(Constant.storageKey.group_select_logistics_key, {
            type: logistics.type,
            name: logistics.name,
            addressIds,
        })
        wx.navigateBack()
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let defaultSource = this.getDefault()
        const source = JSON.parse(decodeURIComponent(options.logistics)) 
        let dataSource = this.changeSourceSelect(source.type-1, defaultSource)
        if (source.addressIds && source.addressIds.length > 0) {
            dataSource = this.changeAddress(source.addressIds, dataSource)
        }
        this.setData({
            dataSource,
            addressIds: source.addressIds,
            logistics: dataSource[source.type-1]
        })
    },

    ///改变选中状态
    changeSourceSelect:function(index, source) {
        source.forEach((item, indey) => {
            if (indey == index) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
        return source
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const addressIds = wx.getStorageSync(Constant.storageKey.group_select_address_id_key)
        if (addressIds && addressIds.length > 0) {
            let dataSource = this.changeAddress(addressIds, [...this.data.dataSource])
            this.setData({addressIds, dataSource})
        }
    },

    ///设置自提点的展示
    changeAddress:function(addressIds, dataSource) {
        let logistics = dataSource[1] ///取出自提点
        logistics.value = `${addressIds.length}个自提点`
        dataSource.splice(1,1, logistics)
        return dataSource
    }
})