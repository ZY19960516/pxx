// pages/creategroup/childCmpn/input-tool/input-tool.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        upEnable: {
            type: Boolean,
            value: true
        },
        dwonEnable: {
            type: Boolean,
            value: true
        },
        value: {
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
        onFinished:function(e) {
            this.triggerEvent('finished', {value: e.detail.value})
        },
        noMoveUp: function() {
            this.triggerEvent('up')
        },
        onMoveDwon: function() {
            this.triggerEvent('down')
        },
        onDelete: function() {
            this.triggerEvent('delete')
        }
    }
})
