// pages/addproduct/childCmpn/product-specs-input/product-specs-input.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        name: {
            type: String,
            value: ''
        },
        firstSpecs: {
            type:String,
            value: ''
        },
        secondSpecs: {
            type:String,
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
        addSpecs:function() {
            this.triggerEvent('add')
        },
        onInputFinished:function(e) {
            this.triggerEvent('finished', {value: e.detail.value})
        }
    }
})
