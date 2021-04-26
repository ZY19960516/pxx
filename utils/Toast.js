
module.exports = {
    //纯文字提醒弹窗 1秒后自动消失
    showText: (msg, duration=1000) => {
        wx.showToast({
          title: msg,
          duration: 1000,
          icon: 'none'
        })
    },
    //包含成功的图片
    showSuccess: (msg) => {
      wx.showToast({
        title: msg,
        icon: 'success',
        duration: 1000,
        mask:true
      })
    },
    // Alert 弹窗提示，包含确认和取消按钮
    showAlert: (title = '提示', content, cancelText = '取消', confirmText = '确定', success) => {
      wx.showModal({
        title: title,
        content: content,
        cancelText: cancelText,
        cancelColor: '#000000',
        confirmText:confirmText,
        success: (res) => {
          if (res.confirm) {
            success(true)
          } else if (res.cancel) {
            success(false)
          }
        },
      })
    },
    //网络请求加载提示
    showProgress: (title, mask=false) => {
      wx.showLoading({
        title: title,
        mask
      })
    },
    ///网络请求加载提示 关闭 
    hiddenProgress: () => {
      setTimeout(() => {
        wx.hideLoading()
      }, 300);
    }
}