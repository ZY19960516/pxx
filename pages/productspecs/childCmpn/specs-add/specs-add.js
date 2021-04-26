// pages/productspecs/childCmpn/specs-add/specs-add.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        num: {
            type: Number,
            value: 2
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
        addSpecs:function() {
            this.triggerEvent('onSelect')
        }
    }
})
