///这里首页的网络请求
const Constant = require('./utils/constant')
const lsd = require('./utils/request')
const app = getApp()

module.exports = {
   fetchGroupList: (page, appointUserId, type = "1") => {
      const params = {
         page: page.toString(),
         size: "10",
         appointUserId: appointUserId || null,
         type: type
      }
      return lsd.request('GET', Constant.requestURL.groupList, params)
   },

   getGroupDetail: (id, type = "1") => {
      return lsd.request('GET', Constant.requestURL.groupDetail, {
         groupInfoId: id,
         type: type
      })
   },

   submitOrder: (info) => {
      return lsd.request('POST', Constant.requestURL.submitOrder, info)
   },

   quryOrderStatus: (orderNo) => {
      return lsd.request('GET', Constant.requestURL.quryOrderStatus+`/${orderNo}`)
   },
   
}