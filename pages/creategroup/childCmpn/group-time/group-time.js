// pages/creategroup/childCmpn/group-time/group-time.js

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        startTime: {
            type: String,
            value: ''
        },
        endTime: {
            type: String,
            value: ''
        },
        startIndexs: {
            type: Array,
            value: []
        },
        endIndexs: {
            type: Array,
            value: []
        },
        range: {
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
        onStartChanged:function(e) {
            this.triggerEvent('startchange', {selects: e.detail.selects, timeStr: e.detail.timeStr})
            // console.log("onStartChanged", );
        },
        onEndChanged:function(e) {
            this.triggerEvent('endchange', {selects: e.detail.selects, timeStr: e.detail.timeStr})
            // console.log("onEndChanged", {selects: e.detail.selects, timeStr: e.detail.timeStr});
        },
    }
})
