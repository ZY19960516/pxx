// pages/logistics/childCmpn/logistics-header/logistics-header.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type:String,
            value: ''
        },
        selected: {
            type: Boolean,
            value:false
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
            this.triggerEvent('select', {selected: true})
        }
    }
})
