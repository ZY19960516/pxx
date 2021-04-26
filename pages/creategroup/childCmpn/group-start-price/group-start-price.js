// pages/creategroup/childCmpn/group-start-price/group-start-price.js
const Config = require('../../../../utils/config')
const Toast= require('../../../../utils/Toast')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showAlert: {
            type: Boolean,
            value: false
        },
        selectIndex: {
            type: Number,
            value: 0
        },
        startPrice: {
            type:String,
            value:'0'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        ///起购条件
        conditions: Config.groupStartPrice
    },

    /**
     * 组件的方法列表
     */
    methods: {

        onfinisehd:function(e) {
            this.setData({startPrice: e.detail.value})
        },

        onSelectCondition:function(e) {
            const index = e.currentTarget.dataset.index
            this.setData({selectIndex: index})
        },

        onSelectCancel:function() {
            this.triggerEvent('cancel')
        },
        onSelectConfirm:function() {
            const price = this.data.startPrice
            if (price) {
                const index = this.data.selectIndex
                const value = this.data.conditions[index]
                this.triggerEvent('confirm', {
                    amount: price,
                    condition: {
                        index,
                        value
                    }
                })
            } else {
                Toast.showText('请输入起购金额')
            }
        }
    }
})
