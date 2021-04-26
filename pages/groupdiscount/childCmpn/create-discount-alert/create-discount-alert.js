// pages/groupdiscount/childCmpn/create-discount-alert/create-discount-alert.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showAlert: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        maxAmount: '',
        discount: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onFinishedMaxAmount:function(e) {
            this.setData({maxAmount: e.detail.value})
        },
        onFinishedDiscountAmount:function(e) {
            this.setData({discount: e.detail.value})
        },
        onSelectCancel:function() {
            this.triggerEvent('cancel')
        },
        onSelectConfirm:function() {
            const maxAmount = this.data.maxAmount
            const discount = this.data.discount
            this.triggerEvent('confirm', {maxAmount, discount})
            this.setData({maxAmount: '', discount: ''})
        }
    }
})
