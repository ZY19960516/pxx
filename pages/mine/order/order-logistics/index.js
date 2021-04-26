import { copyMsgToClipboard } from "../../../../utils/util";


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        logisticsNumber:{
            type: String, 
            value:''
        },
        logisticsName:{
            type: String, 
            value:''
        },
        orderNo:{
            type: String, 
            value:''
        },
        showEdit: {
            type:Boolean,
            value: false
        }
    },
    options:{
        addGlobalClass:true
    },
    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        logisticsNumber:'',
        logisticsName:''
    },
    created() {
        // this.setData({
        //     logisticsName:this.logisticsName,
        //     logisticsNumber:this.logisticsNumber,
        // })
        // console.log(this.list,'list');
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toActiveity (e) {
            console.log(e.currentTarget.dataset.groupinfoid);
        },
        onSelectCopyNumber() {
            let copyData = this.data.logisticsNumber + this.data.logisticsName
            copyMsgToClipboard(copyData || '')
        },
        editLogistics () {
            wx.navigateTo({url:`/pages/mine/order/logisticsInfo/index?orderNo=${this.data.orderNo}&logisticsNumber=${this.data.logisticsNumber}&logisticsName=${this.data.logisticsName}`})
        }
    }
})
