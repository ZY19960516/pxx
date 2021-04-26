// pages/productspecsdetail/index.js

const SpecsUtils = require('../productspecs/utils/index')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        specsSource: {},
        sepcsDetails: []
    },

    onFinishedAdd:function() {
        SpecsUtils.selectSpecsDetials(this.data.sepcsDetails, this.data.specsSource,this.typeFlag)
    },

    finishedInput:function(e) {
        const index = e.currentTarget.dataset.index
        const source = e.detail.source
        let detials = [...this.data.sepcsDetails]
        detials[index] = source
        this.setData({sepcsDetails: detials})
        console.log(index, source);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const source = JSON.parse(decodeURIComponent(options.source)) 
        this.typeFlag =  options.typeFlag
        this.setData({
            specsSource:source,
            sepcsDetails: source.specsDetails
        })
    },


    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
})