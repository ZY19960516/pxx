const https = require('../../request/mine')
import { Encrypt } from '../../request/utils/cryptTool'
import { domain } from '../../request/utils/constant'
import { testphone } from '../../utils/util'


var app = getApp();
Page({
      /**
     * 页面的初始数据
     */
    data: {
      headerImg: "",
      address: '',
      introduction: '',
      phone: '',
      // leaderName: '',
      userInfo:{},
      userId:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      this.data.userId = wx.getStorageSync('userId_key')
      this.findUserInfo()
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
    },

    goSetpage() {
      wx.navigateTo({
        url: "/pages/my/set",
      });
    },
    submitUserInfo() {
      if (!testphone(this.data.phone)) return 
      let data = {
        backgroundImg: "",
        headerImg: this.data.headerImg,
        introduction: this.data.introduction,
        leaderName: this.data.leaderName,
        phone: Encrypt(this.data.phone),
        address:this.data.address,
        userId:this.data.userId
      }
      https.submitUserInfo(data).then(res=>{
        wx.navigateBack({
          delta: 1
        });
      }) 
	},
	findUserInfo () {
    let params = {userId:this.data.userId} 
		https.findUserInfo(params).then(res=>{
      console.log(res,'resres');
      this.setData({
        introduction: res.introduction,
        leaderName:res.leaderName,
        phone:res.phone ? res.phone.val : '',
        headerImg:res.headerImg,
        address:res.address
      })
		}) 
  },
  GetleaderName (e) {
    this.leaderName = e.detail.value
    this.setData({ leaderName: this.leaderName})
  },
  Getintroduction (e) {
    let introduction = e.detail.value
    this.setData({ introduction})
  },
  GetLocationname (e) {
    this.address = e.detail.value
    this.setData({ address: this.address})
  },
  Getphone (e) {
    this.phone = e.detail.value
    this.setData({ phone:this.phone})
  },
  // 点击上传图片
  upShopLogo() {
    var that = this;
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#000000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop("album"); //从相册中选择
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop("camera"); //手机拍照
          }
        }
      },
    });
  },
  //选择图片
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: [type],
      success: function (res) {
        that.upload_file(domain + '/lsd/upload', res.tempFilePaths[0]);

      },
    });
  },
  upload_file: function (url, filePath) {
      var that = this;
      wx.uploadFile({
        url: url, //后台处理接口
        filePath: filePath,
        name: "file",
        header: {
          "content-type": "multipart/form-data",
        }, // 设置请求的 header
        success: function (res) {
          var data = JSON.parse(res.data);
          that.setData({
            headerImg: data.data.fileHttpUrl,
		      });
          wx.$showText("上传成功");
        },
        fail: function (res) {},
      });
  },
  getLocation(){
    let _this = this;
    wx.getSetting({
      success(res) {
        // 判断定位的授权
        // == undefined  初始化进入该页面，没有调用wx.getLocation这个方法的话
        // == false    非初始化进入该页面,且未授权
        // == true     地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title:'提示',
            content: '需要获取你的地理位置，请确认授权',
            confirmColor:'#7FC241',
            success(res) {
                if (res.cancel) {
                  wx.$showText('拒绝授权');
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dbs) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                          //再次授权，调用wx.chooseLocation
                        that.chooseLocation(dbs)
                      } else {
                        wx.$showText('授权失败')
                      }
                    },
                  })
                }
            },
        })
        } else if (res.authSetting['scope.userLocation'] == undefined){
          _this.chooseLocation();
        } else if (res.authSetting['scope.userLocation']) {
          _this.chooseLocation();
        }
      }
    })
  },
	chooseLocation () {
    let that = this
		wx.chooseLocation({
			success (res) {
        that.address = res.name
        that.setData({ address: that.address})
       },
       fail(error) {
        console.log(error,'chooseLocation');
      }
		})
	}
})