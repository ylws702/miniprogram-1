const cityName = '佛山';
const app_discover = getApp<IAppOption>();

// POST请求地址
//apis.map.qq.com/place_cloud/data/create
// 请求头：content-type:application/json

//TODO:
// https: const getSig = () => {
//     const key = 'WEZBZ-D5JWP-F5EDI-VOBGX-B33O3-F5F25';
//     const sk = 'DrBLvItfwBZOIwDdPFqGJ3EyswTPBme';
// };

Page({
    data: {
        cityName,
        searchValue: '',
        groupData:[
            {
                user:{
                    userName:'用户名'
                },
                image:'',
                title:'这里是标题XXXXXX',
                introduction:'这里是简介XXXXXXXXXXXXXXX',
                like:999,

            },
            {
                user:{
                    userName:'用户名'
                },
                image:'',
                title:'这里是标题XXXXXX',
                introduction:'这里是简介XXXXXXXXXXXXXXX',
                like:999,

            },
            {
                user:{
                    userName:'用户名'
                },
                image:'',
                title:'这里是标题XXXXXX',
                introduction:'这里是简介XXXXXXXXXXXXXXX',
                like:999,

            },
            {
                user:{
                    userName:'用户名'
                },
                image:'',
                title:'这里是标题XXXXXX',
                introduction:'这里是简介XXXXXXXXXXXXXXX',
                like:999,

            },
            {
                user:{
                    userName:'用户名'
                },
                image:'',
                title:'这里是标题XXXXXX',
                introduction:'这里是简介XXXXXXXXXXXXXXX',
                like:999,

            },
        ],
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    onLoad() {
        if (app_discover.globalData.userInfo) {
            this.setData({
                userInfo: app_discover.globalData.userInfo,
                hasUserInfo: true,
            });
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app_discover.userInfoReadyCallback = (res) => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            };
        }
        if (!app_discover.globalData.location) {
            wx.getLocation &&
                wx.getLocation({
                    success(res) {
                        app_discover.globalData.location = res;
                        console.log(res);
                    },
                });
        }
        if (app_discover.globalData.searchText) {
            this.data.searchValue = app_discover.globalData.searchText;
        }
    },
    onSearchInputTap() {
        if (this.data.searchValue) {
            app_discover.globalData.searchText = this.data.searchValue;
        }
        wx.navigateTo({ url: '../search/search' });
    },
});
