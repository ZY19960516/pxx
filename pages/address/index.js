// pages/address/index.js

const lsd = require('../../request/address')
const Toast = require('../../utils/Toast')
const Constant = require('../../request/utils/constant')
let eventChannel = {}
var selAddrItem
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataSource: [],
        type: '',
        isSelect: false,
        selectSource: []
    },

    onEditAddress: function (e) {
        const item = e.currentTarget.dataset.item
        const address = encodeURIComponent(JSON.stringify(item))
        const {type} = this.data
        const tile = type == 1 ? '修改收货地址' : '修改提货地址'
        wx.navigateTo({
            url: `/pages/createaddress/index?address=${address}&title=${tile}&addrType=${type}`,
        })
    },

    onDeleteAddress: function (e) {
        const item = e.currentTarget.dataset.item
        const tile = this.data.type == 1 ? '' : `确定要将：${item.deliveryName}删除吗？`
   
        Toast.showAlert(
            tile,
            '删除后将无法继续使用该地址下单',
            '取消',
            '确定',
            res => {
                if (res) {
                    lsd.deleteUserAddress(item.type, item.id).then(() => {
                        this.getAddressList()
                    })
                }
            })
    },
    //设置团长
    onSetgrouperAddress: function (e) {
        const item = e.currentTarget.dataset.item
        Toast.showText('开发中 ...')
        console.log('onSetgrouperAddress', item);
    },
    ///添加收货地址
    onAddAddress: function (e) {
        const t=this
        const {type} = this.data
        const tile = type == 1 ? '创建收货地址' : '创建提货地址'
        wx.navigateTo({
            url: `/pages/createaddress/index?title=${tile}&addrType=${type}`,
            events: {
                onPageResult(res) {
                    t.data.dataSource.splice(0, 0, res)
                    t.setData({
                        dataSource: t.data.dataSource,
                    })
                }
            }
        })
    },

    ///选择地址
    onSelectAddress: function (e) {
        selAddrItem = e.currentTarget.dataset.item
        const item = selAddrItem
        const indey = this.data.dataSource.findIndex(el => el.id == item.id)
        item.select = e.detail.isSelect
        let dataSource = [...this.data.dataSource]
        dataSource.splice(indey, 1, item)

        let selectSource = [...this.data.selectSource]
        if (selectSource.length > 0) {
            const index = selectSource.findIndex(el => el == item.id)
            if (index == -1) { //不包含
                selectSource.push(item.id)
            } else {
                selectSource.splice(index, 1)
            }
        } else {
            selectSource.push(item.id)
        }
        this.setData({
            selectSource,
            dataSource
        })
    },

    ///确认添加
    selectAddressConfirm: function () {
        if (this.data.selectSource.length == 0) {
            Toast.showText('请至少选择一个地址')
        } else {
            wx.setStorageSync(Constant.storageKey.group_select_address_id_key, this.data.selectSource)
            wx.navigateBack({
                success: function (res) {
                    //返回地址给上个页面
                    selAddrItem.name = selAddrItem.name.val
                    selAddrItem.phone = selAddrItem.phone.val
                    eventChannel.emit('onPageResult', selAddrItem);
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     * 
     * options  type 1 用户地址  2 提货地址 （isSelect 提货地址里面选择）
     */
    onLoad: function (options) {
        eventChannel = this.getOpenerEventChannel()
        this.saveOptionData(options)
        console.log(options);
    },

    saveOptionData: function (options) {
        const isSelect = options.select || false
        const type = options.type || 2
        wx.setNavigationBarTitle({
            title: type == 2 ? (isSelect ? '设置自提点' : '提货地址管理') : '用户地址管理',
        })
        let selectSource = []
        if (type == 2 && isSelect) { //选择自提点，过来的数据要选中
            const source = JSON.parse(decodeURIComponent(options.addressIds))
            selectSource = source
        }
        this.setData({
            type,
            isSelect,
            selectSource
        }, () => {
            this.getAddressList()
        })
    },
    ///自提点数据反显
    setAddressIds: function (res) {
        const {
            type,
            isSelect,
            selectSource
        } = this.data
        if (type == 2 && isSelect) { //选择自提点并且有数的时候执行
            console.log('自提点数据反显=', selectSource);
            let result = []
            res.forEach(element => {
                let isSelect = false
                const index = selectSource.findIndex(el => element.id == el)
                if (index != -1) {
                    isSelect = true
                }
                result.push({
                    ...element,
                    select: isSelect
                })
            });
            return result
        }
        return res
    },

    ///后去地址列表
    getAddressList: function () {
        lsd.getUserAddress(this.data.type).then(res => {
            console.log(res);
            const result = this.setAddressIds(res || [])
            this.setData({
                dataSource: result
            })
        })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getAddressList()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
})