const Params = require('./params')
const Toast = require('../../utils/Toast')
const Constant = require('./constant')

// json形式请求 showProgress-标识是否展示请求指示器
const request = (method, url, params = {}, showProgress = true) => {
    return baseRequest(method, url, params, false, showProgress)
}

// form形式请求 showProgress-标识是否展示请求指示器
const requestForm = (method, url, params = {}, showProgress = true) => {
    return baseRequest(method, url, params, true, showProgress)
}

/** 网络请求  isForm-标识是否是form方式请求  showProgress-标识是否展示请求指示器*/
function baseRequest(method, url, params, isForm, showProgress) {
    showProgress && Toast.showProgress('加载中...')
    const reqsParam = Params.publicParams()
    console.log('请求地址=', url, "reqsParam:", reqsParam, "params:", params)
    const contentType = isForm ? 'application/x-www-form-urlencoded; charset=utf-8' : 'application/json'

    return new Promise((resolve, reject) => {
        wx.request({
            method,
            url,
            data: params,
            header: {
                'content-type': contentType,
                ...reqsParam
            },
            success: (res) => {
                showProgress && Toast.hiddenProgress()
                // stopPullDown()
                switch (res.data.code) {
                    case 200:
                        resolve(res.data.data)
                        break;
                    case 403: //未登录
                        pushToLogin()
                        break;
                    case -601: // 登录超时，需要重新登录
                    case -602:
                    case 401:
                        Toast.showText('登录超时，需要重新登录')
                        break;
                    case -603: //设备未注册
                        // LogRequest.uploadActiveLog(false) 
                        reject('设备未注册')
                        break;
                    case -1001: //请求超时
                        Toast.showText('请求超时,请刷新后再试！')
                        reject('请求超时,请刷新后再试！')
                        break;
                    case -1009: //网络连接失败
                        Toast.showText('网络连接失败！')
                        reject(error.errMsg)
                        break;
                    case -706: 
                        Toast.showText(res.data.msg, 2000)
                        reject(error.errMsg)
                        break;
                    default:
                        //防止hiddenProgress与showText冲突 错误关闭showText 所以延后执行
                        // setTimeout(() => {
                        //     Toast.showText(res.data.msg, 1500)
                        // }, 500);
                        reject(res.data.msg)
                        break;
                }
            },
            fail: (error) => {
                showProgress && Toast.hiddenProgress()
                Toast.showText('系统繁忙')
                // stopPullDown()
                console.log(error);

                reject(error.errMsg)
            }
        })
    })
}

const pushToLogin = () => {
    const pages = getCurrentPages()
    const route = pages[pages.length - 1].route
    if (route != 'pages/login/index') {
        wx.navigateTo({
            url: '/pages/login/index',
        })
    }
}

///提交图片文件
const uploadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            header: {
                'content-type': 'multipart/form-data'
            },
            filePath: filePath,
            name: 'file',
            url: Constant.requestURL.uploadFile,
            success: res => {
                const result = JSON.parse(res.data);
                if (result.code == 200) {
                    resolve(result.data)
                } else {
                    reject(result.msg || '')
                }
            },
            fail: er => {
                console.log('文件上传错误', er);
                reject(er.errMsg)
            }
        })
    })
}




module.exports = {
    request, // json形式请求 showProgress-标识是否展示请求指示器
    requestForm, // form形式请求 showProgress-标识是否展示请求指示器
    uploadFile //提交文件
}