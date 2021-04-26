// components/alert-center-box/alert-center-box.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show:{
            type: Boolean,
            value: false
        },
        cancelTitle: {
            type: String,
            value: '取消'
        },
        confirmTitle: {
            type: String,
            value: '确定'
        },
        isSingleBtn: {
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
        move:function() {},
        
        onSelectCaancel:function() {
            this.triggerEvent('cancel')
        },
        onSelectConfirm:function() {
            this.triggerEvent('confirm')
        }
    }
})
