const Toast = require('../../../utils/Toast')


const isLegal = (text, message) => {
    if (text.length == 0) {
        Toast.showText(message)
        return false
    }
    return true
}

module.exports = {
    ///判断提货点名称是否合法
    isBusinessLegal: (res) => {
        return isLegal(res, '名称不能为空')
    },

    ///判断联系人是否合法
    isUserNameLegal: (res) => {
        return isLegal(res, '联系人不能为空')
    },

    ///判断提货点联系人是否合法
    isUserPhoneLegal: (res) => {
        return isLegal(res, '联系人不能为空')
    },
    ///判断提货点位置是否合法
    isRegionLegal: (res) => {
        return isLegal(res, '位置不能为空')
    },
    ///判断详细地址是否合法
    isAddressLegal: (res) => {
        return isLegal(res, '详细地址不能为空')
    }
}