const Toast = require('../../../utils/Toast')
const Constant = require('../../../request/utils/constant')
const TimePickerSource = require('../../../utils/timepicker')
const lsdGroup = require('../../../request/group')
const Judge = require('../../../utils/judge')

///表示添加一个默认文字
const defaultText = () => ({ type: 1, value: '', upEnable:false, dwonEnable: false })

///表示添加一个文字
const textArr = () => ({type: 1, value: '', upEnable:true, dwonEnable: false})
///表示添加一个小图
const minImageArr = () => ({type: 2, value: [], upEnable:true, dwonEnable: false})
///表示添加一个大图
const largeImageArr = () => ({type: 3, value: '', upEnable:true, dwonEnable: false})
///表示添加一个视频
const videoArr = () => ({type: 4, value: '', upEnable:true, dwonEnable: false})
///表示添加一个标签
const tagArr = () => ({ type: 5, value: [], upEnable:true, dwonEnable: false})

///获取时间选择器的数据

const getSource = (isStart) => {
    const timeSource = TimePickerSource.getTime()
    const timeRange = timeSource.source
    
    if (isStart) {
        return {
            range:timeRange,
            timeStr: TimePickerSource.appendingDate(timeSource.curDate),
            selectIndex: timeSource.selectIndex
        }
    } else { //结束默认选择七天
        var year = Number(timeSource.curDate.year.replace(/年/, ''))
        var month = Number(timeSource.curDate.month.replace(/月/, ''))
        var day = Number(timeSource.curDate.day.replace(/日/, ''))
        var curDate = timeSource.curDate

        ///总天数
        let totalDay = TimePickerSource.getMonthTotalDay(year, month)
        if ((day+7) > totalDay) { //说明是月定，七天后是下个月
            let syDay = (day+7) - totalDay - 1 //到下月的某一天
            curDate.day = syDay < 10 ? `0${syDay}日` : `${syDay}日`
            if (month < 12) { 
                curDate.month = month < 10 ? `0${month+1}月` : `${month+1}月`
                return {
                    range:timeRange,
                    timeStr: TimePickerSource.appendingDate(curDate),
                    selectIndex:[
                        timeSource.selectIndex[0],
                        timeSource.selectIndex[1]+1,
                        syDay-1,
                        timeSource.selectIndex[3],
                        timeSource.selectIndex[4],
                        timeSource.selectIndex[5]
                    ]
                }
            } else { 
                const nextY = year + 1
                curDate.year = `${nextY}年`
                curDate.month = '01月'
                return {
                    range:timeRange,
                    timeStr: TimePickerSource.appendingDate(curDate),
                    selectIndex:[
                        timeSource.selectIndex[0]+1,
                        0,
                        syDay-1,
                        timeSource.selectIndex[3],
                        timeSource.selectIndex[4],
                        timeSource.selectIndex[5]
                    ]
                }
            }
        } else {
            const syDay = (day+7)
            curDate.day = syDay < 10 ? `0${syDay}日` : `${syDay}日`
            return {
                range:timeRange,
                timeStr: TimePickerSource.appendingDate(curDate),
                selectIndex:[
                    timeSource.selectIndex[0],
                    timeSource.selectIndex[1],
                    timeSource.selectIndex[2]+7,
                    timeSource.selectIndex[3],
                    timeSource.selectIndex[4],
                    timeSource.selectIndex[5]
                ]
            }
        }
    }
}

///删除模块操作
const deleteModule = (index, introduces) => { 
    if (introduces.length < 2) { //数组只有一个元素
        Toast.showText('团购介绍必须包含一个模块类型')
        return  introduces
    } else if (introduces.length == 2) {//数组只有两个元素
        const indey = (index == 0) ? (index + 1) : (index - 1)
        introduces[indey].upEnable = false
        introduces[indey].dwonEnable = false
    } else { //数组元素 >=2
        if (index == 0) { ///删除的是第一个
            introduces[index+1].upEnable = false
            introduces[index+1].dwonEnable = true
        } else if (index == introduces.length-1) {///删除的是最后一个
            introduces[index-1].upEnable = true
            introduces[index-1].dwonEnable = false
        } 
        ///删除中间 两边的不用处理
    }
    introduces.splice(index, 1)
    return introduces
}

 ///1.添加模块操作 1-文字 2-小图 3-大图 4-视频 5-标签
const addModules = (type, introduces) => {
    switch (type) {
        case 1:
            return addModuleEvent(introduces, textArr())
        case 2:
            return addModuleEvent(introduces, minImageArr())
        case 3:
            return addModuleEvent(introduces, largeImageArr())
        case 4:
            return addModuleEvent(introduces, videoArr())
        case 5:
            return addModuleEvent(introduces, tagArr())
        default:
            return introduces
    }   
}
///2.添加模块具体操作
const addModuleEvent = (introduces, insertArr) => {
    let introSource = introduces.map((item, index) => {
        if (index == 0) {
            item.upEnable = false 
            item.dwonEnable = true 
        } else {
            item.upEnable = true 
            item.dwonEnable = true 
        }
        return item
    }) 
    const index = introSource.length
    introSource.splice(index, 0, insertArr)
    return introSource
}

///上移
const moveUpModule = (index, introduces) => {
    const lastIndex = index - 1
    let lastSource = introduces[lastIndex] //拿出下移的元素
    let moveSource = introduces[index]//拿出需要上移的元素
    ///先操作被移动的元素
    if (index == introduces.length-1) {///上移的是数组最后一个元素
        lastSource.upEnable = true
        lastSource.dwonEnable = false
    } else {
        lastSource.upEnable = true
        lastSource.dwonEnable = true
    }
    ///操作上移的元素
    if (lastIndex == 0) {
        moveSource.upEnable = false
        moveSource.dwonEnable = true
    } else  {
        moveSource.upEnable = true
        moveSource.dwonEnable = true
    }
    introduces[lastIndex] = moveSource
    introduces[index] = lastSource
    return introduces
}

///下移
const moveDownModule = (index, introduces) => {
    const nextIndex = index + 1
    let nextSource = introduces[nextIndex] //拿出上移的元素
    let moveSource = introduces[index]//拿出需要下移的元素

    ///先处理被移动的元素
    if (index == 0) { //交换的元素是数组的第一个元素，即第一个交换到了最后一个
        nextSource.upEnable = false
        nextSource.dwonEnable = true
    } else {//交换的元素不是数组的第一个元素
        nextSource.upEnable = true
        nextSource.dwonEnable = true
    }
    ///操作要移动的元素
    if (nextIndex == introduces.length-1) { //被交换的元素是最后一个
        moveSource.upEnable = true
        moveSource.dwonEnable = false
       
    } else { //被交换的不是最后一个
        moveSource.upEnable = true
        moveSource.dwonEnable = true
    }
    introduces[nextIndex] = moveSource
    introduces[index] = nextSource
    return introduces
}

///输入和选择完成 赋值操作 //1-文字 2-小图 3-大图 4-视频 5-标签
const finishedToSave = (index, value, introduces) => {
    let textArr = introduces[index]
    textArr.value = value 
    introduces.splice(index, 1, textArr)
    return introduces
}

const getSelectProduct = () => {
    const products  = wx.getStorageSync(Constant.storageKey.group_select_products_key)
    let source = []
    if (products) {
        products.forEach(item => {
            source.push({
                ...item,
                proLibId: item.id,
                limitBuy: ''
            })
        })
        console.log(source);
    }
    return source
}

///获取物流方式
const selectLogistics = (logistics) => {
    const res = wx.getStorageSync(Constant.storageKey.group_select_logistics_key)
    if (Object.keys(res).length > 0) {
        logistics.type = res.type,
        logistics.name = res.name,
        logistics.addressIds = res.addressIds
    }
    return logistics
}


///提交开团信息
const submitGroupSource = (data) => {
    console.log('点击发布按钮-submitGroupSource=',data);
    const {introduces, startTime, endTime, groupUserShow, privice, startPrice, logistics, copyValue, followTips, helpSold, groupTittle, products, isEdit, groupId} = data
    
    if (groupTittle.length == 0) {
        Toast.showText('请输入团购名称')
        return 
    }

    const groupContentRes = getGroupContent(introduces)
    if (!groupContentRes.isFinished) {
        return
    }

    if (!judgeProLimitBuy(products)) {
        return
    }

    if(!isLegelDate(startTime, endTime)) {
        return
    }

    if (startPrice.length == 0) {
        Toast.showText('请输入起购金额')
        return 
    } else if (startPrice !='0') {
        if (!Judge.isMoney(startPrice)) {
            Toast.showText('起购金额格式错误,且最多保留两位小数')
            return 
        }
    } 

    if (followTips.length == 0) {
        Toast.showText('请输入跟团提示')
        return 
    }

    var params = {
        startTime,
        endTime,
        followTips,
        groupTittle,
        groupContent:groupContentRes.contnet,
        leaderShow: groupUserShow.type,
        privacySettings: privice.type,
        startingAmount: startPrice,
        logisticsMode: logistics.type,
        addressId: logistics.addressIds,
        copy: copyValue.type,
        helpBuy: helpSold.type,
        proList: products
    }
    if (isEdit) {
        params.id = groupId
    }
    console.log('可以提交数据了 -', params);
   
    
    lsdGroup.submitGoup(params).then(() => {
        console.log('提交开团成功');
        removeLocalStore()
        getApp().globalData.homeRefresh = true
        getApp().globalData.needRefreshMine = true
        wx.switchTab({
          url: '/pages/home/index',
        })
    }).catch(er => {
        console.log('提交开团失败=', er);
    })
}

// 判断日期
const isLegelDate = (startTime, endTime) => {
    let sTime =(new Date(startTime.replace(/-/g, "/"))).getTime()
    let eTime =(new Date(endTime.replace(/-/g, "/"))).getTime()
    let curT = new Date().getTime()
    if (isNaN(sTime)) {
        Toast.showText('团购开始时间不合法, 请重新选择！', 3000)
        return false
    }
    if (isNaN(eTime)) {
        Toast.showText('团购结束时间不合法, 请重新选择！', 3000)
        return false
    }
   
    if (eTime < curT) {
        Toast.showText('团购结束时间不能小于当前时间, 请重新选择！', 3000)
        return false
    }
    if (sTime >= eTime) {
        Toast.showText('团购结束时间应大于开始时间', 3000)
        return 
    }
    return true
}

//移除本地缓存
const removeLocalStore = () => {
    wx.removeStorageSync(Constant.storageKey.group_select_products_key)
    wx.removeStorageSync(Constant.storageKey.group_select_logistics_key)
}

//判断是否输入了团购商品的可购买数量
const judgeProLimitBuy = (proList) => {
    if (proList.length == 0) {
        Toast.showText('请添加开团商品')
        return false
    }
    try {
        proList.forEach((el, index) => {
            if (el.limitBuy.length == 0) {
                throw new Error(`请输入团购商品${index+1}的可购买数量`)
            } else if (!Judge.isInputNumber(el.limitBuy)) {
                throw new Error(`团购商品${index+1}的可购买数量只能为数字`)
            }
        })
        return true
    } catch (error) {
        Toast.showText(error.message)
        return false
    }
}



///type 1-文字 2-小图 3-大图 4-视频 5-标签
const getGroupContent = (introduces) => {
    let groupContent = []
    try {
        introduces.forEach(el => {
            let contentP = {}
            if (el.value.length == 0) {
                switch (el.type) {
                    case 1://文字
                        throw new Error('请输入团购介绍的文字描述')
                        break;
                        case 2://小图
                        throw new Error('请添加团购介绍的小图')
                        break;
                        case 3://大图
                        throw new Error('请添加团购介绍的大图')
                        break;
                        case 4://视频
                        throw new Error('请添加团购介绍的视频')
                        break;
                        case 5://标签
                        throw new Error('请添加团购介绍的标签')
                        break;                
                    default:
                        break;
                }
            } else {
                contentP = {
                    type: el.type,
                    value: el.value
                }
            }
            groupContent.push(contentP)
        })
    } catch (error) {
        Toast.showText(error.message)
        return {
            isFinished: false
        }
    }
    return { 
        isFinished: true,
        contnet: JSON.stringify(groupContent)
    }
}


module.exports = {
    defaultText,
    addModules,
    deleteModule,
    moveUpModule,
    moveDownModule,
    finishedToSave,
    getSelectProduct,
    getSource,
    selectLogistics,
    submitGroupSource,
    //移除上次的缓存
    removeLocalStore
}