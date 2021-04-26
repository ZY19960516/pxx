Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list:{
            type: Array, 
            value:[]
        },
        detailsType:{
            type:String,
            value:''
        }
    },
    options:{
        addGlobalClass:true
    },
    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        itemTitle:"",
        newList:[]
    },
    observers:{
        list(params) {
            let newList = []
            switch (this.data.detailsType) {
                case 'BillingDetails':
                    newList = this.data.list.map(item=>{
                        item['title'] = item.orderNo ? item.orderNo : ''
                        item['date'] = item.tradingTime ? item.tradingTime : ''
                        return item
                    })
                    this.setData({
                        newList,
                        itemTitle:'订单号'
                    })
                    
                    break;
                case 'IncomeDetails':
                    newList = this.data.list.map(item=>{
                        item['title'] = item.groupTitle ? item.groupTitle : ''
                        item['date'] = item.billTime ? item.billTime : ''
                        return item
                    })
             
                    this.setData({
                        itemTitle:'活动名称',
                        newList
                    })
                    break;
                case 'leagueMember':
                    newList = this.data.list.map(item=>{
                        item['title'] = item.memberName ? item.memberName : ''
                        item['date'] = item.createdAt ? item.createdAt : ''
                        item['type'] = 3
                        return item
                    })
                    this.setData({
                        itemTitle:'团员名称',
                        newList
                    })
                    console.log(newList,'newList');
                    break;
                default:
                    break;
            }
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
    }
})
