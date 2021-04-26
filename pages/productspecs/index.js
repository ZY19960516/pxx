// pages/productspecs/index.js
const SpecsUtils = require('./utils/index')
const Toast = require('../../utils/Toast')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        specsSource: [],
        isChange: false,//记录上个页面传进来的数据被修改
        isHaveOldSource: false, //记录是不是上个页面有数据传进来
        showEditAlert: false,
        specsOldSource: {},
    },
    
    //添加规格
    addSpecs:function() {
        this.onShowAlert()
        let source = [...this.data.specsSource, ...SpecsUtils.defaultSpecs()]
        this.setData({specsSource: source})
    },
    //删除规格
    onDeleteSpecs:function(e) {
        if (this.data.specsSource.length > 1) {
            this.onShowAlert()
            const index = e.currentTarget.dataset.index
            let source = this.data.specsSource
            source.splice(index, 1)
            this.setData({specsSource: source})
        } else {
            Toast.showText('至少需要保留一个规格')
        }
    },

    productSpecs:function(e) {
        this.onShowAlert()
        const index = e.currentTarget.dataset.index
        const {details, title} = e.detail
        let source = [...this.data.specsSource]
        source[index].details = details
        source[index].specsTitle = title
        this.setData({specsSource: source})
    },

    ///添加规格完成
    onFinishedAdd:function() {
        const {specsSource, isHaveOldSource, isChange, specsOldSource} = this.data
        if (isHaveOldSource && !isChange) {//有修改
            SpecsUtils.nextToSpecsDetail(specsOldSource)            
        } else { //无修改
            SpecsUtils.judgmentProductSpecs(specsSource)
        }
    },

    onShowAlert:function() {
        const {isHaveOldSource, isChange} = this.data
        if (isHaveOldSource && !isChange) {
            this.setData({showEditAlert: true})
        }
    },

    onClose:function() {
        this.setData({showEditAlert: false, isChange:true})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { 
        const source = JSON.parse(decodeURIComponent(options.source)) 
        console.log(source, Object.keys(source));
        if (Object.keys(source).length > 0) { //有原来的数据
            let specsSource = SpecsUtils.setSpecsData(source)
            this.setData({
                specsSource: specsSource,
                specsOldSource: source,
                isHaveOldSource: true
            })
        } else { //新添加
            this.setData({
                specsSource: SpecsUtils.defaultSpecs()
            })
        }
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // SpecsUtils.editAlert()
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
})