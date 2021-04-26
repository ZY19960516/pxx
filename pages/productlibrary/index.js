// pages/productlibrary/index.js
const lsd = require('../../request/product')
const Toast = require('../../utils/Toast')
const LibraryUtils = require('./utils/index')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        categorys:[],
        page: 1,
        categoryId: '',
        products: [],
        isLast: false,
        isLoadMore: false,
        selectProducts: [] //选择好的商品
        ///保存所有分类获取到的商品
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCategorys()
    },

    ///获取分类
    getCategorys() {
        lsd.getProductCategoryList().then(res => {
            console.log(res);
            const allCg ={
                id: "",
                categoryName: "全部"
            }
            const categorys = [allCg, ...res]
            this.setData({categorys})
        })
    },
    ///获取分类下的产品
    getProductList() {
        const {page, categoryId} = this.data
        lsd.getProductList(page, categoryId).then(res => {
            const result = LibraryUtils.compareProduct(res.records, this.data.selectProducts)
            this.page = parseInt(res.current)
            this.setData({
                isLast: res.last,
                products: this.data.isLoadMore ? [...this.data.products, ...result] : result,
            })
            console.log('产品列表', res);
        })
    },

    //删除
    onDeleteProduct:function(e) {
        const proId = e.detail.proId
        Toast.showAlert('提示', '确认要删除当前商品吗', '取消', '确定', (res) => {
            if (res) {
                lsd.deleteProduct(proId).then(() => {
                    this.getProductList()
                })
            }
        })
    },

    //编辑
    onEditProduct:function(e) {
        const item = e.detail.item
        const categorys = this.data.categorys
        LibraryUtils.editProduct(item, categorys)
    },

    //选择
    onCheckSource: function(e) {
        const index = e.detail.index
        const res = LibraryUtils.checkProduct(this.data.products, this.data.selectProducts, index)
        console.log(res);
        this.setData({products: res.products, selectProducts: res.selectProducts})
    },

    //点击左边分类
    onSelectCategory: function(e) {
        const index = e.detail.index
        const categoryId =  this.data.categorys[index].id
        this.setData({page: 1, categoryId}, () => {
            this.getProductList()
        })
    },
    //点击添加商品
    onSelectAddProduct:function() {
        LibraryUtils.addProduct()

    },
    // 确认选择
    confirmSelected:function() {
        LibraryUtils.confirmSelected([...this.data.selectProducts])
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getProductList()
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