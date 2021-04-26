
// const domain =   'http://192.168.1.127:8082'
const domain =   'https://c.lishengduo.com'


const wxAppId = 'wx7d1df3c85009b656'
const APP_NAME = '立省多'
const APP_VERSION = '1.0.2'

///本地保存的key
const storageKey = {
    openId_key: 'openId_key',//保存openid Key
    userId_key: 'userId_key',//保存userId Key
    userInfo_key: 'userInfo_key',//保存userInfo
    product_specs_key: 'product_specs_key',//保存商品规格
    group_select_products_key: 'group_select_products_key', //团购选择的商品
    group_select_address_id_key: 'group_select_address_id_key', //团购选择自提设置的地址id数组
    group_select_logistics_key: 'group_select_logistics_key' //团购设置物流
}


// 判断是否登录
const judementIsLogin = () => {
    const userInfo = wx.getStorageSync(storageKey.userInfo_key) || {}
    return Object.keys(userInfo).length > 0 ? true : false
}
const navagationPage = (path) =>{
    if (judementIsLogin()) {
        wx.navigateTo({ url: path})
    } else {
        wx.navigateTo({ url: '/pages/login/index'})
    }
}
///网络接口
const requestURL = {
    ///获取openid
    getOpenId: domain + '/lsd/wxUser/authCodeSession',
    ///获取用户信息
    getUserInfo: domain + '/lsd/wxUser/saveUserInfo',
    ///获取用户默认地址
    getUserDefaultAddress: domain + '/lsd/wxUserAddress/findUserDefaultAddress',
    ///获取用户地址
    getUserAddress: domain + '/lsd/wxUserAddress/findUserAddress',
    ///删除用户地址
    deleteUserAddress: domain + '/lsd/wxUserAddress/deleteUserAddress',
    ///保存和修改用户地址信息
    setUserAddress: domain + '/lsd/wxUserAddress/saveOrUpdateAddress',
    ///保存和修改用户的商品分类
    saveProductCategory: domain + '/lsd/proCategory/saveOrUpdateProCategory',
    ///删除分类
    deleteProductCategory: domain + '/lsd/proCategory/deleteProCategory',
    ///分类列表
    productCategoryList: domain + '/lsd/proCategory/findProCategoryList',
    ///置顶产品分类
    toppingProductCategory: domain + '/lsd/proCategory/toppingProCategory',
    ///删除产品
    deleteProduct: domain + '/lsd/proProduct/deleteProProduct',
    ///查询单个产品
    findSingleProduct: domain + '/lsd/proProduct/findProProduct',
    ///产品列表
    productList: domain + '/lsd/proProduct/findProProductList',
    ///将开团产品导入产品库
    importProductToLibarary: domain + '/lsd/proProduct/importProProduct',
    ///产品导入可选列表
    importSelectList: domain + '/lsd/proProduct/listImportProProduct',
    ///保存和修改用户的商品
    dupdateProduct: domain + '/lsd/proProduct/saveOrUpdateProProduct',
    //查询用户信息
    findUserInfo: domain + '/lsd/wxUser/findUserInfo',
    //修改用户信息
    submitUserInfo: domain + '/lsd/wxUser/submitUserInfo',
    //首页开团列表、团长主页列表
    groupList: domain + '/lsd/ptGroupInfo/findGroupInfoList',
    //团详情
    groupDetail: domain + '/lsd/ptGroupInfo/findGroupInfoById',
    ///提交图片
    uploadFile: domain + '/lsd/upload',
    //提现至零钱
    withdrawal:domain + '/lsd/wxPayFlow/withdrawal',
    //账单明细
    billingDetails:domain + '/lsd/wxPayFlow/billingDetails',
    //提现记录列表
    withdrawalRecordList:domain + '/lsd/wxPayFlow/withdrawalRecordList',
    ///保存和修改开团信息
    submitGroup: domain + '/lsd/ptGroupInfo/saveOrUpdateGroupInfo',
    submitOrder: domain + '/lsd/ptOrder/submitOrder',
    quryOrderStatus: domain + '/lsd/ptOrder/turntableOrder',
    ///删除开团信息
    deleteGroup: domain + '/lsd/ptGroupInfo/deletePtGroupInfo',
    // 团长查看核销商品的列表
    findOrderInfoWriteOffList: domain + '/lsd/ptOrder/findOrderInfoWriteOffList',
    //团长--查看自己的开团 的订单信息列表
    findLeaderAllOrderInfoList:domain + '/lsd/ptOrder/findLeaderAllOrderInfoList',
    //用户查看自己的所有的拼团订单信息列表
    findAllOrderInfoList:domain + '/lsd/ptOrder/findAllOrderInfoList',
    //确认核销
    confirmWriteOff:domain + '/lsd/ptOrder/confirmWriteOff',
    //物流发货
    sendGoods:domain + '/lsd/ptOrder/sendGoods',
    // 拼团信息列表
    findGroupInfoList:domain + '/lsd/ptGroupInfo/findGroupInfoList',
    // 删除拼团信息
    deletePtGroupInfo:domain + '/lsd/ptGroupInfo/deletePtGroupInfo',
    ///复制团列表
    getCopyList: domain + '/lsd/ptGroupInfo/personal/page',
    //分享加入团
    shareJoinGroup: domain + '/lsd/ptGroupInfo/shareComingIn',
    //获取分享信息
    getShareInfo: domain + '/lsd/ptGroupInfo/getShareInfo',
    //开始或结束开团
    updateStartOrEndGroupInfo: domain + '/lsd/ptGroupInfo/updateStartOrEndGroupInfo',
    //收入明细
    billPage: domain + '/lsd/wxPayFlow/billPage',
    //团员列表
    findMemberPage:domain + '/lsd/ptGroupInfo/findMemberPage',
    //修改收货地址
    updateOrderAddress:domain + '/lsd/ptOrder/updateOrderAddress',
}


module.exports = {
    storageKey,
    requestURL,
    wxAppId,
    domain,
    APP_NAME,
    APP_VERSION,
    judementIsLogin,
    navagationPage
}