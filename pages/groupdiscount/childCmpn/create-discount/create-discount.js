// pages/groupdiscount/childCmpn/create-discount/create-discount.js
const Toast= require('../../../../utils/Toast')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        discounts:{
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

    /**
     * 组件的方法列表
     */
    methods: {
        onCreateDiscount: function() {
            if (this.data.discounts.length < 5) {
                this.setData({ show: true })
            } else {
                Toast.showText('每个团活动最多创建5个满减优惠！')
            }
        },
        onselectCancel:function() {
            this.setData({ show: false })
        },
        onselectConfirm:function(e) {
            const discount = e.detail.discount
            const maxAmount = e.detail.maxAmount
            if (discount && maxAmount) {
                const params = {maxAmount, discount}
                const discounts = [...this.data.discounts, params]
                this.setData({
                    show: false,
                    discounts
                })
                this.triggerEvent('finishedcreate', {discounts})
            } else {
                Toast.showText('请完整填写满减金额')
            }
        }
    }
})
