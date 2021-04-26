// components/product-tag-alert/product-tag-alert.js
const Config = require('../../utils/config')
const Toast = require('../../utils/Toast')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show:{
            type: Boolean,
            value: true
        },
        ///选择几个
        selectCount: {
            type: Number,
            value:2
        },
        selectTags: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        tags: Config.productTags
        // count: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onClose:function() {
            this.triggerEvent('onClose')
        },

        ///点击确认
        onConfirm:function() {
            const selectTags = this.data.selectTags
            if (selectTags.length > 0) {
                this.triggerEvent('onConfirm', {selectTags: this.data.selectTags})
            }
        },

        onSelect:function(e) {
            const index = e.currentTarget.dataset.index
            let selectTags = this.data.selectTags
            selectTags.splice(index, 1)

             this.setData({
                 selectTags
                //  count: selectTags.length
             })
        },

        onSelectTag:function(e) {
            const tags = this.data.selectTags
            if (tags.length >= this.data.selectCount) {
                Toast.showText(`最多可以添加${this.data.selectCount}个标签`)
            } else {
                const tag = e.currentTarget.dataset.item
                const selectTags =  [...this.data.selectTags, tag]
                this.setData({
                    selectTags
                    // count: selectTags.length
                })
            }
        }
    }
})
