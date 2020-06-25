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
exports.app = void 0;
var util_1 = require("../../utils/util");
var group_1 = require("../../services/group");
var key_recentSearch = "recentSearch";
var data = {
    hotSearchValue: "热门搜索:XXXX",
    searchValue: "",
    recentSearch: [],
    i: 0,
    suggestion: [
        {
            text: "关键字XXXXX1",
        },
        {
            text: "关键字XXXXX2",
        },
        {
            text: "关键字XXXXX3",
        },
        {
            text: "关键字XXXXX4",
        },
        {
            text: "关键字XXXXX5",
        },
        {
            text: "关键字XXXXX6",
        },
        {
            text: "关键字XXXXX7",
        },
    ],
};
exports.app = getApp();
Page({
    data: data,
    onLoad: function () {
        var that = this;
        this.setData({
            search: this.search.bind(this),
        });
        wx.getStorage({
            key: key_recentSearch,
            success: function (res) {
                that.setData({
                    recentSearch: res.data,
                });
            },
        });
    },
    search: function (title) {
        return __awaiter(this, void 0, void 0, function () {
            var location, errMsg, cityId, groups, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        location = exports.app.globalData.location;
                        if (!location) {
                            errMsg = "没有城市信息";
                            util_1.toastError(errMsg);
                            return [2, Promise.reject(errMsg)];
                        }
                        cityId = location.cityId;
                        return [4, group_1.searchGroups({
                                cityId: cityId,
                                title: title,
                            })];
                    case 1:
                        groups = _a.sent();
                        console.log(title, groups);
                        result = groups
                            .slice(0, 3)
                            .map(function (group) { return ({ text: group.title, value: group.groupId }); });
                        exports.app.globalData.tabDiscoverQuery = {
                            searchText: title,
                        };
                        result.push({ text: "查看全部结果", value: 0 });
                        return [2, result];
                }
            });
        });
    },
    selectResult: function (e) {
        var value = e.detail.item.value;
        if (value === 0) {
            wx.switchTab({
                url: "../discover/discover",
                success: function () {
                    var pages = getCurrentPages();
                    pages[pages.length - 1].onLoad();
                },
            });
            return;
        }
        wx.navigateTo({
            url: "../detail/detail?groupId=" + value,
        });
    },
    clearRecent: function () {
        wx.removeStorage({
            key: key_recentSearch,
            success: function () {
                console.log("清除成功");
            },
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHlDQUE4QztBQUM5Qyw4Q0FBb0Q7QUFFcEQsSUFBTSxnQkFBZ0IsR0FBRyxjQUFjLENBQUM7QUFVeEMsSUFBTSxJQUFJLEdBQVM7SUFDakIsY0FBYyxFQUFFLFdBQVc7SUFDM0IsV0FBVyxFQUFFLEVBQUU7SUFDZixZQUFZLEVBQUUsRUFBRTtJQUNoQixDQUFDLEVBQUUsQ0FBQztJQUNKLFVBQVUsRUFBRTtRQUNWO1lBQ0UsSUFBSSxFQUFFLFdBQVc7U0FDbEI7UUFDRDtZQUNFLElBQUksRUFBRSxXQUFXO1NBQ2xCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsV0FBVztTQUNsQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFdBQVc7U0FDbEI7UUFDRDtZQUNFLElBQUksRUFBRSxXQUFXO1NBQ2xCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsV0FBVztTQUNsQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFdBQVc7U0FDbEI7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQU94QyxJQUFJLENBQUM7SUFDSCxJQUFJLE1BQUE7SUFDSixNQUFNO1FBQ0osSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQy9CLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsZ0JBQWdCO1lBQ3JCLE9BQU8sWUFBQyxHQUFHO2dCQUNULElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsWUFBWSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2lCQUN2QixDQUFDLENBQUM7WUFDTCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVLLE1BQU0sRUFBWixVQUFhLEtBQWE7Ozs7Ozt3QkFDaEIsUUFBUSxHQUFLLFdBQUcsQ0FBQyxVQUFVLFNBQW5CLENBQW9CO3dCQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFOzRCQUNQLE1BQU0sR0FBRyxRQUFRLENBQUM7NEJBQ3hCLGlCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ25CLFdBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQzt5QkFDL0I7d0JBQ08sTUFBTSxHQUFLLFFBQVEsT0FBYixDQUFjO3dCQUNiLFdBQU0sb0JBQVksQ0FBQztnQ0FDaEMsTUFBTSxRQUFBO2dDQUNOLEtBQUssT0FBQTs2QkFDTixDQUFDLEVBQUE7O3dCQUhJLE1BQU0sR0FBRyxTQUdiO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNyQixNQUFNLEdBQWEsTUFBTTs2QkFDNUIsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7NkJBQ1gsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDO3dCQUNqRSxXQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixHQUFHOzRCQUNoQyxVQUFVLEVBQUUsS0FBSzt5QkFDbEIsQ0FBQzt3QkFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsV0FBTyxNQUFNLEVBQUM7Ozs7S0FDZjtJQUNELFlBQVksRUFBWixVQUFhLENBQXlDO1FBQzVDLElBQUEsS0FBSyxHQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFsQixDQUFtQjtRQUNoQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDZixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEdBQUcsRUFBRSxzQkFBc0I7Z0JBQzNCLE9BQU87b0JBQ0wsSUFBTSxLQUFLLEdBQUcsZUFBZSxFQUFFLENBQUM7b0JBQ2hDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQyxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNSO1FBQ0QsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSw4QkFBNEIsS0FBTztTQUN6QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsV0FBVztRQUNULEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDZixHQUFHLEVBQUUsZ0JBQWdCO1lBQ3JCLE9BQU87Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QixDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL3NlYXJjaC9zZWFyY2guanNcclxuXHJcbmltcG9ydCB7IEV2ZW50LCBJQXBwT3B0aW9uIH0gZnJvbSBcIi4uLy4uL21vZGVsXCI7XHJcbmltcG9ydCB7IHRvYXN0RXJyb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdXRpbFwiO1xyXG5pbXBvcnQgeyBzZWFyY2hHcm91cHMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZ3JvdXBcIjtcclxuXHJcbmNvbnN0IGtleV9yZWNlbnRTZWFyY2ggPSBcInJlY2VudFNlYXJjaFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIHtcclxuICBob3RTZWFyY2hWYWx1ZTogc3RyaW5nO1xyXG4gIHNlYXJjaFZhbHVlOiBzdHJpbmc7XHJcbiAgcmVjZW50U2VhcmNoOiBzdHJpbmdbXTtcclxuICBzdWdnZXN0aW9uOiB7IHRleHQ6IHN0cmluZyB9W107XHJcbiAgaTogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBkYXRhOiBEYXRhID0ge1xyXG4gIGhvdFNlYXJjaFZhbHVlOiBcIueDremXqOaQnOe0ojpYWFhYXCIsXHJcbiAgc2VhcmNoVmFsdWU6IFwiXCIsXHJcbiAgcmVjZW50U2VhcmNoOiBbXSxcclxuICBpOiAwLFxyXG4gIHN1Z2dlc3Rpb246IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCLlhbPplK7lrZdYWFhYWDFcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwi5YWz6ZSu5a2XWFhYWFgyXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIuWFs+mUruWtl1hYWFhYM1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCLlhbPplK7lrZdYWFhYWDRcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwi5YWz6ZSu5a2XWFhYWFg1XCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIuWFs+mUruWtl1hYWFhYNlwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCLlhbPplK7lrZdYWFhYWDdcIixcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKTtcclxuXHJcbmludGVyZmFjZSBPcHRpb24ge1xyXG4gIHRleHQ6IHN0cmluZztcclxuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xyXG59XHJcblxyXG5QYWdlKHtcclxuICBkYXRhLFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc2VhcmNoOiB0aGlzLnNlYXJjaC5iaW5kKHRoaXMpLFxyXG4gICAgfSk7XHJcbiAgICB3eC5nZXRTdG9yYWdlKHtcclxuICAgICAga2V5OiBrZXlfcmVjZW50U2VhcmNoLFxyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICByZWNlbnRTZWFyY2g6IHJlcy5kYXRhLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgc2VhcmNoKHRpdGxlOiBzdHJpbmcpOiBQcm9taXNlPE9wdGlvbltdPiB7XHJcbiAgICBjb25zdCB7IGxvY2F0aW9uIH0gPSBhcHAuZ2xvYmFsRGF0YTtcclxuICAgIGlmICghbG9jYXRpb24pIHtcclxuICAgICAgY29uc3QgZXJyTXNnID0gXCLmsqHmnInln47luILkv6Hmga9cIjtcclxuICAgICAgdG9hc3RFcnJvcihlcnJNc2cpO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyTXNnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgY2l0eUlkIH0gPSBsb2NhdGlvbjtcclxuICAgIGNvbnN0IGdyb3VwcyA9IGF3YWl0IHNlYXJjaEdyb3Vwcyh7XHJcbiAgICAgIGNpdHlJZCxcclxuICAgICAgdGl0bGUsXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHRpdGxlLCBncm91cHMpO1xyXG4gICAgY29uc3QgcmVzdWx0OiBPcHRpb25bXSA9IGdyb3Vwc1xyXG4gICAgICAuc2xpY2UoMCwgMylcclxuICAgICAgLm1hcCgoZ3JvdXApID0+ICh7IHRleHQ6IGdyb3VwLnRpdGxlLCB2YWx1ZTogZ3JvdXAuZ3JvdXBJZCB9KSk7XHJcbiAgICBhcHAuZ2xvYmFsRGF0YS50YWJEaXNjb3ZlclF1ZXJ5ID0ge1xyXG4gICAgICBzZWFyY2hUZXh0OiB0aXRsZSxcclxuICAgIH07XHJcbiAgICByZXN1bHQucHVzaCh7IHRleHQ6IFwi5p+l55yL5YWo6YOo57uT5p6cXCIsIHZhbHVlOiAwIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LFxyXG4gIHNlbGVjdFJlc3VsdChlOiBFdmVudDx7IGluZGV4OiBudW1iZXI7IGl0ZW06IE9wdGlvbiB9Pikge1xyXG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZS5kZXRhaWwuaXRlbTtcclxuICAgIGlmICh2YWx1ZSA9PT0gMCkge1xyXG4gICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgIHVybDogXCIuLi9kaXNjb3Zlci9kaXNjb3ZlclwiLFxyXG4gICAgICAgIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgICBjb25zdCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV0ub25Mb2FkKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6IGAuLi9kZXRhaWwvZGV0YWlsP2dyb3VwSWQ9JHt2YWx1ZX1gLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjbGVhclJlY2VudCgpIHtcclxuICAgIHd4LnJlbW92ZVN0b3JhZ2Uoe1xyXG4gICAgICBrZXk6IGtleV9yZWNlbnRTZWFyY2gsXHJcbiAgICAgIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmuIXpmaTmiJDlip9cIik7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuIl19