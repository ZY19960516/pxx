// pages/groupDetail/index.js
import {
   showText
} from '../../utils/Toast'
import share from '../../utils/share.js'
const lsd = require('../../request/home');
const Constant = require('../../request/utils/constant')

//选择的商品列表map(key:商品id+规格id,value:商品)
var selGoodsMap
var groupId
Page({

   /**
    * 页面的初始数据
    */
   data: {
      res: null,
      //转json对象后根据type解析展示
      //type 1-文字 2-小图 3-大图 4-视频 5-标签
      groupContent: [],
      isExpand: false,
      showCartAlert: false,
      showGoodsAlert: false,
      goodsList: [], //可选的商品列表
      soldOutList: [], //已售罄的商品列表
      //选中后即将要展示的商品详情
      curGoodsDetail: {},
      selGoodsList: [], //选择的商品列表（小程序data里不支持声明map类型，所以单独用数组来装选择的商品）
      selRuleId: 0, //选择的规格
      totalNum: 0, //购买数量
      totalPrice: 0, //总价
      curLoginUserId: '',
      isOverShare:true,//全局设置是否重写分享
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log(options, 'options');
      //page外的数据是共享的，所以每次进入页面重新创建
      selGoodsMap = new Map()
      groupId = options.id
      if (options.openType == 1) {
         share.joinGroup(groupId, options.shareUserId)
      }//从分享的小程序进入
      wx.setNavigationBarTitle({
         title: options.title,
      })

      lsd.getGroupDetail(groupId).then(res => {
         res.startingAmount = parseFloat(res.startingAmount)
         const gList = res.groupProductList || {}
         this.filterSoldGoodsAndSetDefaulSelRule(gList)
         var gc
         try {
            gc = JSON.parse(res.groupContent)
            console.log("groupContent>>>>", gc);
         } catch (error) {}

         this.setData({
            res: res,
            goodsList: gList,
            soldOutList: this.data.soldOutList,
            groupContent: gc,
            curLoginUserId: wx.getStorageSync(Constant.storageKey.userId_key)
         })
      })
   },

   /**该页面所有的数量选择变化均会回调该方法 */
   OnNumResult(e) {
      //加购前先校验团状态（团购状态 0未开始 1进行中 2结束）
      const groupStatus = this.data.res.groupStatus
      if (groupStatus != 1) {
         if (groupStatus == 0) {
            showText("该团购尚未开始")
         } else {
            showText("该团购已结束")
         }

         this.resetCounter()
         return
      }

      var goods = e.detail
      //分清是哪个页面传来的商品信息
      const c = this.data.showGoodsAlert ? this.data.curGoodsDetail : goods
      const selRule = this.findSelRule(c)

      const key = goods.id + selRule.id
      if (goods.num > 0) {
         //更新加购商品的商品规格
         this.insertRule2Goods(goods, selRule)
         selGoodsMap.set(key, goods)
      } else {
         selGoodsMap.delete(key)
      }

      //更新商品列表的数量
      for (let i = 0; i < this.data.goodsList.length; i++) {
         const element = this.data.goodsList[i];
         if (element.id == goods.id) {
            element.num = goods.num
            break
         }
      }
      //计算选择的商品总数、总价、选择的商品转成数组
      var tmpNum = 0
      var tmpPrice = 0
      this.data.selGoodsList = [] //每次都重新计算，所以要清空
      for (let value of selGoodsMap.values()) {
         this.data.selGoodsList.push(value)
         //计算选择商品总数
         const num = parseInt(value.num)
         tmpNum += num
         //计算选择商品的总价
         tmpPrice += value.proPrice * num
      }

      console.log("商品数量变化>>>>>", this.data.selGoodsList);

      //总数减到0时隐藏整个购物车弹窗
      this.data.showCartAlert && tmpNum == 0 && this.ctrlCartAlert()

      this.setData({
         totalNum: tmpNum,
         totalPrice: tmpPrice,
         selGoodsList: this.data.selGoodsList,
         goodsList: this.data.goodsList
      })
   },

   /**点击多规格时的回调 */
   onRuleSel(e) {
      const rule = e.currentTarget.dataset.item
      var c = this.data.curGoodsDetail

      if (e.currentTarget.dataset.isrule1 == 1) { //点击规格1
         c.selRule1 = rule
      } else {
         c.selRule2 = rule
      }
      const selRule = this.findSelRule(c)

      //选择商品规格的时候，同步更新弹窗里面对应规格的商品信息
      this.insertRule2Goods(c, selRule)

      const selGoods = selGoodsMap.get(c.id + c.ruleId)
      //如果当前规格的商品已经加入过购物车，则取出之，并更新数量
      c.num = selGoods ? selGoods.num : 0

      this.setData({
         curGoodsDetail: c
      })
   },

   /**过滤已售完的商品并且为每件商品设置默认选中项及选中的规格id，方便后续使用 */
   filterSoldGoodsAndSetDefaulSelRule(goodsList) {
      const tmp = [...goodsList]
      for (let i = 0; i < tmp.length; i++) {
         const v = tmp[i];
         v.selRule1 = v.selRule2 = ''
         //设置默认选中第一个规格
         if (v.ruleList.length > 0) {
            v.selRule1 = v.ruleList[0].item[0]
         }
         if (v.ruleList.length > 1) {
            v.selRule2 = v.ruleList[1].item[0]
         }
         const selRule = this.findSelRule(v)
         v.ruleId = selRule ? selRule.id : ''
         //对应商品规格的封面图
         v.selRuleImg = selRule ? selRule.ruleImg || v.proImg[0] : v.proImg[0]
         if (v.surplusStock <= 0 || v.limitBuy <= 0) {
            //如果该商品库存==0，则从列表移除，并把它添加到soldOutList
            this.data.soldOutList = [...goodsList.splice(i, 1)]
         }
      }
   },

   /**向商品中插入选择的规格信息 */
   insertRule2Goods(goods, selRule) {
      goods.ruleId = selRule.id
      goods.proPrice = selRule.price
      goods.stock = selRule.stock
      goods.surplusStock = selRule.stock
      goods.selRuleImg = selRule.ruleImg
   },

   expandGoods() {
      const isExpand = this.data.isExpand
      var goodsList = this.data.goodsList
      const soldOutList = this.data.soldOutList
      if (isExpand) {
         const index = goodsList.length - soldOutList.length
         goodsList.splice(index, soldOutList.length)
      } else {
         goodsList = goodsList.concat(soldOutList)
      }
      this.setData({
         isExpand: !isExpand,
         goodsList: goodsList,
         soldOutList: soldOutList
      })
   },

   previewImage(e) {
      var imgs = e.currentTarget.dataset.imglist
      //imgs不是数组就创建数组
      if (!Array.isArray(imgs))
         imgs = [imgs]
      wx.previewImage({
         current: e.currentTarget.dataset.item, // 当前显示图片的http链接
         urls: imgs // 需要预览的图片http链接列表
      })
   },

   //参团购买
   buy() {
      if (this.data.totalNum <= 0) {
         showText("请先选择商品")
         return
      }
      if (this.data.res.startingAmount > 0 && this.data.res.startingAmount > this.data.totalPrice) {
         showText("该活动起购价为" + this.data.res.startingAmount + "元")
         return
      }

      const selGoodsList = encodeURIComponent(JSON.stringify([...selGoodsMap.values()]))
      const groupInfo = encodeURIComponent(JSON.stringify(this.data.res))
      wx.navigateTo({
         url: `/pages/goodsPrePay/index?goodsList=${selGoodsList}&groupInfo=${groupInfo}`,
      })
   },

   //底部弹窗--购物车
   ctrlCartAlert() {
      if (this.data.showGoodsAlert)
         this.ctrlGoodsAlert()
      this.setData({
         showCartAlert: !this.data.showCartAlert && selGoodsMap.size > 0
      })
   },
   //底部弹窗--商品详情
   ctrlGoodsAlert(e) {
      var goods
      if (e) {
         goods = e.currentTarget.dataset.item
         if (!this.data.showGoodsAlert && goods) {
            const selRule = this.findSelRule(goods)
            if (!selRule) return
            this.insertRule2Goods(goods, selRule)
         }
      }
      this.setData({
         showGoodsAlert: !this.data.showGoodsAlert,
         curGoodsDetail: goods
      })
   },

   /**从某商品的规格组合中查找选择的规格信息 */
   findSelRule(goods) {
      if (!goods || !goods.manyRules)
         return
      var selRule
      const selRule1 = goods.selRule1
      const selRule2 = goods.selRule2
      for (let i = 0; i < goods.manyRules.length; i++) {
         const v = goods.manyRules[i];
         if (goods.isSingleRule == 0) { //该商品有2个规格
            //选择的两个规格都匹配才返回
            if (selRule1 === v.ruleOneName && selRule2 === v.ruleTwoName) {
               selRule = v
               break
            }
         } else {
            //只需匹配规格一就返回
            if (selRule1 === v.ruleOneName) {
               selRule = v
               break
            }
         }
      }
      console.log("匹配到的规格>>>>>", selRule);
      if (!selRule) {
         showText('‘' + goods.proName + '’的商品规格异常')
         this.resetCounter(goods)
      }
      return selRule
   },

   /**清零计数器 */
   resetCounter(goods) {
      this.data.curGoodsDetail.num = 0
      this.data.goodsList.forEach(v => {
         if (goods && goods.id == v.id || !goods)
            v.num = 0
      });
      this.setData({
         curGoodsDetail: this.data.curGoodsDetail,
         goodsList: this.data.goodsList
      })
   },

   //跳转团长个人主页
   intoCaptain(e) {
      wx.navigateTo({
         url: `/pages/captain/index?id=${e.mark.myMark.userId}&title=${e.mark.myMark.groupUserName}`,
      })
   },

   //生成图片发朋友圈
   shareImg() {

   },

   //我的订单
   introOrder() {
      wx.navigateTo({
         url: '/pages/mine/order/index',
      })
   },

   //编辑团
   edit() {
      wx.navigateTo({
         url: `/pages/creategroup/index?groupId=${groupId}&isEdit=1`
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

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage(e) {
      const groupItem = e.target ? e.target.dataset.item : ''
      const groupTittle = e.from == 'button' ? `${groupItem.groupUserName}发起的团` : '立省多'
      const img = groupItem.groupUserHeader && groupItem.groupUserHeader.length > 0 ? groupItem.groupUserHeader : 'https://c.lishengduo.com/wt/images/minip_icon.png'
      const groupId = groupItem.id ? groupItem.id : ''
      return share.getGroupShareInfo(groupTittle,img,e.from,groupId)
   },
})