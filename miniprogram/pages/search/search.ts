// miniprogram/pages/search/search.js

import { Event, IAppOption } from "../../model";
import { toastError } from "../../utils/util";
import { searchGroups } from "../../services/group";

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

export const app = getApp<IAppOption>();

interface Option {
  text: string;
  value: string | number;
}

Page({
  data,
  onLoad() {
    const that = this;
    this.setData({
      search: this.search.bind(this),
    });
    wx.getStorage({
      key: key_recentSearch,
      success(res) {
        that.setData({
          recentSearch: res.data,
        });
      },
    });
  },

  async search(title: string): Promise<Option[]> {
    const { location } = app.globalData;
    if (!location) {
      const errMsg = "没有城市信息";
      toastError(errMsg);
      return Promise.reject(errMsg);
    }
    const { cityId } = location;
    const groups = await searchGroups({
      cityId,
      title,
    });
    console.log(title, groups);
    const result: Option[] = groups
      .slice(0, 3)
      .map((group) => ({ text: group.title, value: group.groupId }));
    app.globalData.tabDiscoverQuery = {
      searchText: title,
    };
    result.push({ text: "查看全部结果", value: 0 });
    return result;
  },
  selectResult(e: Event<{ index: number; item: Option }>) {
    const { value } = e.detail.item;
    if (value === 0) {
      wx.switchTab({
        url: "../discover/discover",
        success() {
          const pages = getCurrentPages();
          pages[pages.length - 1].onLoad();
        },
      });
      return;
    }
    wx.navigateTo({
      url: `../detail/detail?groupId=${value}`,
    });
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
