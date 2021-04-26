// pages/createaddress/address-input/address-input.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type:String,
            value: ''
        },
        value: {
            type:String,
            value: ''
        },
        placeholder: {
            type:String,
            value: ''
        },
        //1-input 2-textarea 3-selectArea
        type: {
            type: Number,
            value: 1
        },
        inputType: {
            type:String,
            value: 'text'
        },
        maxLength: {
            type: Number,
            value: 300
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selectRegion: []
    },

    /**
     * 组件的方法列表
     */
    methods: {

        onFinishedInput:function(e) {
            this.triggerEvent('finishedInput', {value: e.detail.value})
        },

        onSelectedRegion:function(e) {
            const regionArr = e.detail.value
            this.setData({selectRegion: regionArr})
            this.triggerEvent('finishedRegion', {region: regionArr})
        }
    }
})
