// pages/productspecs/childCmpn/product-specs-detail/product-specs-detail.js
const defaultImage = '/assets/images/group/select_product_image.png'
const lsd = require('../../../../request/utils/request')
const Judge = require('../../../../utils/judge')
const Toast = require('../../../../utils/Toast')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        source: {
            type: Object,
            value: {}
        },
        total: {
            type: Number,
            value: 0
        },
        current: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selectImage:defaultImage,
        coverImage: '',
        price: '',
        stock: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {

        ///删除image
        onDeleteImage:function() {
            let detial = {...this.data.source}
            detial.image = ''
            this.onAction(detial)
        },

        onFinishedPrice:function(e) {
            const value = e.detail.value
            const money = Judge.inputMoney(value)
            let detial = {...this.data.source}
            detial.specsPrice = money
            this.onAction(detial)
        },
        onStock:function(e) {
            const value = e.detail.value
            let detial = {...this.data.source}
            detial.stock = value
            this.onAction(detial)
        },
        selectCoverImg:function() {
            if (!this.data.source.image) {
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['album', 'camera'],
                    success: res => {
                        const path = res.tempFilePaths[0]
                        wx.compressImage({
                            src:  path, // 图片路径
                            quality: 80, // 压缩质量
                            success: pressRes => {
                                lsd.uploadFile(pressRes.tempFilePath).then(res => {
                                    let detial = {...this.data.source}
                                    detial.image = res.fileHttpUrl
                                    this.onAction(detial)
                                }).catch(er => {
                                    Toast.showText(er || '', 3000)
                                })
                            },
                            fail: pressEr => {
                                Toast.showText('图片上传失败', 3000)
                            }
                        })
                    },
                    fail: er => {
                        console.log('选择图片出现错误', er);
                    }
                })
            }
        },

        onAction:function(source) {
            this.triggerEvent('finished', {source})
        }
    }
})
