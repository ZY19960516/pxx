///这里我的页面网络请求
const Constant = require('./utils/constant')
const lsd = require('./utils/request')
module.exports = {
    ///删除产品
    submitGoup: (params) => {
        return lsd.request('POST', Constant.requestURL.submitGroup, params)
    },
    deleteGroup:(groupId) => {
        return lsd.request('GET', Constant.requestURL.deleteGroup, {id: groupId})
    },

    // 获取复制已有开团信息
    getCopyGroupList:(page) => {
        return lsd.request('GET', Constant.requestURL.getCopyList, {page})
    }, 
    //查询单个开团信息 groupDetail
    getGroupDetial:(groupId) => {
        return lsd.request('GET', Constant.requestURL.groupDetail, {
            groupInfoId: groupId,
            type: 2
         })
    }
}
