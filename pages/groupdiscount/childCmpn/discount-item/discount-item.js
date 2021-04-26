// pages/groupdiscount/childCmpn/discount-item/discount-item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        discount: {
            type: Object,
            value: {}
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
        onDeleteItem:function() {
            this.triggerEvent('delete')
        }
    }
})
