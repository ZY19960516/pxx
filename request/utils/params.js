const Crypt = require('./cryptTool')
const Constant = require('./constant')

const activeParams = () => {
    const systemInfo = wx.getSystemInfoSync()
    return {
        'brand': systemInfo.brand,
        'screenSize': `${systemInfo.screenWidth}/${systemInfo.screenHeight}`,
        'screenRatio': systemInfo.pixelRatio,
        'model': systemInfo.model
    }
}

///公共参数
const publicParams = () => {
    const systemInfo = wx.getSystemInfoSync()
    const platform = systemInfo.platform === 'android' ? 'Android' : 'iOS'
    const params = {
        'ApkChannel': 'miniprogram',
        'ApkName': Crypt.Encrypt(Constant.APP_NAME),
        'ApkPkgName': Crypt.Encrypt('com.lishengduo.miniprogram'),
        'ApkVersion': Constant.APP_VERSION,
        'AppId': Crypt.Encrypt('120030'),
        'Os': platform,
        'OsVersion': systemInfo.system,
        'user_id': Crypt.Encrypt(wx.getStorageSync(Constant.storageKey.userId_key)),
    }
    const openId = wx.getStorageSync(Constant.storageKey.openId_key)
    if (openId) {
        return {
            'openId': Crypt.Encrypt(openId),
            ...params
        }
    }
    return params
}


module.exports = {
    activeParams,
    publicParams
}