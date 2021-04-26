// pages/productlibrary/childs/product-add-right/product-add-right.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showNoMore: {
            type:Boolean,
            value: false
        },
        source: {
            type: Array,
            value: []
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
    
        onCehckProduct:function(e) {
            const index = e.currentTarget.dataset.index
            this.triggerEvent('check', {index})
        },
        editProduct: function(e) {
            const item = e.currentTarget.dataset.item
            this.triggerEvent('source', {item})
        },
        deleteProduct:function(e) {
            const item = e.currentTarget.dataset.item
            this.triggerEvent('delete', {proId: item.id})
        },


    }
})
