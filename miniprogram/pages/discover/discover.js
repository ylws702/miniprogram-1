"use strict";
var cityName = '佛山';
var app_discover = getApp();
Page({
    data: {
        cityName: cityName,
        searchValue: '',
        groupData: [
            {
                user: {
                    userName: '用户名'
                },
                image: '',
                title: '这里是标题XXXXXX',
                introduction: '这里是简介XXXXXXXXXXXXXXX',
                like: 999,
            },
            {
                user: {
                    userName: '用户名'
                },
                image: '',
                title: '这里是标题XXXXXX',
                introduction: '这里是简介XXXXXXXXXXXXXXX',
                like: 999,
            },
            {
                user: {
                    userName: '用户名'
                },
                image: '',
                title: '这里是标题XXXXXX',
                introduction: '这里是简介XXXXXXXXXXXXXXX',
                like: 999,
            },
            {
                user: {
                    userName: '用户名'
                },
                image: '',
                title: '这里是标题XXXXXX',
                introduction: '这里是简介XXXXXXXXXXXXXXX',
                like: 999,
            },
            {
                user: {
                    userName: '用户名'
                },
                image: '',
                title: '这里是标题XXXXXX',
                introduction: '这里是简介XXXXXXXXXXXXXXX',
                like: 999,
            },
        ],
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    onLoad: function () {
        var _this = this;
        if (app_discover.globalData.userInfo) {
            this.setData({
                userInfo: app_discover.globalData.userInfo,
                hasUserInfo: true,
            });
        }
        else if (this.data.canIUse) {
            app_discover.userInfoReadyCallback = function (res) {
                _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            };
        }
        if (!app_discover.globalData.location) {
            wx.getLocation &&
                wx.getLocation({
                    success: function (res) {
                        app_discover.globalData.location = res;
                        console.log(res);
                    },
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
        wx.navigateTo({ url: '../search/search' });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXNjb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLElBQU0sWUFBWSxHQUFHLE1BQU0sRUFBYyxDQUFDO0FBWTFDLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLFFBQVEsVUFBQTtRQUNSLFdBQVcsRUFBRSxFQUFFO1FBQ2YsU0FBUyxFQUFDO1lBQ047Z0JBQ0ksSUFBSSxFQUFDO29CQUNELFFBQVEsRUFBQyxLQUFLO2lCQUNqQjtnQkFDRCxLQUFLLEVBQUMsRUFBRTtnQkFDUixLQUFLLEVBQUMsYUFBYTtnQkFDbkIsWUFBWSxFQUFDLHNCQUFzQjtnQkFDbkMsSUFBSSxFQUFDLEdBQUc7YUFFWDtZQUNEO2dCQUNJLElBQUksRUFBQztvQkFDRCxRQUFRLEVBQUMsS0FBSztpQkFDakI7Z0JBQ0QsS0FBSyxFQUFDLEVBQUU7Z0JBQ1IsS0FBSyxFQUFDLGFBQWE7Z0JBQ25CLFlBQVksRUFBQyxzQkFBc0I7Z0JBQ25DLElBQUksRUFBQyxHQUFHO2FBRVg7WUFDRDtnQkFDSSxJQUFJLEVBQUM7b0JBQ0QsUUFBUSxFQUFDLEtBQUs7aUJBQ2pCO2dCQUNELEtBQUssRUFBQyxFQUFFO2dCQUNSLEtBQUssRUFBQyxhQUFhO2dCQUNuQixZQUFZLEVBQUMsc0JBQXNCO2dCQUNuQyxJQUFJLEVBQUMsR0FBRzthQUVYO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFDO29CQUNELFFBQVEsRUFBQyxLQUFLO2lCQUNqQjtnQkFDRCxLQUFLLEVBQUMsRUFBRTtnQkFDUixLQUFLLEVBQUMsYUFBYTtnQkFDbkIsWUFBWSxFQUFDLHNCQUFzQjtnQkFDbkMsSUFBSSxFQUFDLEdBQUc7YUFFWDtZQUNEO2dCQUNJLElBQUksRUFBQztvQkFDRCxRQUFRLEVBQUMsS0FBSztpQkFDakI7Z0JBQ0QsS0FBSyxFQUFDLEVBQUU7Z0JBQ1IsS0FBSyxFQUFDLGFBQWE7Z0JBQ25CLFlBQVksRUFBQyxzQkFBc0I7Z0JBQ25DLElBQUksRUFBQyxHQUFHO2FBRVg7U0FDSjtRQUNELE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO0tBQ3REO0lBQ0QsTUFBTTtRQUFOLGlCQTRCQztRQTNCRyxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUTtnQkFDMUMsV0FBVyxFQUFFLElBQUk7YUFDcEIsQ0FBQyxDQUFDO1NBQ047YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBRzFCLFlBQVksQ0FBQyxxQkFBcUIsR0FBRyxVQUFDLEdBQUc7Z0JBQ3JDLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1QsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO29CQUN0QixXQUFXLEVBQUUsSUFBSTtpQkFDcEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDbkMsRUFBRSxDQUFDLFdBQVc7Z0JBQ1YsRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDWCxPQUFPLFlBQUMsR0FBRzt3QkFDUCxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7d0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1NBQzlEO0lBQ0wsQ0FBQztJQUNELGdCQUFnQjtRQUNaLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDOUQ7UUFDRCxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY2l0eU5hbWUgPSAn5L2b5bGxJztcbmNvbnN0IGFwcF9kaXNjb3ZlciA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xuXG4vLyBQT1NU6K+35rGC5Zyw5Z2AXG4vL2FwaXMubWFwLnFxLmNvbS9wbGFjZV9jbG91ZC9kYXRhL2NyZWF0ZVxuLy8g6K+35rGC5aS077yaY29udGVudC10eXBlOmFwcGxpY2F0aW9uL2pzb25cblxuLy9UT0RPOlxuLy8gaHR0cHM6IGNvbnN0IGdldFNpZyA9ICgpID0+IHtcbi8vICAgICBjb25zdCBrZXkgPSAnV0VaQlotRDVKV1AtRjVFREktVk9CR1gtQjMzTzMtRjVGMjUnO1xuLy8gICAgIGNvbnN0IHNrID0gJ0RyQkx2SXRmd0JaT0l3RGRQRnFHSjNFeXN3VFBCbWUnO1xuLy8gfTtcblxuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICBjaXR5TmFtZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgICBncm91cERhdGE6W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXI6e1xuICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZTon55So5oi35ZCNJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2U6JycsXG4gICAgICAgICAgICAgICAgdGl0bGU6J+i/memHjOaYr+agh+mimFhYWFhYWCcsXG4gICAgICAgICAgICAgICAgaW50cm9kdWN0aW9uOifov5nph4zmmK/nroDku4tYWFhYWFhYWFhYWFhYWFgnLFxuICAgICAgICAgICAgICAgIGxpa2U6OTk5LFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXI6e1xuICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZTon55So5oi35ZCNJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2U6JycsXG4gICAgICAgICAgICAgICAgdGl0bGU6J+i/memHjOaYr+agh+mimFhYWFhYWCcsXG4gICAgICAgICAgICAgICAgaW50cm9kdWN0aW9uOifov5nph4zmmK/nroDku4tYWFhYWFhYWFhYWFhYWFgnLFxuICAgICAgICAgICAgICAgIGxpa2U6OTk5LFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXI6e1xuICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZTon55So5oi35ZCNJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2U6JycsXG4gICAgICAgICAgICAgICAgdGl0bGU6J+i/memHjOaYr+agh+mimFhYWFhYWCcsXG4gICAgICAgICAgICAgICAgaW50cm9kdWN0aW9uOifov5nph4zmmK/nroDku4tYWFhYWFhYWFhYWFhYWFgnLFxuICAgICAgICAgICAgICAgIGxpa2U6OTk5LFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXI6e1xuICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZTon55So5oi35ZCNJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2U6JycsXG4gICAgICAgICAgICAgICAgdGl0bGU6J+i/memHjOaYr+agh+mimFhYWFhYWCcsXG4gICAgICAgICAgICAgICAgaW50cm9kdWN0aW9uOifov5nph4zmmK/nroDku4tYWFhYWFhYWFhYWFhYWFgnLFxuICAgICAgICAgICAgICAgIGxpa2U6OTk5LFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXI6e1xuICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZTon55So5oi35ZCNJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW1hZ2U6JycsXG4gICAgICAgICAgICAgICAgdGl0bGU6J+i/memHjOaYr+agh+mimFhYWFhYWCcsXG4gICAgICAgICAgICAgICAgaW50cm9kdWN0aW9uOifov5nph4zmmK/nroDku4tYWFhYWFhYWFhYWFhYWFgnLFxuICAgICAgICAgICAgICAgIGxpa2U6OTk5LFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGlmIChhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICB1c2VySW5mbzogYXBwX2Rpc2NvdmVyLmdsb2JhbERhdGEudXNlckluZm8sXG4gICAgICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuY2FuSVVzZSkge1xuICAgICAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcbiAgICAgICAgICAgIGFwcF9kaXNjb3Zlci51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXBwX2Rpc2NvdmVyLmdsb2JhbERhdGEubG9jYXRpb24pIHtcbiAgICAgICAgICAgIHd4LmdldExvY2F0aW9uICYmXG4gICAgICAgICAgICAgICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwX2Rpc2NvdmVyLmdsb2JhbERhdGEubG9jYXRpb24gPSByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5zZWFyY2hUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2VhcmNoVmFsdWUgPSBhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5zZWFyY2hUZXh0O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBvblNlYXJjaElucHV0VGFwKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLnNlYXJjaFZhbHVlKSB7XG4gICAgICAgICAgICBhcHBfZGlzY292ZXIuZ2xvYmFsRGF0YS5zZWFyY2hUZXh0ID0gdGhpcy5kYXRhLnNlYXJjaFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcuLi9zZWFyY2gvc2VhcmNoJyB9KTtcbiAgICB9LFxufSk7XG4iXX0=