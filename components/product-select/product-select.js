// components/product-select/product-select.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type:String,
            value: ''
        },
        placeholder: {
            type: String,
            value: ''
        },
        selectValue: {
            type: String,
            value: ''
        },
        ///值文字是否靠右
        textAlignRight: {
            type: Boolean, 
            value: false
        },
        // 一下三个为点击弹出picker选择框的时候有效
        isPicker: {
            type:Boolean,
            value:false
        },
        selectSource: {
            type: Array,
            value: []
        },
        selectIndex: {
            type: Number,
            value: 0
        },
        rangeKey: {
            type: String,
            value: ''
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
        onSelect:function() {
            this.triggerEvent('onSelect')
        },

        //picker选择
        onSelectChange:function(e) {
            this.triggerEvent('onSelectChange', {index: e.detail.value})
        }
    }
})
