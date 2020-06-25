"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var app_search = getApp();
Page({
    data: data,
    onLoad: function () {
        var that = this;
        if (app_search.globalData.searchText) {
            this.data.searchValue = app_search.globalData.searchText;
        }
        wx.getStorage({
            key: key_recentSearch,
            success: function (res) {
                that.setData({
                    recentSearch: res.data,
                });
            },
        });
    },
    search: function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.data.i % 2 === 0) {
                setTimeout(function () {
                    resolve([
                        { text: "搜索结果", value: 1 },
                        { text: "搜索结果2", value: 2 },
                    ]);
                }, 200);
            }
            else {
                setTimeout(function () {
                    resolve([]);
                }, 200);
            }
            _this.setData({
                i: _this.data.i + 1,
            });
        });
    },
    searchInputEvent: function (event) {
        app_search.globalData.searchText = event.detail.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBTSxnQkFBZ0IsR0FBRyxjQUFjLENBQUM7QUFVeEMsSUFBTSxJQUFJLEdBQVM7SUFDakIsY0FBYyxFQUFFLFdBQVc7SUFDM0IsV0FBVyxFQUFFLEVBQUU7SUFDZixZQUFZLEVBQUUsRUFBRTtJQUNoQixDQUFDLEVBQUUsQ0FBQztJQUNKLFVBQVUsRUFBRTtRQUNWO1lBQ0UsSUFBSSxFQUFFLFdBQVc7U0FDbEI7UUFDRDtZQUNFLElBQUksRUFBRSxXQUFXO1NBQ2xCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsV0FBVztTQUNsQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFdBQVc7U0FDbEI7UUFDRDtZQUNFLElBQUksRUFBRSxXQUFXO1NBQ2xCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsV0FBVztTQUNsQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFdBQVc7U0FDbEI7S0FDRjtDQUNGLENBQUM7QUFFRixJQUFNLFVBQVUsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQUN4QyxJQUFJLENBQUM7SUFDSCxJQUFJLE1BQUE7SUFDSixNQUFNO1FBQ0osSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7U0FDMUQ7UUFDRCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLGdCQUFnQjtZQUNyQixPQUFPLFlBQUMsR0FBRztnQkFDVCxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFlBQVksRUFBRSxHQUFHLENBQUMsSUFBSTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLEVBQUU7UUFBQSxpQkFrQlA7UUFqQkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDekIsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixVQUFVLENBQUM7b0JBQ1QsT0FBTyxDQUFDO3dCQUNOLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO3dCQUMxQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtxQkFDNUIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNUO2lCQUFNO2dCQUNMLFVBQVUsQ0FBQztvQkFDVCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2QsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ1Q7WUFDRCxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLENBQUMsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO2FBQ25CLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGdCQUFnQixFQUFoQixVQUFpQixLQUVoQjtRQUNDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ3hELENBQUM7SUFDRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUNmLEdBQUcsRUFBRSxnQkFBZ0I7WUFDckIsT0FBTztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RCLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvc2VhcmNoL3NlYXJjaC5qc1xyXG5cclxuaW1wb3J0IHsgSUFwcE9wdGlvbiB9IGZyb20gXCIuLi8uLi9tb2RlbFwiO1xyXG5cclxuY29uc3Qga2V5X3JlY2VudFNlYXJjaCA9IFwicmVjZW50U2VhcmNoXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEge1xyXG4gIGhvdFNlYXJjaFZhbHVlOiBzdHJpbmc7XHJcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcclxuICByZWNlbnRTZWFyY2g6IHN0cmluZ1tdO1xyXG4gIHN1Z2dlc3Rpb246IHsgdGV4dDogc3RyaW5nIH1bXTtcclxuICBpOiBudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IGRhdGE6IERhdGEgPSB7XHJcbiAgaG90U2VhcmNoVmFsdWU6IFwi54Ot6Zeo5pCc57SiOlhYWFhcIixcclxuICBzZWFyY2hWYWx1ZTogXCJcIixcclxuICByZWNlbnRTZWFyY2g6IFtdLFxyXG4gIGk6IDAsXHJcbiAgc3VnZ2VzdGlvbjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIuWFs+mUruWtl1hYWFhYMVwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCLlhbPplK7lrZdYWFhYWDJcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwi5YWz6ZSu5a2XWFhYWFgzXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIuWFs+mUruWtl1hYWFhYNFwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCLlhbPplK7lrZdYWFhYWDVcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwi5YWz6ZSu5a2XWFhYWFg2XCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIuWFs+mUruWtl1hYWFhYN1wiLFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuY29uc3QgYXBwX3NlYXJjaCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5QYWdlKHtcclxuICBkYXRhLFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgaWYgKGFwcF9zZWFyY2guZ2xvYmFsRGF0YS5zZWFyY2hUZXh0KSB7XHJcbiAgICAgIHRoaXMuZGF0YS5zZWFyY2hWYWx1ZSA9IGFwcF9zZWFyY2guZ2xvYmFsRGF0YS5zZWFyY2hUZXh0O1xyXG4gICAgfVxyXG4gICAgd3guZ2V0U3RvcmFnZSh7XHJcbiAgICAgIGtleToga2V5X3JlY2VudFNlYXJjaCxcclxuICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgcmVjZW50U2VhcmNoOiByZXMuZGF0YSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2VhcmNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZGF0YS5pICUgMiA9PT0gMCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShbXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCLmkJzntKLnu5PmnpxcIiwgdmFsdWU6IDEgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIuaQnOe0oue7k+aenDJcIiwgdmFsdWU6IDIgfSxcclxuICAgICAgICAgIF0pO1xyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKFtdKTtcclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaTogdGhpcy5kYXRhLmkgKyAxLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2VhcmNoSW5wdXRFdmVudChldmVudDoge1xyXG4gICAgZGV0YWlsOiB7IHZhbHVlOiBhbnk7IGN1cnNvcjogYW55OyBrZXlDb2RlOiBhbnkgfTtcclxuICB9KSB7XHJcbiAgICBhcHBfc2VhcmNoLmdsb2JhbERhdGEuc2VhcmNoVGV4dCA9IGV2ZW50LmRldGFpbC52YWx1ZTtcclxuICB9LFxyXG4gIGNsZWFyUmVjZW50KCkge1xyXG4gICAgd3gucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgIGtleToga2V5X3JlY2VudFNlYXJjaCxcclxuICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIua4hemZpOaIkOWKn1wiKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG4iXX0=