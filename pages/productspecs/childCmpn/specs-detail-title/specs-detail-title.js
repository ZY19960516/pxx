// pages/productspecs/childCmpn/specs-detail-title/specs-detail-title.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        specsDetails: {
            type: Array,
            value: []
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
            let source = [...this.data.specsDetails, ""]
            this.setData({ specsDetails: source })
        },

        deleteSpec:function(e) {
            const index = e.currentTarget.dataset.index
            let source = [...this.data.specsDetails]
            if (source.length == 1) {
                source[0] = ""
            } else {
                source.splice(index, 1)
            }
            this.onchanged(source)
        },

        onFinisehd: function(e) {
            const value = e.detail.value
            const index = e.currentTarget.dataset.index
            let source = [...this.data.specsDetails]
            source[index] = value
            this.onchanged(source)
        },

        onchanged:function(source) {
            this.setData({ specsDetails: source })
            this.triggerEvent('change', {specsDetails: source})
        }
    }
})
