
// pages/productspecs/childCmpn/productspecs/productspecs.js

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        
        index: {
            type: Number, 
            value: 1
        },
        details: {
            type: Array,
            value: []
        },
        specsTitle: {
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
        //删除规格
        onDelete:function() {
            this.triggerEvent('onDelete')
        },

        titleFinished: function(e) {
            let value = e.detail.value
            this.setData({specsTitle: value})
            this.triggerEvent('finishe', {details: this.data.details, title: this.data.specsTitle})
        },

        onDetailSpec:function(e) {
            let specsDetails = e.detail.specsDetails
            this.setData({details: specsDetails})
            this.triggerEvent('finishe', {details: specsDetails, title: this.data.specsTitle})
        }
    }
})
