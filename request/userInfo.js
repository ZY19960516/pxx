const lsd = require('./utils/request')
const Constant = require('./utils/constant')
//获取应用实例
const app = getApp()

//打开设置页面 
const openSetting = (message) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: message,
            showCancel: false,
            confirmText:'去授权',
            success:() => {
                wx.openSetting({
                    withSubscriptions: true,
                    success: result => {
                        const auth = result.authSetting["scope.userInfo"]
                        resolve({auth})
                    },
                    fail: er => {
                        reject(er)
                    }
                })
            }
        })
    })
}

//判断是否授权
const judgeIsAuth = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            withSubscriptions: true,
            success:res => {
                const userInfoAuth = res.authSetting["scope.userInfo"]
                if (userInfoAuth) {
                    resolve({auth: userInfoAuth})
                } else {
                    resolve({auth: false})
                }
            },
            fail: er => {
                reject(er)
            }
        })
    })
}

///获取userInfo
const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        judgeIsAuth().then(res => { //判断授权以后才可以调用
            if (res.auth) {
                wx.getUserInfo({
                    success: res => {
                        wx.setStorageSync(Constant.storageKey.userInfo_key, res.userInfo)
                        resolve(res.userInfo)    
                    },
                    fail: error => {
                        console.log(error);
                        reject(error)
                    }
                })
            } else {
                const userInfo = wx.getStorageSync(Constant.storageKey.userInfo_key)
                if (userInfo) {
                    resolve(res.userInfo)    
                }
            }
        }).catch(er => {
            reject(er)
        })
    })
}


//把获取到的iv和encryptedData传给后台获取用户信息 暂时不用
const submitWxUserInfoToService = (encryptedData, iv) => {
    let params = {
        encryptedData,
        iv
    }
    wx.checkSession({
        success () {
          //session_key 未过期，并且在本生命周期一直有效
          uploadEncrypDataIV(params)
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          getWXOpenId().then(res => {
            uploadEncrypDataIV(params)
          })
        }
    })
}
  
///获取到的iv和encryptedData传给后台  //后台不解密直接获取，所以不用验证checkSession
const uploadEncrypDataIV = (params) => {
    return lsd.requestForm('POST', Constant.requestURL.getUserInfo, params)
}
  

module.exports = {
    judgeIsAuth,
    openSetting,
    getUserInfo,
    submitWxUserInfoToService,
    uploadEncrypDataIV
}