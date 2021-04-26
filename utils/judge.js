const Toast = require('./Toast')

///验证金额格式
const isMoney = (money) => {
    var reg =/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if (reg.test(money)) {
        return true;
    } else {
        return false;
    };
}

///判断商家电话
const isBusinessPhone = (phone) => {
    if (phone.length === 0) {
        Toast.showText('请输入联系电话')
        return false
    } else {
        if (isPhoneNumber(phone) || (/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(phone)) || (/^\d{3,4}-\d{3,4}-\d{3,4}$/.test(phone))) {
            return true
        } else {
            Toast.showText('联系电话需要是11位的数字，固定号码最长 是12位，不得填写汉字或字母');
            return false;
        }
    }
  }

  /** 判断输入的是否是纯数字 */
const isInputNumber = (value) => {
    if (/(^[0-9]*$)/.test(value)) {
      return true
    }
    return false
}

/** 处理只能输入数字和小数点 **/
const inputMoney = (value) => {
    if (value.length == 1 && value=='.') {
        return '0.'
    }
    if (/^(\d?)+(\.\d{0,2})?$/.test(value)) { //正则验证，提现金额小数点后不能大于两位数字
        return value
    } else {
        return value.substring(0, value.length - 1);
    }
}




module.exports = {
    isInputNumber,
    isMoney,
    isBusinessPhone,
    inputMoney
}