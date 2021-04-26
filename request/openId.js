const Constant = require('./utils/constant')
const lsd = require('./utils/request')

///1.调用微信login api 获取 登录凭证（code）
///2.根据 登录凭证（code）获取openid
const getWXOpenId = () => {
  const openId = wx.getStorageSync(Constant.storageKey.openId_key)
  if (openId) {
    return
  }
  return new Promise((resolve, reject) => {
    wx.login({
      success: wxRes => {
        ///登录凭证（code）获取openid
        const url = Constant.requestURL.getOpenId + `/${wxRes.code}`
        lsd.request('GET', url, false).then(result => {
          console.log(result);
          wx.setStorageSync(Constant.storageKey.openId_key, result.openId)
          wx.setStorageSync(Constant.storageKey.userId_key, result.userId)
          resolve(result.openid)
        }).catch(e => {
          reject(e)
          console.log(`去后台获取openid失败 -- ${e}`);
        })
      },
      fail: wxEr => {
        reject(wxEr)
        console.log(`获取登录凭证（code）失败 -- ${wxEr}`);
      }
    })
  })
}

module.exports = {
  getWXOpenId
}