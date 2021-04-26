// 提现记录
const https = require("../../../request/mine");
Page({
  /**
   * 页面的初始数据
   */

  data: {
    recordList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.withdrawalRecordList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.findUserInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  withdrawalRecordList() {
    //接口
    https
      .withdrawalRecordList()
      .then((res) => {
        console.log(res, "res");
          this.data.recordList = res.map((item, index) => {
            switch (item.transactionStatus) {
              case 0:
                item.transactionStatus = "待支付";
                break;
              case 1:
                item.transactionStatus = "已支付";
                break;
              case 2:
                item.transactionStatus = "支付中";
                break;
              case 3:
                item.transactionStatus = "退款中";
                break;
              case 4:
                item.transactionStatus = "退款成功";
                break;
              case 6:
                item.transactionStatus = "退款失败";
                break;
              case 7:
                item.transactionStatus = "退款申请成功";
                break;
              case 8:
                item.transactionStatus = "提现申请";
                break;
              case 9:
                item.transactionStatus = "提现申请成功";
                break;
              case 10:
                item.transactionStatus = "提现申请失败";
                break;
              case 11:
                item.transactionStatus = "提现成功";
                break;
              case 12:
                item.transactionStatus = "提现失败";
                break;
              default:
                break;
            }
            switch (item.type) {
              case 1:
                item.type = "支付";
                break;
              case 2:
                item.type = "退款";
                break;
              default:
                item.type = "提现";
                break;
            }
            return item;
          });
          this.setData({ recordList: this.data.recordList });
      })
      .catch((error) => {
        console.log("error");
      });
  },
});
