"use strict";
var app_search = getApp();
Page({
    data: {
        hotSearchValue: '热门搜索:XXXX',
        searchValue: '',
        recentSearch: [
            '关键字XXXXX1',
            '关键字XXXXX2',
            '关键字XXXXX3',
            '关键字XXXXX4',
            '关键字XXXXX5',
            '关键字XXXXX6',
            '关键字XXXXX7',
        ],
        suggestion: [
            {
                text: '关键字XXXXX1',
            },
            {
                text: '关键字XXXXX2',
            },
            {
                text: '关键字XXXXX3',
            },
            {
                text: '关键字XXXXX4',
            },
            {
                text: '关键字XXXXX5',
            },
            {
                text: '关键字XXXXX6',
            },
            {
                text: '关键字XXXXX7',
            },
        ],
    },
    onLoad: function () {
        if (app_search.globalData.searchText) {
            this.data.searchValue = app_search.globalData.searchText;
        }
    },
    searchInputEvent: function (event) {
        app_search.globalData.searchText = event.detail.value;
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxJQUFNLFVBQVUsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQUN4QyxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixjQUFjLEVBQUUsV0FBVztRQUMzQixXQUFXLEVBQUUsRUFBRTtRQUNmLFlBQVksRUFBRTtZQUNWLFdBQVc7WUFDWCxXQUFXO1lBQ1gsV0FBVztZQUNYLFdBQVc7WUFDWCxXQUFXO1lBQ1gsV0FBVztZQUNYLFdBQVc7U0FDZDtRQUNELFVBQVUsRUFBRTtZQUNSO2dCQUNJLElBQUksRUFBRSxXQUFXO2FBQ3BCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7YUFDcEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsV0FBVzthQUNwQjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2FBQ3BCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7YUFDcEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsV0FBVzthQUNwQjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2FBQ3BCO1NBQ0o7S0FDSjtJQUNELE1BQU07UUFDRixJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUNELGdCQUFnQixFQUFoQixVQUFpQixLQUVoQjtRQUNHLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzFELENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9zZWFyY2gvc2VhcmNoLmpzXHJcblxyXG5jb25zdCBhcHBfc2VhcmNoID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGhvdFNlYXJjaFZhbHVlOiAn54Ot6Zeo5pCc57SiOlhYWFgnLFxyXG4gICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcclxuICAgICAgICByZWNlbnRTZWFyY2g6IFtcclxuICAgICAgICAgICAgJ+WFs+mUruWtl1hYWFhYMScsXHJcbiAgICAgICAgICAgICflhbPplK7lrZdYWFhYWDInLFxyXG4gICAgICAgICAgICAn5YWz6ZSu5a2XWFhYWFgzJyxcclxuICAgICAgICAgICAgJ+WFs+mUruWtl1hYWFhYNCcsXHJcbiAgICAgICAgICAgICflhbPplK7lrZdYWFhYWDUnLFxyXG4gICAgICAgICAgICAn5YWz6ZSu5a2XWFhYWFg2JyxcclxuICAgICAgICAgICAgJ+WFs+mUruWtl1hYWFhYNycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzdWdnZXN0aW9uOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflhbPplK7lrZdYWFhYWDEnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5YWz6ZSu5a2XWFhYWFgyJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WFs+mUruWtl1hYWFhYMycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflhbPplK7lrZdYWFhYWDQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5YWz6ZSu5a2XWFhYWFg1JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WFs+mUruWtl1hYWFhYNicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflhbPplK7lrZdYWFhYWDcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmIChhcHBfc2VhcmNoLmdsb2JhbERhdGEuc2VhcmNoVGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2VhcmNoVmFsdWUgPSBhcHBfc2VhcmNoLmdsb2JhbERhdGEuc2VhcmNoVGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VhcmNoSW5wdXRFdmVudChldmVudDoge1xyXG4gICAgICAgIGRldGFpbDogeyB2YWx1ZTogYW55OyBjdXJzb3I6IGFueTsga2V5Q29kZTogYW55IH07XHJcbiAgICB9KSB7XHJcbiAgICAgICAgYXBwX3NlYXJjaC5nbG9iYWxEYXRhLnNlYXJjaFRleHQgPSBldmVudC5kZXRhaWwudmFsdWU7XHJcbiAgICB9LFxyXG59KTtcclxuIl19