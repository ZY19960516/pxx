const Toast = require('../../../utils/Toast')
const Constant = require('../../../request/utils/constant')
const Judge = require('../../../utils/judge')

module.exports = {

    ///数据反显
    setSpecsData: (source) => {
        let titles = source.specsTitles || []
        let details = []
        titles.forEach(item => {
            details.push({
                specsTitle: item.title,
                details: item.specsDetials
            })
        })
        return details
    },

    ///添加具体标签 默认
    defaultSpecs: () => {
        return [{ details: [""], specsTitle: ''}]
    },

   

    ///多规格设置点击下一步
    judgmentProductSpecs: (specSource) => {
        const s1 = specSource[0]
        const details1 = filterArr(s1.details)
        if (judgeSpecs(s1.specsTitle, details1, 1)) {
            if (specSource.length > 1) { //有两个规格
                const s2 = specSource[1]
                const details2 = filterArr(s2.details)
                if (judgeSpecs(s2.specsTitle, details2, 2)) {
                    const source = getNextSource(s1.specsTitle, details1, s2.specsTitle, details2)
                    pushToSpecsDetial(source)
                }
            } else {//有一个规格
               const source = getNextSource(s1.specsTitle, details1, '', [])
               pushToSpecsDetial(source)
            }
        }
    },

    ///具体规格设置点击完成  specsSource 总的数据 要保存这个数据
    selectSpecsDetials: (source, specsSource,typeFlag) => {
        console.log(typeFlag,'typeFlagtypeFlag');
        let finished = true
        let prices = []
        let stocks = []

        for (let index = 0; index < source.length; index++) {
            const element = source[index];
            let specsPrice = Number(element.specsPrice)
            if (element.specsPrice.length == 0) {
                Toast.showText(`请填写具体规格${index+1}的价格,且价格最多可保留两位小数`)
                finished = false
                break
            } else {
                if (specsPrice == 0) {
                    Toast.showText(`具体规格${index+1}的价格必须大于0,且价格最多可保留两位小数`)
                    finished = false
                    break
                } else if (!Judge.isMoney(element.specsPrice)) {
                    Toast.showText(`具体规格${index+1}的价格格式错误, 且价格最多可保留两位小数`)
                    finished = false
                    break
                }
            } 
           
            if (element.stock.length == 0) {
                Toast.showText(`请填写具体规格${index+1}的库存`)
                finished = false
                break
            } else {
                if (!Judge.isInputNumber(element.stock)) {
                    Toast.showText(`具体规格${index+1}的库存只能填写数字`)
                    finished = false
                    break
                }
            }
            
            if (element.image.length == 0) {
                Toast.showText(`请添加具体规格${index+1}的图片`)
                finished = false
                break
            }
            prices.push(element.specsPrice) 
            stocks.push(Number(element.stock))
        }
        if (finished) {
            const priceArea = calculationPrice(prices)
            const stockMax = calculationStock(stocks)
            // console.log(priceArea, stockMax);
           
            let totalSource = {...specsSource}
            console.log(totalSource,specsSource,'totalSource');
            totalSource.specsDetails =  source
            totalSource.priceArea = priceArea
            totalSource.stockMax = stockMax
            totalSource.stockStr = `${specsSource.specsDetails.length}个规格，一共${stockMax}个`
            console.log('totalSource',totalSource);
            wx.setStorageSync(Constant.storageKey.product_specs_key, totalSource)
            if (typeFlag == 1) {
                wx.navigateBack({
                    delta: 2,
                })
            } else {
                wx.navigateBack({
                    delta: 1,
                })
            }
           
        }
    },

    nextToSpecsDetail: (source) => {
        pushToSpecsDetial(source)
    }
}

///跳转页面
const pushToSpecsDetial = (source) => {
    const specs = encodeURIComponent(JSON.stringify(source))
    wx.navigateTo({
        url: `/pages/productspecsdetail/index?source=${specs}&typeFlag=1`,
    })
}

///判断规格是否为空
const judgeSpecs = (title, details, index) => {
    ///判断规格标题
    if (title.length == 0) {
        Toast.showText(`请输入规格${index}标题`)
        return false
    }
    ///判断具体规格
    if (details.length == 0) {
        Toast.showText(`请输入规格${index}的至少一个具体规格`)
        return false
    }
    return true
}

const filterArr = (arr) => {
    return arr.filter(word => word.length > 0)
}

///进入详情前数据处理
const getNextSource = (title1, source1, title2,  source2) => {
    var detialSource = []
    var specsTitles = []
    if (source2.length == 0) {
        source1.forEach(v1 => {
            const item = {
                specsTitle1: title1,
                specs1Value: v1,
                specsTitle2: '',
                specs2Value: '',
                specsPrice: '',
                stock: '',
                image: '',
                id: ''
            }
            detialSource.push(item)
        })
        ///保存规格
        specsTitles = [{
            title: title1,//保存的规格的名称
            specsDetials: source1 //保存的具体规格的名称
        }]
    } else {
        source1.forEach(v1 => {
            source2.forEach(v2 => {
                const item = {
                    specsTitle1: title1,
                    specs1Value: v1,
                    specsTitle2: title2,
                    specs2Value: v2,
                    specsPrice: '',
                    stock: '',
                    image: '',
                    id: ''
                }
                detialSource.push(item)
            })
        })
        ///保存规格
        specsTitles =  [{
            title: title1,//保存的规格的名称
            specsDetials: source1 //保存的具体规格的名称
        }, {
            title: title2,//保存的规格的名称
            specsDetials: source2 //保存的具体规格的名称
        }]
    }
    return  {
        specsTitles,
        priceArea: '', //价格区间
        stockMax: '', //库存最大值
        specsDetails: detialSource,
        stockStr: ''
    }
}

///计算价格区间
const calculationPrice = (prices) => {
    let res = prices.sort((a, b) => { //升序排序
        return a - b
    })
    let minPrice = res[0]
    let maxPrice = res[res.length-1]
    console.log('minPrice=',minPrice, 'maxPrice=', maxPrice);
    if (minPrice == maxPrice) {
        return maxPrice
    } else {
        return `${minPrice}-${maxPrice}`
    }
}

//计算库存
const calculationStock = (stocks) => {  
    return stocks.reduce((a, b) => a + b)
}

