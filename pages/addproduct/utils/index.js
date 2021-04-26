const Toast = require('../../../utils/Toast')
const lsd = require('../../../request/product')
const Constant = require('../../../request/utils/constant')
const Judge = require('../../../utils/judge')

const TostMsg = {
    name: '请输入商品名称',
    price: '请输入商品价格',
    specs: '请设置商品规格',
    stock: '请输入商品库存',
    tag: '请选择商品标签',
    category: '请选择商品分类',
    des: '请输入商品描述',
    images: '请添加商品图片',
    oldPrice: '请输入商品价格'
}


module.exports = {
    
    uploadProduct: (data) => {
        const {categoryId, tagStr, specs, productSpecs, price, oldPrice, name, stock, proDes, productImgs, proId} = data 
        if (judege(name, TostMsg.name) &&
            judege(price, TostMsg.specs) && 
            judege(specs, TostMsg.specs) &&
            judege(stock, TostMsg.specs) && 
            judege(oldPrice, TostMsg.oldPrice) && 
            judeOldPrice(oldPrice) &&
            judege(tagStr, TostMsg.tag) && 
            judege(categoryId, TostMsg.category) && 
            judege(proDes, TostMsg.des) && 
            judege(productImgs, TostMsg.images)
        ) {
            console.log('满足条件可以提交');
            const manyRules = getManyRules(productSpecs)
            const params = {
                id: proId,
                categoryId, 
                crossedPrice: oldPrice,
                describeContext: proDes,
                isSingleRule: 0,
                label: tagStr,
                proImg: productImgs,
                proName: name,
                proPrice: price,
                stock,
                manyRules,
                oneRule: (productSpecs.specsTitles.length > 0) ? productSpecs.specsTitles[0].title : '',
                twoRule: (productSpecs.specsTitles.length > 1) ? productSpecs.specsTitles[1].title : ''
            }
            console.log(params);
            lsd.updateProduct(params).then(() => {
                ///删除本地缓存
                wx.removeStorageSync(Constant.storageKey.product_specs_key)
                wx.navigateBack()
            })
        }
    },

    appendingSpecs: (specsTitles) => {
        let specsStr = specsTitles.title + ':' + specsTitles.specsDetials.join(',')
        return specsStr
    }
}

const judege = (value, message) => {
    if (value && value.length == 0) {
        Toast.showText(message)
        return false
    }
    return true
}

const judeOldPrice = (price) => {
    if (Number(price) == 0) {
        Toast.showText("划线价格不能为0，且最多只能保留两小数")
        return false
    } else if (!Judge.isMoney(price)) {
        Toast.showText("划线价格格式错误，且最多只能保留两小数")
        return false
    }
    return true
}


const getManyRules = (productSpecs) => {
    const specsDetails = productSpecs.specsDetails
    var manyRules = []
    specsDetails.forEach(elm => {
        const rules = {
            price: elm.specsPrice,
            ruleImg: elm.image,
            ruleOneName: elm.specs1Value,
            ruleTwoName: elm.specs2Value,
            stock: elm.stock
        }
        manyRules.push(rules)
    });
    return manyRules
}


