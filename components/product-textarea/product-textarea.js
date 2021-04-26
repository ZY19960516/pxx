// components/product-textarea/product-textarea.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type:String,
            value: ''
        },
        value: {
            type: String,
            value: ''
        },
        
        maxlength: {
            type: Number,
            value: 140
        },
        placeholder: {
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
        onFinished:function(e) {
            this.triggerEvent('onFinsehd',{value: e.detail.value})
        }
    }
})
