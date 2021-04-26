// components/no-data/no-data.js
const Constant = require('../../request/utils/constant')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        message: {
            type: String,
            value: Constant.judementIsLogin() ? '暂无开团记录' : '暂未登录'
        },
        showBtn: {
            type: Boolean,
            value: true
        },
        btnText: {
            type: String,
            value: Constant.judementIsLogin() ? '去开个团' : '去登录'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onSelectCreateGroup() {
            wx.switchTab({
                url: '/pages/group/index'
            })
        }
    }
})