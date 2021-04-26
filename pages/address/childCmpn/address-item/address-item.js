// pages/address/childCmpn/address-item/address-item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 表示是否是选 收货地址
        isUserAddress: {
            type: Boolean,
            value: false
        },

        dataSource: {
            type: Object,
            value: {}
        },
        ///当选择提货地址的时候传值
        selectAddress: {
            type: Boolean,
            value: false
        },
         ///是否选中
        selected: {
            type:Boolean,
            value: false
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
        onSetGouper:function() {
            this.triggerEvent('setgrouper')
        },
        onDelete:function() {
            this.triggerEvent('delete')
        },
        onEdit:function() {
            this.triggerEvent('edit')
        },
        ///当选择提货地址的时候生效
        onSelectAddress:function() {
            if (this.data.selectAddress) {
                const isSelect = !this.data.selected
                this.setData({selected: isSelect})
                this.triggerEvent('select', {isSelect})
            }
        }
    }
})
