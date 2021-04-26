// components/counter/counter.js
//增减数量的组件
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        num: {
            type: Number,
            value: 1
        },
        minNum: {
            type: Number,
            value: 0
        },
        limitNum: {
            type: Number,
            value: Number.MAX_SAFE_INTEGER
        },
        stock: {
            type: Number,
            value: Number.MAX_SAFE_INTEGER
        },
        extraData: {
            type: Object,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    observers: {
        'num': function (v) {
            this.changeNum(v, false)
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**通过input改变数值 */
        bindblur(e) {
            //通过输入框改变值，一定要强制更新num
            this.changeNum(e.detail.value, true)
        },

        changeNum(e, forceSet) {
            var tmp = this.data.num
            if (e.mark) { //通过点击加减改变数值
                if (e.mark.myMark == 1) { //+
                    tmp++
                } else { //-
                    tmp--
                }
            } else { //直接赋值
                tmp = parseInt(e || this.data.minNum)
            }

            if (this.isOverLimitNum(tmp)) {
                //设置限购数为当前选择的数量
                tmp = this.data.limitNum
            } else if (this.isOverStockNum(tmp)) {
                //设置库存数为当前选择的数量
                tmp = this.data.stock
            } else if (tmp < this.data.minNum) { //最小值判断
                tmp = this.data.minNum
                wx.showToast({
                    title: "最少购买" + this.data.minNum + "件",
                    icon: 'none'
                })
            }

            this.notifyNum(tmp, forceSet)
        },

        isOverLimitNum(num) {
            const limitNum = this.data.limitNum
            if (limitNum < num) {
                wx.showToast({
                    title: "该商品限购" + limitNum + "件",
                    icon: 'none'
                })
                return true
            }
            return false
        },

        isOverStockNum(num) {
            const stock = this.data.stock
            if (stock < num) {
                wx.showToast({
                    title: "购买数量超过当前库存量",
                    icon: 'none'
                })
                return true
            }
            return false
        },

        notifyNum(num, forceSet = false) {
            if (num != this.data.num || forceSet) {
                this.setData({
                    num
                })
                console.log("setNum>>>>>>>>>>>", num);
                //每次改变均传递最新值给父组件
                if (this.data.extraData) {
                    this.data.extraData.num = num
                    this.triggerEvent('OnNumResult', this.data.extraData)
                } else {
                    this.triggerEvent('OnNumResult', num)
                }
            }
        },

        //空函数，实现事件拦截，避免点击该组件时其父容器也响应点击事件
        interceptEvent() {}
    }
})