Component({
    /**
     * 组件的属性列表
     */
    properties: {
        followList:{
            type: Array, 
            value:[]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
    },
    created() {
    },
    options:{
        addGlobalClass:true
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
            console.log(e.currentTarget.dataset.orderNo);
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
