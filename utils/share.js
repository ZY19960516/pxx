const Constant = require('../request/utils/constant')
const lsd = require('../request/utils/request')

export default {

    getGroupShareInfo(title,imageUrl,form,groupId) {
        const shareUserId = wx.getStorageSync(Constant.storageKey.userId_key)
        return {
            title, //自定义转发标题
            imageUrl,
            path: form == 'button' ? `/pages/groupDetail/index?id=${groupId}&title=${title}&openType=1&shareUserId=${shareUserId}` : 'pages/home/index' //分享页面路径
        }
    },
    joinGroup(groupId, shareUserId, shareType = 1) {
        lsd.request('GET', Constant.requestURL.shareJoinGroup, {
            groupInfoId: groupId,
            shareType: shareType,
            shareUserId: shareUserId
        })
    },

    getShareInfo(groupId, shareType = 1) {
        lsd.request('GET', Constant.requestURL.getShareInfo, {
            groupInfoId: groupId,
            shareType: shareType
        }).then(res => {

        })
    },

}