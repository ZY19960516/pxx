// pages/creategroup/childCmpn/group-image-tool/group-image-tool.js
const lsd = require('../../../../request/utils/request')
const Toast = require('../../../../utils/Toast')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        //isLarge 是否是大图
        isLarge: {
            type: Boolean,
            value: false
        },
        images: {
            type: Array,
            value: []
        },

        largeImage: {
            type:String,
            value: ''
        },
        upEnable: {
            type: Boolean,
            value: true
        },
        dwonEnable: {
            type: Boolean,
            value: true
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentCount: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        selectImage:function() {
            if (this.data.currentCount < 9) {
                this.onChoseImage()
            }
        },
        ///删除
        onMinDelete:function(e) {
            const index = e.currentTarget.dataset.index
            let images = [...this.data.images]
            images.splice(index, 1)
            this.triggerEvent('minFinished', {images})
        },
        ///选择大图
        onSelectLargeImage:function() {
            this.onChoseImage()
        },
        //删除大图
        onDeleteBig:function() {
            this.triggerEvent('largeFinished', {largeImage: ''})
        },
        ///选择图片
        onChoseImage:function() {
            const count = this.data.isLarge ? 1 : (9-this.data.currentCount)
            wx.chooseImage({
                count,
                sourceType:['album', 'camera'],
                sizeType: ['compressed'],
                success:res => {
                    console.log(res);
                    if (this.data.isLarge) {
                        this.uploadImage(res.tempFilePaths)
                    } else {
                        this.uploadImage(res.tempFilePaths)
                    }
                }
            })
        },
        // 提交图片
        uploadImage(tempFilePaths) {
            tempFilePaths.forEach(imagePath => {
                wx.compressImage({
                    src:  imagePath, // 图片路径
                    quality: 80, // 压缩质量
                    success: pressRes => {
                        lsd.uploadFile(pressRes.tempFilePath).then(lsdRes => {
                            const imageUrl = lsdRes.fileHttpUrl
                            if (this.data.isLarge) { //提交大图
                                this.triggerEvent('largeFinished', {largeImage: imageUrl})
                            } else {  //提交小图
                                var images = [...this.data.images]
                                images.push(imageUrl)
                                this.data.currentCount = images.length
                                this.triggerEvent('minFinished', {images})
                            }
                        }).catch(er => {
                            Toast.showText(er || '', 3000)
                        })
                    },
                    fail: pressEr => {
                        Toast.showText('图片上传失败', 3000)
                    }
                })
            })
        },

        noMoveUp: function() {
            this.triggerEvent('up')
        },
        onMoveDwon: function() {
            this.triggerEvent('down')
        },
        onDelete: function() {
            this.triggerEvent('delete')
        }
    }
})
