// components/time-picker/time-picker.js
const TimePickerSource = require('../../utils/timepicker')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        selectIndexs: {
            type: Array,
            value: []
        },
        range: {
            type: Array,
            value: []
        },
        showTime: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        tepIndexs: [],
        year: '',
        month: '',
        day: '',
        hour:'',
        minute: '',
        second: ''
    },

    ready:function() {
        if (this.data.range.length > 0 && this.data.selectIndexs.length > 0) {
            this.data.year = this.data.range[0][this.data.selectIndexs[0]]
            this.data.month = this.data.range[1][this.data.selectIndexs[1]]
        }
        // console.log(this.data.year, this.data.month);
    },

    methods: {

        onCancelSelect:function() {
            console.log('取消选择=');
            this.data.year = this.data.range[0][this.data.selectIndexs[0]]
            this.data.month = this.data.range[1][this.data.selectIndexs[1]]
        },
        onValueChanged:function(e) {
            const selects = e.detail.value
            this.data.year = this.data.range[0][selects[0]]
            this.data.month = this.data.range[1][selects[1]]
            this.data.day = this.data.range[2][selects[2]]
            this.data.hour = this.data.range[3][selects[3]]
            this.data.minute = this.data.range[4][selects[4]]
            this.data.second = this.data.range[5][selects[5]]
            
            const timeStr = TimePickerSource.appendingDate({
                year: this.data.year,
                month: this.data.month,
                day: this.data.day,
                hour: this.data.hour,
                minute: this.data.minute,
                second: this.data.second
            })
            this.triggerEvent('changed', {selects, timeStr})
        },

        onColumnChanged:function(e) {
            console.log('onColumnChanged=',e);
            const column = e.detail.column
            const index = e.detail.value
            const value = this.data.range[column][index]

            switch(column) {
                case 0: //选择年
                    this.data.year = value
                    var timeSource = [...this.data.range]
                    timeSource[column+2] = TimePickerSource.getTotalDates(this.data.year, this.data.month)
                    this.setData({range: timeSource})
                    break
                case 1: //选择月
                    this.data.month = value
                    var timeSource = [...this.data.range]
                    timeSource[column+1] = TimePickerSource.getTotalDates(this.data.year, this.data.month)
                    this.setData({range: timeSource})
                    break
                case 2: //选择日
                    break
                case 3: //选择时
                    break
                case 4: //选择分
                    break
                case 5: //选择秒
                    break
                default:
                    break
            } 
        }
    }
})
