///这里我的页面网络请求
const Constant = require('./utils/constant')
const lsd = require('./utils/request')
module.exports = {
    // 个人页面
    findUserInfo: (params) => {
        return lsd.request('POST', Constant.requestURL.findUserInfo+'/'+params.userId)
    },
    submitUserInfo:(params) => {
        return lsd.request('POST', Constant.requestURL.submitUserInfo, params)
    },
    //--个人主页页面网络请求--
    
    //提现页面请求
    withdrawal: (params) => {
        return lsd.request('GET', Constant.requestURL.withdrawal, params)
    },
    billingDetails: (params) => {
        return lsd.request('GET', Constant.requestURL.billingDetails, params)
    },
    //提现记录
    withdrawalRecordList: (params) => {
        return lsd.request('GET', Constant.requestURL.withdrawalRecordList, params)
    },
    //商品核销
    findOrderInfoWriteOffList:(params) => {
        return lsd.request('GET', Constant.requestURL.findOrderInfoWriteOffList, params)
    },
    // 团长--查看自己的开团 的订单信息列表
    findLeaderAllOrderInfoList:(params) => {
        return lsd.request('GET', Constant.requestURL.findLeaderAllOrderInfoList, params)
    },
    //用户查看自己的所有的拼团订单信息列表
    findAllOrderInfoList:(params) => {
        return lsd.request('GET', Constant.requestURL.findAllOrderInfoList, params)
    },
    //确认核销
    confirmWriteOff:(params) => {
        return lsd.request('GET', Constant.requestURL.confirmWriteOff+'/'+ params.orderNo)
    },
    //确认核销
    sendGoods:(params) => {
        return lsd.requestForm('PUT', Constant.requestURL.sendGoods, params)
    },
    // 拼团信息列表
    findGroupInfoList:(params) => {
        return lsd.request('GET', Constant.requestURL.findGroupInfoList , params)
    },
    //删除拼团信息
    deletePtGroupInfo:(params) => {
        return lsd.request('GET', Constant.requestURL.deletePtGroupInfo , params)
    },
    //开始或结束开团
   updateStartOrEndGroupInfo: (params) =>{
    return lsd.requestForm('POST', Constant.requestURL.updateStartOrEndGroupInfo,params)
   },
   //收入明细
   billPage: (params) =>{
    return lsd.requestForm('GET', Constant.requestURL.billPage,params)
   },
   //团员列表
   findMemberPage: (params) =>{
    return lsd.requestForm('GET', Constant.requestURL.findMemberPage,params)
   },
   //修改物流地址
   updateOrderAddress:(params) =>{
    return lsd.request('PUT', Constant.requestURL.updateOrderAddress,params)
   },
}
