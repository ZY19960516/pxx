// pages/productlibrary/childs/product-add-left/product-add-left.js
const Config = require('../../../../utils/config')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        categorys: {
            type: Array,
            value: []
        },
        selectIndex: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        categorys: Config.categorys
    },

    /**
     * 组件的方法列表
     */
    methods: {
        selectItem:function(e) {
            let index = e.currentTarget.dataset.index
            this.setData({selectIndex: index })
            this.triggerEvent('select', {index})
        }
    }
})
