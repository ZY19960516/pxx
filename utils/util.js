const formatTime = date => {
  const res = getDateTime(date)
  return [res.year, res.month, res.day].map(formatNumber).join('-') + ' ' + [res.hour, res.minute, res.second].map(formatNumber).join(':')
}

const getDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return { year, month, day, hour, minute, second}
}
const GMTToStr = time => {
  let date = new Date(time)
  let seperator1 = '-'
  let getMonth = date.getMonth() + 1
  let month = getMonth.toString().length < 2 ? '0' + getMonth : getMonth
  let strDate =( date.getDate().toString()).length < 2 ? '0' +date.getDate() : date.getDate()
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
  return currentdate
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 复制内容到粘贴板
const copyMsgToClipboard = (msg)=> {
  console.log('复制的内容为' + msg);
  wx.setClipboardData({ data: msg})
  wx.$showText('已复制！')
}
const testphone = (value) =>{
  //校验手机座机
  if (!value) {
    wx.$showText('电话不能为空');
    return false;
  } else {
    const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; // 0571-86295197
    const isPhone02 = /^\d{3,4}-\d{3,4}-\d{3,4}$/; // 4001-550-520
    const isMob = /^1[0-9]{10}$/;
    const valuePhone = value.trim();
    if (isMob.test(valuePhone) || isPhone.test(valuePhone) || isPhone02.test(valuePhone)) {
      // 正则验证
      return true;
    } else {
      wx.$showText('手机号码需要是11位的数字,固定号码最长是12位,不得填写汉字或字母');
      return false;
    }
  }
}
module.exports = {
  formatTime,
  getDateTime,
  GMTToStr,
  copyMsgToClipboard,
  testphone
}
