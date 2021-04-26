// pages/addproduct/childCmpn/top-tool-bar/top-tool-bar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type:String,
            value: ''
        },
        upEnable: {
            type: Boolean,
            value: true
        },
        dwonEnable: {
            type: Boolean,
            value: true
        },
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
        onMoveUp:function() {
            console.log('往上移动');
            this.triggerEvent('moveUp')
        },
        onMoveDwon:function() {
            console.log('往下移动');
            this.triggerEvent('moveDwon')
        },
        onDelete:function() {
            console.log('删除');
            this.triggerEvent('delete')
        },
    }
})
