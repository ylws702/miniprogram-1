"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = require("../../services/map");
var city_1 = require("../../services/city");
var app_discover = getApp();
var data = {
    cityName: "北京市",
    searchValue: "",
    groupData: [],
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
};
Page({
    data: data,
    onLoad: function () {
        var that = this;
        if (app_discover.globalData.userInfo) {
            that.setData({
                userInfo: app_discover.globalData.userInfo,
                hasUserInfo: true,
            });
        }
        else if (that.data.canIUse) {
            app_discover.userInfoReadyCallback = function (res) {
                that.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            };
        }
        if (!app_discover.globalData.location) {
            wx.showLoading({
                title: "正在获取定位",
            });
            map_1.getCity()
                .then(function (value) {
                var province = value.province, city = value.city;
                return city_1.getCityId(city, province).then(function (cityInfo) {
                    app_discover.globalData.location = cityInfo;
                    console.log(cityInfo);
                    that.setData({
                        cityName: cityInfo.city,
                    });
                }, console.error);
            }, console.error)
                .finally(function () {
                wx.hideLoading();
            });
        }
        if (app_discover.globalData.searchText) {
            this.data.searchValue = app_discover.globalData.searchText;
        }
    },
    onSearchInputTap: function () {
        if (this.data.searchValue) {
            app_discover.globalData.searchText = this.data.searchValue;
        }
        wx.navigateTo({ url: "../search/search" });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXNjb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUE2QztBQUM3Qyw0Q0FBZ0Q7QUFFaEQsSUFBTSxZQUFZLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFRMUMsSUFBTSxJQUFJLEdBQVM7SUFDakIsUUFBUSxFQUFFLEtBQUs7SUFDZixXQUFXLEVBQUUsRUFBRTtJQUNmLFNBQVMsRUFBRSxFQUFFO0lBQ2IsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7Q0FDcEQsQ0FBQztBQUVGLElBQUksQ0FBQztJQUNILElBQUksTUFBQTtJQUNKLE1BQU07UUFDSixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFFBQVEsRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVE7Z0JBQzFDLFdBQVcsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUc1QixZQUFZLENBQUMscUJBQXFCLEdBQUcsVUFBQyxHQUFHO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtvQkFDdEIsV0FBVyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQ2IsS0FBSyxFQUFFLFFBQVE7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsYUFBTyxFQUFFO2lCQUNOLElBQUksQ0FBQyxVQUFDLEtBQUs7Z0JBQ0YsSUFBQSxRQUFRLEdBQVcsS0FBSyxTQUFoQixFQUFFLElBQUksR0FBSyxLQUFLLEtBQVYsQ0FBVztnQkFDakMsT0FBTyxnQkFBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO29CQUM3QyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO3FCQUN4QixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQztpQkFDaEIsT0FBTyxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRTtZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztTQUM1RDtJQUNILENBQUM7SUFDRCxnQkFBZ0I7UUFDZCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3pCLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzVEO1FBQ0QsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldENpdHkgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbWFwXCI7XHJcbmltcG9ydCB7IGdldENpdHlJZCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jaXR5XCI7XHJcblxyXG5jb25zdCBhcHBfZGlzY292ZXIgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKTtcclxuXHJcbmludGVyZmFjZSBEYXRhIHtcclxuICBjaXR5TmFtZTogU3RyaW5nO1xyXG4gIHNlYXJjaFZhbHVlOiBzdHJpbmc7XHJcbiAgZ3JvdXBEYXRhOiBHcm91cFtdO1xyXG4gIGNhbklVc2U6IGJvb2xlYW47XHJcbn1cclxuY29uc3QgZGF0YTogRGF0YSA9IHtcclxuICBjaXR5TmFtZTogXCLljJfkuqzluIJcIixcclxuICBzZWFyY2hWYWx1ZTogXCJcIixcclxuICBncm91cERhdGE6IFtdLFxyXG4gIGNhbklVc2U6IHd4LmNhbklVc2UoXCJidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvXCIpLFxyXG59O1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmIChhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgIHVzZXJJbmZvOiBhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS51c2VySW5mbyxcclxuICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoYXQuZGF0YS5jYW5JVXNlKSB7XHJcbiAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAgICAgYXBwX2Rpc2NvdmVyLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IChyZXMpID0+IHtcclxuICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCFhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5sb2NhdGlvbikge1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgdGl0bGU6IFwi5q2j5Zyo6I635Y+W5a6a5L2NXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICBnZXRDaXR5KClcclxuICAgICAgICAudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgcHJvdmluY2UsIGNpdHkgfSA9IHZhbHVlO1xyXG4gICAgICAgICAgcmV0dXJuIGdldENpdHlJZChjaXR5LCBwcm92aW5jZSkudGhlbigoY2l0eUluZm8pID0+IHtcclxuICAgICAgICAgICAgYXBwX2Rpc2NvdmVyLmdsb2JhbERhdGEubG9jYXRpb24gPSBjaXR5SW5mbztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2l0eUluZm8pO1xyXG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIGNpdHlOYW1lOiBjaXR5SW5mby5jaXR5LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sIGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgICAgIH0sIGNvbnNvbGUuZXJyb3IpXHJcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5zZWFyY2hUZXh0KSB7XHJcbiAgICAgIHRoaXMuZGF0YS5zZWFyY2hWYWx1ZSA9IGFwcF9kaXNjb3Zlci5nbG9iYWxEYXRhLnNlYXJjaFRleHQ7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblNlYXJjaElucHV0VGFwKCkge1xyXG4gICAgaWYgKHRoaXMuZGF0YS5zZWFyY2hWYWx1ZSkge1xyXG4gICAgICBhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5zZWFyY2hUZXh0ID0gdGhpcy5kYXRhLnNlYXJjaFZhbHVlO1xyXG4gICAgfVxyXG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogXCIuLi9zZWFyY2gvc2VhcmNoXCIgfSk7XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==