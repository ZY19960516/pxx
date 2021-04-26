// pages/groupdiscount/childCmpn/create-discount/create-discount.js
// const Toast= require('../../../../utils/Toast')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list:{
            type: Array, 
            value:[]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
    },
    created() {
        console.log(this.list,'list');
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toActiveity (e) {
            console.log(e.currentTarget.dataset.groupinfoid)
        },
        check(e) {
            // console.log(e.currentTarget.dataset.verificationno);
            this.triggerEvent('emit',e.currentTarget.dataset.verificationno)
            // console.log(e.currentTarget.dataset.orderNo)
        },
        checkBox() {
            
        },
    }
})
