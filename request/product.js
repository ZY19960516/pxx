const Constant = require('./utils/constant')
const lsd = require('./utils/request')

module.exports = {
    ///删除产品
    deleteProduct: (proId) => {
        return lsd.request('GET', Constant.requestURL.deleteProduct, {proId})
    },

    ///查询单个产品
    selectSingleProduct: (proId) => {
        return lsd.request('GET', Constant.requestURL.findSingleProduct, {proId})
    },

    ///产品列表
    getProductList: (page, categoryId) => {
        const params = {
            page: page.toString(), 
            size: "10",
            categoryId: categoryId || ''
        }
        return lsd.request('GET', Constant.requestURL.productList, params)
    },

    ///将开团产品导入产品库
    getProduct: (proIds) => {
        return lsd.request('GET', Constant.requestURL.importProductToLibarary, {proIds})
    },

    ///产品导入可选列表 type 1 从产品库导入开团 2从开团导入产品库
    getProduct: (categoryId, type) => {
        return lsd.request('GET', Constant.requestURL.importSelectList, {categoryId, type})
    },

    ///保存和修改用户的商品
    updateProduct: (params) => {
        return lsd.request('POST', Constant.requestURL.dupdateProduct, params)
    },

    /* ------------- 下面的是产品分类接口  ------------  */

    ///分类列表
    getProductCategoryList: () => {
        return lsd.request('GET', Constant.requestURL.productCategoryList)
    },
    ///删除分类
    deleteProductCategory: (categoryId) => {
        return lsd.request('GET', Constant.requestURL.deleteProductCategory, {id:categoryId})
    },
    ///保存和修改用户的商品分类
    updateProductCategory: (categoryName, id) => {
        return lsd.request('POST', Constant.requestURL.saveProductCategory, {id, categoryName})
    },
    ///置顶产品分类
    toppingProductCategory: (categoryId) => {
        return lsd.request('POST', Constant.requestURL.toppingProductCategory, {id: categoryId})
    }
}


