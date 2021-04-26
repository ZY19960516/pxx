//w物流信息
import { copyMsgToClipboard } from "../../../../utils/util";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        //收货人地址
        receiptAddress:{
            type: String,
            value: ''
        },
        // 收货人区域
        receiptArea: {
            type: String,
            value: ''
        },
        // 收货人城市
        receiptCity: {
            type: String,
            value: ''
        },
        // 收货人省份
        receiptProvince: {
            type: String,
            value: ''
        },
        //收货人电话
        receiptPhone:{
            type: String,
            value: ''
        },
        // 收货人姓名
        receiptName:{
            type: String,
            value: ''
        },
        // 是否展示查看物流按钮
        showCheckWuliu:{
            type: Boolean,
            value: false
        },
    },
    options:{
        addGlobalClass:true
    },
    /**
     * 组件的初始数据
     */
    data: {

    },
    created () {
        console.log(this.receiptName,'receiptNamereceiptNamereceiptNamereceiptName');
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击复制
        onSelectCopyNumber() {
            let copyData = this.data.receiptName +
            this.data.receiptPhone + this.data.receiptProvince + this.data.receiptCity + this.data.receiptArea + this.data.receiptAddress
            copyMsgToClipboard(copyData || '')
        },
        makePhone () {
            wx.makePhoneCall({
                phoneNumber: this.data.receiptPhone //仅为示例，并非真实的电话号码
            })
        },
        onChcekWuliu() {
            this.triggerEvent('check')
        }
    }
})
