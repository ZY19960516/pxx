// pages/addproduct/add-product-image/add-product-image.js
const lsd = require('../../../../request/utils/request')
const Toast = require('../../../../utils/Toast')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        images: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //删除图片
        onDelete:function(e) {
            const index = e.currentTarget.dataset.index
            this.triggerEvent('delete', {index})
        },
        //选择图片
        onSelect:function() {
            const slectCount = 9 - this.data.images.length
            if (slectCount <= 0) return 
            wx.chooseImage({
                count: slectCount,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: res => {
                    console.log(res);
                    
                    const tempImages =  res.tempFilePaths
                    const that = this
                    console.log(tempImages,'tempImages');
                    tempImages.forEach(imagePath => {
                        wx.compressImage({
                            src: imagePath, // 图片路径
                            quality: 80, // 压缩质量
                            success: pressRes => {
                                // console.log(JSON.stringify(pressRes.tempFilePath),'pressRes.tempFilePath');
                                // debugger
                                lsd.uploadFile(pressRes.tempFilePath).then(lsdRes => {
                                    const imageUrl = lsdRes.fileHttpUrl
                                    that.triggerEvent('imgpath', {imageUrl})
                                }).catch(er => {
                                    Toast.showText(er || '', 3000)
                                })
                            },
                            fail: pressEr => {
                                Toast.showText('图片上传失败', 3000)
                            }
                        })
                    })
                }
            })
        }
    }
})
