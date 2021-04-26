/**
 * 小数保留处理
 * @param priceNum 价格数字（单位元）
 * @param len 保留的小数长度
 * @param dir 取整方向，f (floor) 为向下取整，默认值；c（ceiling）为向上取整
 */
function getDecimal(priceNum, len, dir) {
  // if (!priceNum || !len) {
  //   return false;
  // }
  dir = dir || 'f';
  priceNum = parseFloat(priceNum, 10);
  len = parseInt(len, 10);

  if (dir === 'f') {
    let intNumStr = priceNum.toString().split('.')[0];
    let decimalNumStr = priceNum.toString().split('.')[1] || '00';
    if (decimalNumStr.length < 2) {
      decimalNumStr += '0';
    }

    return intNumStr + '.' + decimalNumStr.substring(0, len);
  } else {
    return priceNum.toFixed(len);
  }
}

export default Component({
  behaviors: [],
  properties: {
    symbol: {
      type: String,
      value: '￥'
    },
    value: {
      type: [Number, String],
      value: ''
    },
    icon: {
      type: [String],
      value: ''
    },
    status: {
      type: String,
      value: ''
    },
    delColor: {
      type: String,
      value: '#999'
    },
    decimal: {
      type: String,
      value: '2'
    },
    decimalNum: {
      type: [Number, String],
      value: ''
    }
  },
  observers: {
    'value': function (v) {
      // var tmp = this.setPrice(value)
      // if (this.data.value == tmp)
      //   return

      // 在 numberA 或者 numberB 被设置时，执行这个函数
      this.setData({
        price: this.setPrice(v)
      })
    }
  },
  data: {
    price: 0
  },
  methods: {
    setPrice(v) {
      if (v >= 0) {
        switch (this.data.decimal) {

          // 保留一位小数
          case '1': {
            v = getDecimal(v, 1);
            break;
          }

          // 只显示整数
          case 'none': {
            v = parseInt(v);
            break;
          }

          // 小数部分缩小
          case 'small': {
            v = parseInt(v).toString().trim();

            this.setData({
              decimalNum: (v.toString().split('.')[1] || '00').trim()
            });
            break;
          }
          default: {
            v = getDecimal(v, 2);
            break;
          }
        }
      }
      return v
    },
  },
});