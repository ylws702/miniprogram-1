// miniprogram/pages/search/search.js

import { IAppOption } from "../../model";

const key_recentSearch = "recentSearch";

export interface Data {
  hotSearchValue: string;
  searchValue: string;
  recentSearch: string[];
  suggestion: { text: string }[];
  i: number;
}

const data: Data = {
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

const app_search = getApp<IAppOption>();
Page({
  data,
  onLoad() {
    const that = this;
    if (app_search.globalData.searchText) {
      this.data.searchValue = app_search.globalData.searchText;
    }
    wx.getStorage({
      key: key_recentSearch,
      success(res) {
        that.setData({
          recentSearch: res.data,
        });
      },
    });
  },
  search: function () {
    return new Promise((resolve) => {
      if (this.data.i % 2 === 0) {
        setTimeout(() => {
          resolve([
            { text: "搜索结果", value: 1 },
            { text: "搜索结果2", value: 2 },
          ]);
        }, 200);
      } else {
        setTimeout(() => {
          resolve([]);
        }, 200);
      }
      this.setData({
        i: this.data.i + 1,
      });
    });
  },
  searchInputEvent(event: {
    detail: { value: any; cursor: any; keyCode: any };
  }) {
    app_search.globalData.searchText = event.detail.value;
  },
  clearRecent() {
    wx.removeStorage({
      key: key_recentSearch,
      success() {
        console.log("清除成功");
      },
    });
  },
});
