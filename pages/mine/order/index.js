// 订单管理
const https = require("../../../request/mine");

Page({
  /**
   * 页面的初始数据
   */

  data: {
    typeArray: ["我发起的团", "我的跟团"],
    typeIndex: 0,
    type: "待提货",
    //我的跟团数据
    followPage: 1,
    followNomore: false,
    followList: [],
    // 我发起的团
    list: [],
    page: 1,
    nomore: false,
    isPullFresh: true,
    isLoadMore: false,
    keyword: '',
    timeId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // typeIndex 默认为0-我发起的团  1-我的跟团
    this.setData({
      typeIndex:options.typeIndex ? options.typeIndex : 0,
      search: this.search.bind(this)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.typeIndex == 1) {
      this.findAllOrderInfoList();
    } else {
      this.findLeaderAllOrderInfoList();
    }
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
  onPullDownRefresh: function () {
    if (this.data.type == "我发起的团") {
      this.data.page = 1;
      this.findLeaderAllOrderInfoList();
    } else if (this.data.type == "我的跟团") {
      this.data.followPage = 1;
      this.findAllOrderInfoList();
    }
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.type == "我发起的团") {
      if (!this.data.nomore) {
        this.data.page++;
        this.findLeaderAllOrderInfoList();
      }
    } else if (this.data.type == "我的跟团") {
      if (!this.data.followNomore) {
        this.data.followPage++;
        this.findAllOrderInfoList();
      }
    }
  },

  // /我发起的团
  findLeaderAllOrderInfoList() {
    let params = {
      page: this.data.page,
      searchWord: this.data.keyword,
      type: this.data.type,
      size: 10,
      type: "1",
    };
    https
      .findLeaderAllOrderInfoList(params)
      .then((res) => {
        let list = []
        if (res.first) {
          list = res.records;
        } else {
          list = [...this.data.list, ...res.records];
        }
        this.setData({
          list: list,
          nomore: res.last,
          page: res.current,
        });
        wx.stopPullDownRefresh();
      })
      .catch((error) => {
        wx.stopPullDownRefresh();
        console.log(JSON.stringify(error));
      });
  },
  // 我的跟团
  findAllOrderInfoList() {
    let params = {
      page: this.data.followPage,
      size: 10,
      searchWord:this.data.keyword
    };
    https
      .findAllOrderInfoList(params)
      .then((res) => {
        let list = []
        if (res.first) {
          list = res.records;
        } else {
          list = [...this.data.followList, ...res.records];
        }
        let followList = list.map((item) => {
          switch (item.orderState) {
            case 0:
              item.orderState = "待支付";
              break;
            case 1:
              item.orderState = "已支付";
              break;
            case 2:
              item.orderState = "支付中";
              break;
            case 3:
              item.orderState = "待退款";
              break;
            case 4:
              item.orderState = "已退款";
              break;
            case 5:
              item.orderState = "已取消";
              break;
            default:
              break;
          }
          return item
        });
        this.setData({
          followList: followList,
          followNomore: res.last,
          followPage: res.current,
        });
      })
      .catch((error) => {
        wx.stopPullDownRefresh();
        console.log(JSON.stringify(error));
      });
  },
  search: function (value) {
    this.setData({
        keyword: value
    })
    clearTimeout(this.data.timeId) //清除定时器
    this.data.timeId = setTimeout(() => {
      if (this.data.typeIndex == 1) {
        this.findAllOrderInfoList();
      } else {
        this.findLeaderAllOrderInfoList();
      }
    }, 900);
    
  },

  clearSearch() {
    this.setData({
        keyword: ''
    })
  },
  selectType(e) {
    let {
      index,
      item
    } = e.currentTarget.dataset;
    this.setData({
      typeIndex: index
    });
    this.data.type = item;
    if (item == "我发起的团") {
      this.findLeaderAllOrderInfoList();
    } else if (item == "我的跟团") {
      this.findAllOrderInfoList();
    }
  },
});