# 微信小程序下拉菜单

公司app想翻成小程序，无奈没找到下拉菜单能直接用的，就自己写一个。

### 效果图
![](https://github.com/lostguo/CDropDownMenu/blob/master/aa.gif)

### wxml 布局文件
    <!-- tab栏flex布局 -->
    <view class="cxj-menu">
      <view class="flex-view{{item.active?' active':''}}" wx:for="{{tabTxt}}" wx:key="" data-index="{{index}}" bindtap="filterTab">
        <text>{{item.text}}</text>
        <image src="/image/arrow.png" class="cxj-icon"></image>
      </view>
    </view>
    <!-- tab下拉选项布局 -->
    <view class="cxj-tab-layout" hidden="{{!item.active}}" wx:for="{{tabTxt}}"  wx:for-item="item" data-index="{{index}}" bindtap="filterTabChild">
        <view class="{{item.type==0?'active':''}}" data-id="0" data-index="0" bindtap="filter">不限</view>
        <view class="{{item.type==item_child.id?'active':''}}" wx:for="{{item.child}}" wx:for-item="item_child" wx:key="" data-id="{{item_child.id}}" data-index="0" data-txt="{{item_child.text}}" bindtap="filter">{{item_child.text}}</view>
    </view>

### wxss 样式文件（比较乱，毕竟我主职是后端啊）
    .cxj-menu {
      background-color: #f5f5f5;
      width: 750rpx;
      height: 80rpx;
      display: flex;
      flex-wrap: nowrap;
      font-size: 32rpx;
    }
    .cxj-menu .active image {
      transform: rotate(180deg);
      background: none;
    }
    .cxj-menu .active {
      background-color: #fff;
    }
    .flex-view {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      overflow: hidden;
      display: block;
      text-align: center;
      line-height: 80rpx;
    }
    
    .cxj-icon {
      width: 24rpx;
      height: 24rpx;
      vertical-align: middle;
      margin-left: 5px;
    }
    
    .cxj-content {
      width: 750rpx;
      font-size: 28rpx;
    }
    
    .cxj-content-li {
      line-height: 60rpx;
      text-align: center;
    }
    
    .cxj-tab-layout {
      width: 750rpx;
      overflow: hidden;
      position: fixed;
      top: 80rpx;
      z-index: 1;
      border-bottom: solid 1px #eee;
      height: 100%;
      background-color: rgba(000,000,000,.5);
      
    }
    
    .cxj-tab-layout .active {
      color: #00aa14;
    }
    
    .cxj-tab-layout view {
      width: 750rpx;
      text-indent: 40rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-top: 1rpx solid #e7e7e7;
      background-color:#ffffff;
      
    }
    
### js文件
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