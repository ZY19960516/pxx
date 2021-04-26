// pages/creategroup/childCmpn/group-product/group-product.js
const Config = require('../../../../utils/config')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        product: {
            type: Object,
            value: {}
        },
        proIndex: {
            type: Number,
            value: 1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onDeleteProduct:function() {
            this.triggerEvent('delete')
        },

        selctNumberChange:function(e) {
            const value = e.detail.value
            this.triggerEvent('change', {value})
        }
    }
})
