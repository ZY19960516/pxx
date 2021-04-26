const Toast = require("../../../utils/Toast")
const Constant = require('../../../request/utils/constant')
module.exports = {

    //选择 可能是选中，也有可能是取消
    checkProduct:(products, selectProducts, index) => {
        let item = products[index]
        if (item.isCheck == true) {
            item.isCheck = false
            let indey = selectProducts.findIndex(el => el.id == item.id) 
            selectProducts.splice(indey, 1)
        } else {
            item.isCheck = true
            selectProducts.push(item)
        }
        return {
            selectProducts,
            products
        }
    },

    compareProduct: (records, selectProducts) => {
        let result = []
        records.forEach(element => {
            result.push({
                ...element,
                isCheck: false
            })
        });
        if (selectProducts.length > 0) {
            result.forEach(item => {
                selectProducts.forEach((el, index) => {
                    if (item.id == el.id) {
                        item.isCheck = true
                        selectProducts.splice(index, 1, item)
                    }
                })
            })
        }
        return result
    },

    addProduct: () => {
        pushToCreateProduct(1, null)
    },
    
    editProduct: (item, categorys) => {
       let params = dealWithEditData(item, categorys)
       console.log('editProduct', params);
       const product = encodeURIComponent(JSON.stringify(params))
       pushToCreateProduct(2, product)
    },

    confirmSelected: (source) => {
        if (source.length == 0) {
            Toast.showText('您还未选择商品')
            return
        }
        wx.setStorageSync(Constant.storageKey.group_select_products_key, source)
        wx.navigateBack()
    }
}

///处理产品编辑反显数据
const dealWithEditData = (dataSource, categorys) => {
    console.log('dealWithEditData',dataSource);
    const productSpecs = getSpecs(dataSource)
    const productCategory = getCategory(dataSource.categoryId, categorys)
    const product = {
        oldPrice: dataSource.crossedPrice || '',//划线价格
        name: dataSource.proName || '',//商品名字
        proDes: dataSource.describeContext || '',//商品描述
        productImgs: dataSource.proImg || [],
        tagStr: dataSource.label || '', //商品图片
        stock: dataSource.stock || '',
        stockStr:dataSource.stockStr || '',
        price: dataSource.proPrice || '',
        productSpecs,
        specs: (dataSource.oneRule.length > 0 && dataSource.oneRuleContext.length > 0) ? `${dataSource.oneRule}：${dataSource.oneRuleContext}` : '',
        secondSpecs: (dataSource.twoRule.length > 0 && dataSource.twoRuleContext.length > 0) ? `${dataSource.twoRule}：${dataSource.twoRuleContext}` : '',
        tagStr: dataSource.label || '',
        tagSource: dataSource.label.split(','),
        proId: dataSource.id
    }
    return {...product, ...productCategory}
}

const getCategory = (categoryId, categorys)  => {
    let categoryTitle = ''
    let categoryIndex = 0
    const index = categorys.findIndex(item => item.id == categoryId)
    if (index != -1) {
        categoryTitle = categorys[index].categoryName
        categoryIndex = index
    }
    return {
        categoryTitle,
        categoryId,
        categorys,
        categoryIndex
    }
}


//转换成规格数据
const getSpecs = (source) => {
    const specsTitles = getSpecsTitles(source)
    const specsDetails = getSpecsDetials(source)
    return {
        specsTitles,
        specsDetails,
        priceArea: source.proPrice || '',
        stockMax: source.stock || '',
    }
}

///处理规格数据
const getSpecsTitles = (source) => {
    let specsTitles = []
    if (source.oneRule && source.oneRule.length > 0) {
        specsTitles.push({
            title:  source.oneRule,
            specsDetials: source.oneRuleContext.split(',')
        })
    }
    if (source.twoRule && source.twoRule.length > 0) {
        specsTitles.push({
            title:  source.twoRule,
            specsDetials: source.twoRuleContext.split(',')
        })
    }
   return specsTitles
}

///处理具体规格数据
const getSpecsDetials = (source) => {
    let specsTitles = []
    const manyRules = source.manyRules
    manyRules.forEach(element => {
        specsTitles.push({
            id: element.id || '',
            specsPrice: element.price || '',
            image: element.ruleImg || '',
            stock: element.stock || '',
            specsTitle1: source.oneRule || '',
            specs1Value: element.ruleOneName || '',
            specsTitle2: source.twoRule || '',
            specs2Value: element.ruleTwoName || ''
        })
    });
    return specsTitles
}

///跳转页面 type == 1 ? '添加商品' : '修改商品'
const pushToCreateProduct = (type, params) => {
    wx.navigateTo({
        url: `/pages/addproduct/index?type=${type}&source=${params}`
    })
}
