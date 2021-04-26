const Constant = require('./utils/constant')
const lsd = require('./utils/request')

///查询用户地址 type 1收货地址 2提货点地址  isDefault 是否是查询默认地址 默认不是
const getUserAddress = (type, isDefault = false) => {
    let url = isDefault ? Constant.requestURL.getUserDefaultAddress : Constant.requestURL.getUserAddress
    return lsd.request('GET', url, {type})
}

///删除用户地址
const deleteUserAddress = (type, addressId) => {
    return lsd.request('GET', Constant.requestURL.deleteUserAddress, {type, id: addressId})
}

////保存和修改用户地址信息
const updateAddress = (params) => {
    return lsd.request('POST', Constant.requestURL.setUserAddress, params)
}


module.exports = {
    getUserAddress,
    deleteUserAddress,
    updateAddress
}