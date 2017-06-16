//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        tabTxt: [
            {
                'text': '语种',
                'originalText': '语种',
                'active': false,
                'child': [
                    { 'id': 1, 'text': '华语' },
                    { 'id': 2, 'text': '粤语' },
                    { 'id': 3, 'text': '欧美' }
                ],
                'type': 0
            },
            {
                'text': '风格',
                'originalText': '风格',
                'active': false,
                'child': [
                    { 'id': 1, 'text': '流行' },
                    { 'id': 2, 'text': '摇滚' },
                    { 'id': 3, 'text': '民谣' },
                    { 'id': 4, 'text': '轻音乐' }
                ], 'type': 0
            },
            {
                'text': '场景',
                'originalText': '场景',
                'active': false,
                'child': [
                    { 'id': 1, 'text': '学习' },
                    { 'id': 2, 'text': '工作' },
                    { 'id': 3, 'text': '运动' }
                ],
                'type': 0
            },
            {
                'text': '情感',
                'originalText': '情感',
                'active': false,
                'child': [
                    { 'id': 1, 'text': '怀旧' },
                    { 'id': 2, 'text': '清新' },
                    { 'id': 3, 'text': '治愈' }
                ],
                'type': 0
            }
        ],
        searchParam: []
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    filterTab: function (e) {
        var that = this;
        var data = JSON.parse(JSON.stringify(that.data.tabTxt));
        var index = e.currentTarget.dataset.index;
        var newTabTxt = data.map(function (e) {
            e.active = false;
            return e;
        });
        newTabTxt[index].active = !that.data.tabTxt[index].active;
        this.setData({
            tabTxt: data
        })

    },
    filterTabChild: function (e) {

        //我需要切换选中项 修改展示文字 并收回抽屉  
        var that = this;
        var index = e.currentTarget.dataset.index;
        var data = JSON.parse(JSON.stringify(that.data.tabTxt));
        if (typeof (e.target.dataset.id) == 'undefined' || e.target.dataset.id == '') {
            data[index].active = !that.data.tabTxt[index].active;
        }
        else {
            data[index].type = e.target.dataset.id;
            data[index].active = !that.data.tabTxt[index].active;
            if (e.target.dataset.id=='0'){
                data[index].text = that.data.tabTxt[index].originalText;
                //不限删除条件
                delete that.data.searchParam[index];
            }
            else{
                data[index].text = e.target.dataset.txt;
                //更改删除条件
                that.data.searchParam[index] = data[index].text;
            }
            
            
        }

        that.setData({
            tabTxt: data
        })
        console.log(that.data.searchParam);


    }
})
