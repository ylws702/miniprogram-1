"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        var title = undefined;
        if (app_discover.globalData.tabDiscoverQuery) {
            title = app_discover.globalData.tabDiscoverQuery.searchText;
            app_discover.globalData.tabDiscoverQuery = undefined;
            that.setData({
                searchValue: title,
            });
        }
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
                var city, cityInfo, cityId, groups, likeRecord_1, groupData, error_1;
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
                            return [4, (title
                                    ? group_1.searchGroups({ cityId: cityId, title: title })
                                    : group_1.getGroupsByCityId({ cityId: cityId }))];
                        case 3:
                            groups = _a.sent();
                            likeRecord_1 = app_discover.globalData.likeRecord;
                            groupData = groups.map(function (group) {
                                var _a;
                                return (__assign(__assign({}, group), { ifLike: (_a = likeRecord_1[group.groupId]) !== null && _a !== void 0 ? _a : false }));
                            });
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
    },
    onSearchInputTap: function () {
        wx.navigateTo({ url: "../search/search" });
    },
    onLikeTap: function (e) {
        var groupData = this.data.groupData;
        var groupid = e.currentTarget.dataset.groupid;
        var group = groupData.filter(function (groupInfo) { return groupInfo.groupId === groupid; })[0];
        if (!group) {
            return;
        }
        var ifLike = group.ifLike;
        var dLike = ifLike ? -1 : 1;
        group_1.updateLikeByGroupId({ groupId: groupid, dLike: dLike });
        app_discover.globalData.likeRecord[groupid] = !ifLike;
        group.ifLike = !ifLike;
        group.like += dLike;
        this.setData({
            groupData: groupData,
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXNjb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTZDO0FBQzdDLDRDQUFnRDtBQUVoRCw4Q0FJOEI7QUFDOUIseUNBQThDO0FBRTlDLElBQU0sWUFBWSxHQUFHLE1BQU0sRUFBYyxDQUFDO0FBWTFDLElBQU0sSUFBSSxHQUFTO0lBQ2pCLFFBQVEsRUFBRSxLQUFLO0lBQ2YsV0FBVyxFQUFFLEVBQUU7SUFDZixTQUFTLEVBQUUsRUFBRTtJQUNiLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO0NBQ3BELENBQUM7QUFFRixJQUFJLENBQUM7SUFDSCxJQUFJLE1BQUE7SUFDSixNQUFNLEVBQU47UUFBQSxpQkEyREM7UUExREMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksS0FBSyxHQUF1QixTQUFTLENBQUM7UUFDMUMsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFO1lBQzVDLEtBQUssR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztZQUM1RCxZQUFZLENBQUMsVUFBVSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFdBQVcsRUFBRSxLQUFLO2FBQ25CLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFFBQVEsRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVE7Z0JBQzFDLFdBQVcsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUc1QixZQUFZLENBQUMscUJBQXFCLEdBQUcsVUFBQyxHQUFHO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtvQkFDdEIsV0FBVyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQ3JDLENBQUM7Ozs7Ozs0QkFFRyxFQUFFLENBQUMsV0FBVyxDQUFDO2dDQUNiLEtBQUssRUFBRSxRQUFROzZCQUNoQixDQUFDLENBQUM7NEJBQ1UsV0FBTSxhQUFPLEVBQUUsRUFBQTs7NEJBQXRCLElBQUksR0FBRyxTQUFlOzRCQUNYLFdBQU0sZ0JBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQTs7NEJBQWhDLFFBQVEsR0FBRyxTQUFxQjs0QkFDOUIsTUFBTSxHQUFLLFFBQVEsT0FBYixDQUFjOzRCQUM1QixZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7NEJBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJOzZCQUN4QixDQUFDLENBQUM7NEJBQ1ksV0FBTSxDQUFDLEtBQUs7b0NBQ3pCLENBQUMsQ0FBQyxvQkFBWSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQztvQ0FDakMsQ0FBQyxDQUFDLHlCQUFpQixDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDLEVBQUE7OzRCQUY1QixNQUFNLEdBQUcsU0FFbUI7NEJBQzFCLGVBQWUsWUFBWSxDQUFDLFVBQVUsV0FBNUIsQ0FBNkI7NEJBQ3pDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUMxQixVQUFDLEtBQUs7O2dDQUFnQixPQUFBLHVCQUNqQixLQUFLLEtBQ1IsTUFBTSxRQUFFLFlBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLG1DQUFJLEtBQUssSUFDMUMsQ0FBQTs2QkFBQSxDQUNILENBQUM7NEJBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUMsQ0FBQzs7Ozs0QkFFNUIsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQUssQ0FBQyxDQUFDOzRCQUNyQixpQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7NEJBRXJCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7aUJBRXBCLENBQUMsRUFBRSxDQUFDO1NBQ047SUFDSCxDQUFDO0lBQ0QsZ0JBQWdCO1FBQ2QsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNELFNBQVMsRUFBVCxVQUFVLENBQWlDO1FBQ2pDLElBQUEsU0FBUyxHQUFLLElBQUksQ0FBQyxJQUFJLFVBQWQsQ0FBZTtRQUN4QixJQUFBLE9BQU8sR0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sUUFBNUIsQ0FBNkI7UUFDNUMsSUFBTSxLQUFLLEdBQTBCLFNBQVMsQ0FBQyxNQUFNLENBQ25ELFVBQUMsU0FBUyxJQUFLLE9BQUEsU0FBUyxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQTdCLENBQTZCLENBQzdDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTztTQUNSO1FBQ08sSUFBQSxNQUFNLEdBQUssS0FBSyxPQUFWLENBQVc7UUFDekIsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLDJCQUFtQixDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7UUFDakQsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDdEQsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN2QixLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsU0FBUyxXQUFBO1NBQ1YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldENpdHkgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbWFwXCI7XHJcbmltcG9ydCB7IGdldENpdHlJZCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jaXR5XCI7XHJcbmltcG9ydCB7IEdyb3VwLCBJQXBwT3B0aW9uLCBFdmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbFwiO1xyXG5pbXBvcnQge1xyXG4gIGdldEdyb3Vwc0J5Q2l0eUlkLFxyXG4gIHVwZGF0ZUxpa2VCeUdyb3VwSWQsXHJcbiAgc2VhcmNoR3JvdXBzLFxyXG59IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9ncm91cFwiO1xyXG5pbXBvcnQgeyB0b2FzdEVycm9yIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3V0aWxcIjtcclxuXHJcbmNvbnN0IGFwcF9kaXNjb3ZlciA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxudHlwZSBHcm91cEluZm8gPSBHcm91cCAmIHtcclxuICBpZkxpa2U6IGJvb2xlYW47XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgRGF0YSB7XHJcbiAgY2l0eU5hbWU6IFN0cmluZztcclxuICBzZWFyY2hWYWx1ZTogc3RyaW5nO1xyXG4gIGdyb3VwRGF0YTogR3JvdXBJbmZvW107XHJcbiAgY2FuSVVzZTogYm9vbGVhbjtcclxufVxyXG5jb25zdCBkYXRhOiBEYXRhID0ge1xyXG4gIGNpdHlOYW1lOiBcIuWMl+S6rOW4glwiLFxyXG4gIHNlYXJjaFZhbHVlOiBcIlwiLFxyXG4gIGdyb3VwRGF0YTogW10sXHJcbiAgY2FuSVVzZTogd3guY2FuSVVzZShcImJ1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm9cIiksXHJcbn07XHJcblxyXG5QYWdlKHtcclxuICBkYXRhLFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgbGV0IHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBpZiAoYXBwX2Rpc2NvdmVyLmdsb2JhbERhdGEudGFiRGlzY292ZXJRdWVyeSkge1xyXG4gICAgICB0aXRsZSA9IGFwcF9kaXNjb3Zlci5nbG9iYWxEYXRhLnRhYkRpc2NvdmVyUXVlcnkuc2VhcmNoVGV4dDtcclxuICAgICAgYXBwX2Rpc2NvdmVyLmdsb2JhbERhdGEudGFiRGlzY292ZXJRdWVyeSA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICBzZWFyY2hWYWx1ZTogdGl0bGUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGFwcF9kaXNjb3Zlci5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgdXNlckluZm86IGFwcF9kaXNjb3Zlci5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhhdC5kYXRhLmNhbklVc2UpIHtcclxuICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cclxuICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxyXG4gICAgICBhcHBfZGlzY292ZXIudXNlckluZm9SZWFkeUNhbGxiYWNrID0gKHJlcykgPT4ge1xyXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxyXG4gICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAoIWFwcF9kaXNjb3Zlci5nbG9iYWxEYXRhLmxvY2F0aW9uKSB7XHJcbiAgICAgIChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgdGl0bGU6IFwi5q2j5Zyo6I635Y+W5a6a5L2NXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IGNpdHkgPSBhd2FpdCBnZXRDaXR5KCk7XHJcbiAgICAgICAgICBjb25zdCBjaXR5SW5mbyA9IGF3YWl0IGdldENpdHlJZChjaXR5KTtcclxuICAgICAgICAgIGNvbnN0IHsgY2l0eUlkIH0gPSBjaXR5SW5mbztcclxuICAgICAgICAgIGFwcF9kaXNjb3Zlci5nbG9iYWxEYXRhLmxvY2F0aW9uID0gY2l0eUluZm87XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhjaXR5SW5mbyk7XHJcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgICBjaXR5TmFtZTogY2l0eUluZm8uY2l0eSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc3QgZ3JvdXBzID0gYXdhaXQgKHRpdGxlXHJcbiAgICAgICAgICAgID8gc2VhcmNoR3JvdXBzKHsgY2l0eUlkLCB0aXRsZSB9KVxyXG4gICAgICAgICAgICA6IGdldEdyb3Vwc0J5Q2l0eUlkKHsgY2l0eUlkIH0pKTtcclxuICAgICAgICAgIGNvbnN0IHsgbGlrZVJlY29yZCB9ID0gYXBwX2Rpc2NvdmVyLmdsb2JhbERhdGE7XHJcbiAgICAgICAgICBjb25zdCBncm91cERhdGEgPSBncm91cHMubWFwKFxyXG4gICAgICAgICAgICAoZ3JvdXApOiBHcm91cEluZm8gPT4gKHtcclxuICAgICAgICAgICAgICAuLi5ncm91cCxcclxuICAgICAgICAgICAgICBpZkxpa2U6IGxpa2VSZWNvcmRbZ3JvdXAuZ3JvdXBJZF0gPz8gZmFsc2UsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhhdC5zZXREYXRhKHsgZ3JvdXBEYXRhIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICB0b2FzdEVycm9yKFwi6I635Y+W5a6a5L2N5aSx6LSlXCIpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uU2VhcmNoSW5wdXRUYXAoKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiBcIi4uL3NlYXJjaC9zZWFyY2hcIiB9KTtcclxuICB9LFxyXG4gIG9uTGlrZVRhcChlOiBFdmVudDx7fSwgeyBncm91cGlkOiBzdHJpbmcgfT4pIHtcclxuICAgIGNvbnN0IHsgZ3JvdXBEYXRhIH0gPSB0aGlzLmRhdGE7XHJcbiAgICBjb25zdCB7IGdyb3VwaWQgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgY29uc3QgZ3JvdXA6IEdyb3VwSW5mbyB8IHVuZGVmaW5lZCA9IGdyb3VwRGF0YS5maWx0ZXIoXHJcbiAgICAgIChncm91cEluZm8pID0+IGdyb3VwSW5mby5ncm91cElkID09PSBncm91cGlkXHJcbiAgICApWzBdO1xyXG4gICAgaWYgKCFncm91cCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGlmTGlrZSB9ID0gZ3JvdXA7XHJcbiAgICBjb25zdCBkTGlrZSA9IGlmTGlrZSA/IC0xIDogMTtcclxuICAgIHVwZGF0ZUxpa2VCeUdyb3VwSWQoeyBncm91cElkOiBncm91cGlkLCBkTGlrZSB9KTtcclxuICAgIGFwcF9kaXNjb3Zlci5nbG9iYWxEYXRhLmxpa2VSZWNvcmRbZ3JvdXBpZF0gPSAhaWZMaWtlO1xyXG4gICAgZ3JvdXAuaWZMaWtlID0gIWlmTGlrZTtcclxuICAgIGdyb3VwLmxpa2UgKz0gZExpa2U7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBncm91cERhdGEsXHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuIl19