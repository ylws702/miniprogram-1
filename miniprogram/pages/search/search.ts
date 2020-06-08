// miniprogram/pages/search/search.js

const app_search = getApp<IAppOption>();
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
    onLoad() {
        if (app_search.globalData.searchText) {
            this.data.searchValue = app_search.globalData.searchText;
        }
    },
    searchInputEvent(event: {
        detail: { value: any; cursor: any; keyCode: any };
    }) {
        app_search.globalData.searchText = event.detail.value;
    },
});
