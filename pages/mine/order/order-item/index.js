const https = require('../../../../request/mine');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list:{
            type: Array, 
            value:[]
        }
    },
    options:{
        addGlobalClass:true
    },
    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        logisticsModal:false
    },
    created() {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toActiveity (e) {
            let dataset = e.currentTarget.dataset
            let groupInfoId = dataset.groupinfoid
            let groupInfoTittle = dataset.groupinfotittle
            wx.navigateTo({url:`/pages/groupDetail/index?id=${groupInfoId}&title=${groupInfoTittle}`})
        },
        addLogistics (e) {
            let orderNo = e.currentTarget.dataset.orderno
            wx.navigateTo({url:`/pages/mine/order/logisticsInfo/index?orderNo=${orderNo}`})
        },
        updateOrderAddress (e) {
            const orderinfo = encodeURIComponent(JSON.stringify(e.target.dataset.orderinfo))
            wx.navigateTo({url:`/pages/mine/order/updateOrderAddress/index?orderinfo=${orderinfo}`})
        },
        // 查看物流
        onCheckLogistics(e) {
            const item = e.currentTarget.dataset.item
            wx.navigateTo({
              url: `/pages/mine/wuLiu/index?lgcName=${item.logisticsName}&lgcNo=${item.logisticsNumber}`,
            })
        }
    }
})
