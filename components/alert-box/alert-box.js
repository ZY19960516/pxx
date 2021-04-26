// components/alert-box/alert-box.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show:{
            type: Boolean,
            value: false
        },
        title: {
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
        onClose:function() {
            this.triggerEvent('onClose')
        },

        onConfirm:function() {
            this.triggerEvent('onConfirm')
        }
    }
})
