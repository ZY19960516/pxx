// components/footer-add-button/footer-add-button.js
Component({
    /**
     * 组件的属性列表 父元素设置 padding-bottom: 150rpx;
     */
    properties: {
        title:{
            type: String, 
            value: '确认添加'
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
        onSelectAdd:function() {
            this.triggerEvent('onSelect')
        }
    }
})
