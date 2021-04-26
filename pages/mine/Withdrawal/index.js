// 提现
const https = require('../../../request/mine')
Page({

  /**
   * 页面的初始数据
   */

  data: {
    withdrawalMoney: null,
    balance: '',
    ishttp: false,
    canButtonClick: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let balance = options.balance
    this.setData({
      balance
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.findUserInfo()
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  GetwithdrawalMoney(e) {
    this.setData({
      withdrawalMoney: e.detail.value
    })

  },
  withdrawalAll() {
    //全部提现
    this.setData({
      withdrawalMoney: this.data.balance
    })
  },
  clernInput() {
    this.setData({
      withdrawalMoney: null
    })
  },
  handleWithdrawal() {
    if (!this.buttonClicked()) return
    if (this.validate()) {
      //接口
      let params = {
        withdrawalAmount: this.data.withdrawalMoney * 100
      }
      https.withdrawal(params).then(res => {
        this.wxShowModal(res)
      }).catch(error => {
        this.wxShowModal(error)
      })
    }
  },
  wxShowModal (msg) {
    wx.showModal({
      content:msg,
      showCancel:false,
      success(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        } 
      }
    })
  },
  buttonClicked() {
    if (this.data.canButtonClick) {
      this.setData({
        canButtonClick: false
      })
      setTimeout(() => {
        this.setData({
          canButtonClick: true
        })
      }, 2000)
      return true
    } else {
      wx.$showText('请勿重复点击')
      return false
    }
  },
  validate() {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    if (!reg.test(this.data.withdrawalMoney)) {
      wx.$showText("请输入正确的金额")
      return
    }
    if (this.data.withdrawalMoney < 1) {
      wx.$showText("提现金额不能小于1元")
      return
    }
    if (this.data.withdrawalMoney > this.balance) {
      wx.$showText("提现金额不能大于可提现金额")
      return
    }
    if (this.data.withdrawalMoney > 3000) {
      wx.$showText("提现金额每天不能大于3000元")
      return
    }
    return true
  },

  checkChinese(val) {
    if (!val) {
      wx.$showText('请输入姓名！')
      return
    }
    if (val.charCodeAt() <= 255) {
      wx.$showText('姓名必须是中文')
      return
    }
    if (val.length > 20) {
      wx.$showText('姓名长度超出限制')
      return
    }
    return true
  },
})