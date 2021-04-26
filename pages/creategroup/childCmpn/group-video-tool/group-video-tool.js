// pages/creategroup/childCmpn/group-video-tool/group-video-tool.js
const lsd = require('../../../../request/utils/request')
const Toast = require('../../../../utils/Toast')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        videoUrl: {
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelectVideo:function() {
            wx.chooseVideo({
                sourceType: ['album', 'camera'],
                maxDuration: 60,
                camera: 'back',
                success:res => {
                    console.log(res);
                    if (res.duration > 0) {
                        Toast.showProgress('上传中，请稍后...', true)
                        const tempFilePath = res.tempFilePath
                        lsd.uploadFile(tempFilePath).then(lsdRes => {
                            const videoUrl = lsdRes.fileHttpUrl
                            this.hiddenProgress('上传成功！')
                            this.triggerEvent('finished', {videoUrl})                            
                        }).catch(er => {
                            this.hiddenProgress(er || '视频上传失败')
                        })
                    } else {
                        this.hiddenProgress('当前视频不可用，请重新选择！')
                    }
                }
            })
        },

        /**
         * 
         * @param {wx.getVideoInfo({
            src: videoUrl,
            success:suc => {
              console.log('获取视频信息-', suc);
              if (suc.duration > 0) {
                  this.hiddenProgress('上传成功！')
                  this.triggerEvent('finished', {videoUrl})
              } else {
                  this.hiddenProgress('当前视频不可用，请重新选择！')
              }
            },
            fail: er => {
              console.log('获取视频信息-失败-', er);
              this.hiddenProgress('当前视频不可用，请重新选择！')
            }
          })} 
         */

        hiddenProgress(msg) {
            Toast.hiddenProgress(msg)
            setTimeout(() => {
                Toast.showText(msg, 3000)
            }, 1000);
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
