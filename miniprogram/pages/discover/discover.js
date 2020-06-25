"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = require("../../services/map");
var city_1 = require("../../services/city");
var group_1 = require("../../services/group");
var util_1 = require("../../utils/util");
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
        var _this = this;
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
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var city, cityInfo, cityId, groupData, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, 5, 6]);
                            wx.showLoading({
                                title: "正在获取定位",
                            });
                            return [4, map_1.getCity()];
                        case 1:
                            city = _a.sent();
                            return [4, city_1.getCityId(city)];
                        case 2:
                            cityInfo = _a.sent();
                            cityId = cityInfo.cityId;
                            app_discover.globalData.location = cityInfo;
                            console.log(cityInfo);
                            that.setData({
                                cityName: cityInfo.city,
                            });
                            return [4, group_1.getGroupsByCityId({ cityId: cityId })];
                        case 3:
                            groupData = _a.sent();
                            that.setData({ groupData: groupData });
                            return [3, 6];
                        case 4:
                            error_1 = _a.sent();
                            wx.hideLoading();
                            console.error(error_1);
                            util_1.toastError("获取定位失败");
                            return [3, 6];
                        case 5:
                            wx.hideLoading();
                            return [7];
                        case 6: return [2];
                    }
                });
            }); })();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXNjb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUE2QztBQUM3Qyw0Q0FBZ0Q7QUFFaEQsOENBQXlEO0FBQ3pELHlDQUE4QztBQUU5QyxJQUFNLFlBQVksR0FBRyxNQUFNLEVBQWMsQ0FBQztBQVExQyxJQUFNLElBQUksR0FBUztJQUNqQixRQUFRLEVBQUUsS0FBSztJQUNmLFdBQVcsRUFBRSxFQUFFO0lBQ2YsU0FBUyxFQUFFLEVBQUU7SUFDYixPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztDQUNwRCxDQUFDO0FBRUYsSUFBSSxDQUFDO0lBQ0gsSUFBSSxNQUFBO0lBQ0osTUFBTTtRQUFOLGlCQTZDQztRQTVDQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFFBQVEsRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVE7Z0JBQzFDLFdBQVcsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUc1QixZQUFZLENBQUMscUJBQXFCLEdBQUcsVUFBQyxHQUFHO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtvQkFDdEIsV0FBVyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQ3JDLENBQUM7Ozs7Ozs0QkFFRyxFQUFFLENBQUMsV0FBVyxDQUFDO2dDQUNiLEtBQUssRUFBRSxRQUFROzZCQUNoQixDQUFDLENBQUM7NEJBQ1UsV0FBTSxhQUFPLEVBQUUsRUFBQTs7NEJBQXRCLElBQUksR0FBRyxTQUFlOzRCQUNYLFdBQU0sZ0JBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQTs7NEJBQWhDLFFBQVEsR0FBRyxTQUFxQjs0QkFDOUIsTUFBTSxHQUFLLFFBQVEsT0FBYixDQUFjOzRCQUM1QixZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7NEJBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJOzZCQUN4QixDQUFDLENBQUM7NEJBQ2UsV0FBTSx5QkFBaUIsQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsRUFBQTs7NEJBQS9DLFNBQVMsR0FBRyxTQUFtQzs0QkFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUMsQ0FBQzs7Ozs0QkFFNUIsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQUssQ0FBQyxDQUFDOzRCQUNyQixpQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7NEJBRXJCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7aUJBRXBCLENBQUMsRUFBRSxDQUFDO1NBQ047UUFDRCxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1NBQzVEO0lBQ0gsQ0FBQztJQUNELGdCQUFnQjtRQUNkLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDekIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDNUQ7UUFDRCxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Q2l0eSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9tYXBcIjtcclxuaW1wb3J0IHsgZ2V0Q2l0eUlkIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NpdHlcIjtcclxuaW1wb3J0IHsgR3JvdXAsIElBcHBPcHRpb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxcIjtcclxuaW1wb3J0IHsgZ2V0R3JvdXBzQnlDaXR5SWQgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZ3JvdXBcIjtcclxuaW1wb3J0IHsgdG9hc3RFcnJvciB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsXCI7XHJcblxyXG5jb25zdCBhcHBfZGlzY292ZXIgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKTtcclxuXHJcbmludGVyZmFjZSBEYXRhIHtcclxuICBjaXR5TmFtZTogU3RyaW5nO1xyXG4gIHNlYXJjaFZhbHVlOiBzdHJpbmc7XHJcbiAgZ3JvdXBEYXRhOiBHcm91cFtdO1xyXG4gIGNhbklVc2U6IGJvb2xlYW47XHJcbn1cclxuY29uc3QgZGF0YTogRGF0YSA9IHtcclxuICBjaXR5TmFtZTogXCLljJfkuqzluIJcIixcclxuICBzZWFyY2hWYWx1ZTogXCJcIixcclxuICBncm91cERhdGE6IFtdLFxyXG4gIGNhbklVc2U6IHd4LmNhbklVc2UoXCJidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvXCIpLFxyXG59O1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmIChhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgIHVzZXJJbmZvOiBhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS51c2VySW5mbyxcclxuICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoYXQuZGF0YS5jYW5JVXNlKSB7XHJcbiAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAgICAgYXBwX2Rpc2NvdmVyLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IChyZXMpID0+IHtcclxuICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcclxuICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCFhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5sb2NhdGlvbikge1xyXG4gICAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuato+WcqOiOt+WPluWumuS9jVwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb25zdCBjaXR5ID0gYXdhaXQgZ2V0Q2l0eSgpO1xyXG4gICAgICAgICAgY29uc3QgY2l0eUluZm8gPSBhd2FpdCBnZXRDaXR5SWQoY2l0eSk7XHJcbiAgICAgICAgICBjb25zdCB7IGNpdHlJZCB9ID0gY2l0eUluZm87XHJcbiAgICAgICAgICBhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5sb2NhdGlvbiA9IGNpdHlJbmZvO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coY2l0eUluZm8pO1xyXG4gICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgY2l0eU5hbWU6IGNpdHlJbmZvLmNpdHksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IGdyb3VwRGF0YSA9IGF3YWl0IGdldEdyb3Vwc0J5Q2l0eUlkKHsgY2l0eUlkIH0pO1xyXG4gICAgICAgICAgdGhhdC5zZXREYXRhKHsgZ3JvdXBEYXRhIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICB0b2FzdEVycm9yKFwi6I635Y+W5a6a5L2N5aSx6LSlXCIpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIGlmIChhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5zZWFyY2hUZXh0KSB7XHJcbiAgICAgIHRoaXMuZGF0YS5zZWFyY2hWYWx1ZSA9IGFwcF9kaXNjb3Zlci5nbG9iYWxEYXRhLnNlYXJjaFRleHQ7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblNlYXJjaElucHV0VGFwKCkge1xyXG4gICAgaWYgKHRoaXMuZGF0YS5zZWFyY2hWYWx1ZSkge1xyXG4gICAgICBhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5zZWFyY2hUZXh0ID0gdGhpcy5kYXRhLnNlYXJjaFZhbHVlO1xyXG4gICAgfVxyXG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogXCIuLi9zZWFyY2gvc2VhcmNoXCIgfSk7XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==