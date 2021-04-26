// pages/logistics/childCmpn/logistics-select/logistics-select.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        logistics: {
            type:Object,
            value: {}
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
        onSelect:function(e) {
            const selected = e.detail.selected
            this.triggerEvent('statusChange', {selected})
        },
       
        onSelectSetting:function() {
            this.triggerEvent('select')
        }
        
        // onSelectcheckDefault:function() {
        //     this.triggerEvent('check')
        // },
    }
})
