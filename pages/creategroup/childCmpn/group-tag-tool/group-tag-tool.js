// pages/creategroup/childCmpn/group-tag-tool/group-tag-tool.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tags:{
            type:Array,
            value:[]
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
        show: false,
        selectCount: 5
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelectDelete:function(e) {
            const index = e.currentTarget.dataset.index
            let tags = [...this.data.tags]
            tags.splice(index, 1)
            this.setData({tags})   
            this.triggerEvent('finished', {tags})       
        },
        onSelectAddTag:function() {
            this.setData({show: true})
        },

        onTagConfirm:function(e) {
            this.setData({show: false})
            const tags = e.detail.selectTags
            this.setData({tags})
            console.log('添加的标签=',tags);
            this.triggerEvent('finished', {tags})
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
