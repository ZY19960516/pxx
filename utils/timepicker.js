const Utils = require('./util');

module.exports = {

    getTime: () => {
        var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);
        const res = Utils.getDateTime(date)

        let year = getNumbers(res.year+10, '年', res.year)
        let month = getNumbers(13, '月', 1)
        let hour = getNumbers(24, '时')
        let mTime = getNumbers(60, '分')
        let sTime = getNumbers(60, '秒')
        let days = totalDates(`${res.year}`, `${res.month}`)
        const times = {
            curDate: {
                year: `${res.year}年`, 
                month: res.month < 10 ? `0${res.month}月` : `${res.month}月`,
                day:  res.day < 10 ? `0${res.day}日` : `${res.day}日`,
                hour: res.hour < 10 ? `0${res.hour}时` : `${res.hour}时`,
                minute: res.minute < 10 ? `0${res.minute}分` : `${res.minute}分`,
                second: res.second < 10 ? `0${res.second}秒` : `${res.second}秒`
            },
            source:[ year, month, days, hour, mTime, sTime ],
            selectIndex:[0, res.month-1, res.day-1, res.hour, res.minute, res.second]
        }
        console.log(times);
        return times
    },

    getTotalDates: (year, month) => {
        return totalDates(year.toString(), month.toString())
    },
    ///获取某年月的天数总和
    getMonthTotalDay: (year, month) => {
        return getDate(year, month, 0)
    },
     //拼接数据
    appendingDate: (curDate) => {
        var repStr = curDate.year+curDate.month+curDate.day+curDate.hour+curDate.minute+curDate.second
        ///处理时间
        repStr = repStr.replace(/年/, '-')
        repStr = repStr.replace(/月/, '-')
        repStr = repStr.replace(/日/, ' ')
        repStr = repStr.replace(/时/, ':')
        repStr = repStr.replace(/分/, ':')
        repStr = repStr.replace(/秒/, '')
        return repStr
    }
}



///获取某年某月的天数数组
const totalDates = (year, month) => {
    console.log('计算天数的年月=', year, month);
    const monthStr = month.replace(/月/, '')     
    if (['1','3','5','7','8','10','12'].includes(monthStr)) {
        return getNumbers(32, '日', 1)
    } else if (['4','6','9','11'].includes(monthStr)) {
        return getNumbers(31, '日', 1)
    } else {
        const yearStr = year.replace(/年/, '')
        let maxDay = getDate(yearStr, monthStr, 0)
        return getNumbers(maxDay+1, '日', 1)
    }
}

///获取某年某月的天数
const getDate = (year, month) => {
    const dd = new Date(year, month, 0)
    return dd.getDate()
}

///unit单位
const getNumbers = (endCout, unit, minIndex = 0) => {
    let numbers = []
    for (var index = minIndex; index < endCout; index++) {
        if (index < 10) {
            numbers.push(`0${index}${unit}`)
        } else {
            numbers.push(`${index}${unit}`)
        }
    }
    return numbers
}

///根据时间字符串来获取range 和 index
const getTimeFromStr = (range, timeStr) => {
    //把时间字符串分开
    const timeArr = timeStr.split(' ')
    const yearArr = timeArr[0]

}
