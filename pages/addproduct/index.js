// pages/addproduct/index.js
const ProductUtils = require('./utils/index')
const Constant = require('../../request/utils/constant')
const lsd = require('../../request/product')
const Judge = require('../../utils/judge')
Page({

    /** 页面的初始数据*/
    data: {
        showTag:false, ///是否展示选择标签
        categorys: [],
        categoryIndex: 0,//默认选中的分类
        categoryTitle: '',//分类标题
        categoryId: '',//分类Id
        tagSource:[],
        tagStr: '',
        specs: '',
        secondSpecs: '',
        productSpecs: {},
        price: '', //价格
        oldPrice: '',//划线价格
        name: '',//商品名字
        stock: '',//库存 
        stockStr: '',
        proDes:'',//商品描述
        productImgs: [], //商品图片
        proId: '', //产品id
        onLoadFlag:false,
        source:{}
    },

    ///名称填写完成
    onNameFinished:function(e) {
        this.setData({name: e.detail.value}, () => {
            console.log('onNameFinished=',e.detail.value);
            
        })
    },

    ///划线价格
    onOldPriceFinished:function(e) {
        const money = Judge.inputMoney(e.detail.value)
        this.setData({oldPrice: money})
    },

    closeAlert:function() {
        this.setData({showTag: false })
    },

    ///点击添加规格
    onSelectGuige:function() {
        const productSpecs = {...this.data.productSpecs}
        const specs = encodeURIComponent(JSON.stringify(productSpecs))
        wx.navigateTo({
          url: `/pages/productspecs/index?source=${specs}`,
        })
    },

    ///库存
    onSpecsDetial:function() {
        const productSpecs = {...this.data.productSpecs}
        const specs = encodeURIComponent(JSON.stringify(productSpecs))
        wx.navigateTo({
            url: `/pages/productspecsdetail/index?source=${specs}`,
        })
    },


    ///选择分类
    pickerChanged:function(e) {        
        const index = e.detail.index
        const category = this.data.categorys[index]
        this.setData({categoryTitle: category.categoryName, categoryId: category.id})
    },

    ///点击添加标签
    onSelectTags:function() {
        this.setData({ showTag: true})
    },

    ///添加完标签
    finishedSelectTags:function(e) {
        let tags = e.detail.selectTags
        this.setData({
            showTag: false,
            tagSource: tags,
            tagStr: tags.join(',')
        })
    },

    ///商品描述
    onFinshedDes: function(e) {
        this.setData({ proDes: e.detail.value})
    },


    ///选择完图片
    onSelectImage:function(e) {
        const imageUrl = e.detail.imageUrl
        let images = [...this.data.productImgs, imageUrl]
        console.log(images,'images');
        this.setData({productImgs: images})
    },

    ///删除图片
    onDeleteImage:function(e) {
        let imageSource = [...this.data.productImgs]
        imageSource.splice(e.detail.index, 1)
        this.setData({productImgs:imageSource})
    },

    ///底部添加
    onSelectAdd:function() {
        ProductUtils.uploadProduct({...this.data})
    },
     ///获取分类
    getCategorys() {
        lsd.getProductCategoryList().then(res => {
            console.log(res);
            this.setData({categorys: res})
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.onLoadFlag = true
        wx.removeStorageSync(Constant.storageKey.product_specs_key)

        wx.setNavigationBarTitle({
          title: options.type == 1 ? '添加商品' : '修改商品',
        })
        if (options.type == 1) {
            this.getCategorys()
        } else {
            if (options.source) {//修改商品
                this.data.source = JSON.parse(decodeURIComponent(options.source)) 
                this.eidtToSaveData(this.data.source) 
            }
        } 
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //如果从外面进来用外面的值 返回的话用存的值  没有走onload的话用本地的值 走了用onload
        const proSpecs = Constant.storageKey.product_specs_key && wx.getStorageSync(Constant.storageKey.product_specs_key)
        if (proSpecs && !this.data.onLoadFlag) { //有设置的规格
            console.log('设置的规格', proSpecs);
            let specsStr = ProductUtils.appendingSpecs(proSpecs.specsTitles[0])
            let secondSpecs = ''
            if (proSpecs.specsTitles.length == 2) {
                secondSpecs = ProductUtils.appendingSpecs(proSpecs.specsTitles[1])
            }
            this.setData({
                stock: proSpecs.stockMax,
                stockStr: proSpecs.stockStr,
                price: proSpecs.priceArea,
                productSpecs: proSpecs,
                specs: specsStr,
                secondSpecs,
            })
        } else if (!proSpecs && !this.data.onLoadFlag){
        } else if (JSON.stringify(this.data.source) != "{}"){
            this.eidtToSaveData(this.data.source) 
        }
        this.data.onLoadFlag = false
    },

    eidtToSaveData:function(source) {
        const {name, oldPrice, stock,stockStr, proDes, productImgs, tagStr, tagSource, price, productSpecs, secondSpecs, specs, categoryId, categoryTitle, categoryIndex, categorys, proId} = source
        this.setData({
            name, oldPrice, stock, proDes, productImgs, tagStr, tagSource, price, productSpecs, secondSpecs, specs, categoryId, categoryTitle, categoryIndex, categorys , stockStr, proId
        })
    }
})