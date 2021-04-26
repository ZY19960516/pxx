// pages/creategroup/childCmpn/group-tool-bar/group-tool-bar.js
const Toast = require('../../../../utils/Toast')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tagEnable: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        dataSource: [
            {
                title: '文字',
                image: '/assets/images/group/group_text.png',
                enable: true
            },
            {
                title: '小图',
                image: '/assets/images/group/group_min_picture.png',
                enable: true
            },
            {
                title: '大图',
                image: '/assets/images/group/group_picture.png',
                enable: true
            },
            {
                title: '视频',
                image: '/assets/images/group/group_video.png',
                enable: true
            },
            {
                title: '标签',
                image: '/assets/images/group/group_tag.png',
                enable: true
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelect:function(e) {
            const index = e.currentTarget.dataset.index + 1
           //1-文字 2-小图 3-大图 4-视频 5-标签
           if (index === 5 && !this.data.tagEnable) {
                Toast.showText('标签模块最多只能有一个')
                return
           }
           console.log('index表示：1-文字 2-小图 3-大图 4-视频 5-标签');
           this.triggerEvent('onSelect', {index})
        }
    }
})
