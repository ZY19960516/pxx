


module.exports = {
    ///商品库分类
    categorys: ['全部', '零食', '水果', '鲜花', '海鲜', '肉蛋', '美妆', '蔬菜', '日用品', '服装', '居家'],
    ///商品标签
    productTags: ['团长推荐', '爆款返场', '网红爆款', '顺丰包邮', '今日必买', '新品上市'],
    ///团购隐私设置
    groupPrivices: [
        {name: '所有人均可转发', type: 1}
        // {name: '只有发布者可转发', type: 2},
        // {name: '隐藏团购且所有人均可转发', type: 3}
    ], 
     ///团购隐私设置
     groupUserShows: [
        {name: '显示头像+微信名', type: 1}
        // {name: '只显示微信匿名', type: 2},
        // {name: '只显示头像', type: 3},
        // {name: '只显示微信名', type: 4},
    ],
    ///团购是否允许复制
    groupCopys: [
        {name: '不允许其他人复制团购', type: 0},
        // {name: '允许其他人复制团购', type: 1}
        {name: '允许指定团员复制', type: 2}
    ],
    ///团购设置团长帮卖
    groupHelpSoldSource: [
        {name: '否', type: 0}, 
        {name: '是', type: 1}
    ],

    ///物流
    groupLogistics: [
        {name: '快递', type: 1}, 
        {name: '自提', type: 2}, 
        {name: '其他', type: 3}
    ],

    ///团购起购价
    groupStartPrice: ['每次跟团需达到起购价', '首次跟团需达到起购价'],
    ///可购买数量
    groupBuyNumber: () => {
        let source = ['不限购', '必须购买']
        for (var index = 1; index < 100; index++) {
            source.push(`最多${index}件`)
        }
        return source
    }
}
