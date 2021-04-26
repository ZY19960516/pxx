// components/product-input/product-input.js
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
        ///输入框类型 text number idcard  digit（带小数点的数字键盘）
        inputType: {
            type: String,
            value: 'text'
        },
        placeholder: {
            type: String,
            value: ''
        },
        textAlignRight: {
            type: Boolean, 
            value: false
        },
        disabled: {
            type: Boolean,
            value: false
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
            this.triggerEvent('onFinished', {value: e.detail.value})
        },
        onInPut(e) {
            this.triggerEvent('onInPut', {value: e.detail.value})
        }
    }
})
