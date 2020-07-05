// miniprogram/pages/search/search.js

import { Event, IAppOption, Group } from "../../model";
import { toastError, defaultGroup } from "../../utils/util";
import { searchGroups, getCommentGroups } from "../../services/group";

const key_recentSearch = "recentSearch";

export interface Data {
  hotSearchValue: string;
  searchValue: string;
  recentSearch: string[];
  searchVal: string;
  suggestion: Group[];
}

const data: Data = {
  hotSearchValue: "热门搜索:XXXX",
  searchValue: "",
  searchVal: "124",
  recentSearch: [],
  suggestion: [defaultGroup],
};

export const app = getApp<IAppOption>();

interface Option {
  text: string;
  value: string | number;
}

const app_search = getApp<IAppOption>();

Page({
  data,
  onLoad() {
    const that = this;
    that.setData({
      search: that.search.bind(that),
    });
    if (app_search.globalData.location) {
      (async () => {
        if (app_search.globalData.location?.cityId) {
          const suggestion = await getCommentGroups(
            app_search.globalData.location.cityId
          );
          if (suggestion.length === 0) {
            const group = defaultGroup;
            group.title = "暂无推荐";
            suggestion.push(group);
          }
          that.setData({
            suggestion,
          });
        }
      })();
    }
    wx.getStorage({
      key: key_recentSearch,
      success(res) {
        that.setData({
          recentSearch: res.data,
        });
      },
      fail() {
        wx.setStorage({
          key: key_recentSearch,
          data: [],
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
      keyword: title,
    });
    console.log(title, groups);
    const result: Option[] = groups
      .slice(0, 3)
      .map((group) => ({ text: group.title, value: group._id }));
    app.globalData.tabDiscoverQuery = {
      searchText: title,
    };
    result.push({ text: "查看全部结果", value: 0 });
    return result;
  },
  selectResult(e: Event<{ index: number; item: Option }>) {
    const that = this;
    //更新搜索记录
    if (app.globalData.tabDiscoverQuery) {
      const { searchText } = app.globalData.tabDiscoverQuery;
      console.log("更新搜索记录", searchText);
      wx.getStorage({
        key: key_recentSearch,
        success(res) {
          console.log(res);
          const recentSearch: string[] = res.data;
          recentSearch.unshift(searchText);
          recentSearch.push(searchText);
          wx.setStorage({
            key: key_recentSearch,
            data: recentSearch.slice(0, 6),
            success(res) {
              console.log(res);
              that.setData({
                recentSearch,
              });
            },
            fail: console.log,
          });
        },
        fail: console.log,
      });
    }

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
    const that = this;
    that.setData({
      recentSearch: [],
    });
    wx.setStorage({
      key: key_recentSearch,
      data: [],
      success() {
        console.log("清除成功");
      },
    });
  },
  onRecentSearchTap(e: Event<{}, { text: string }>) {
    const that = this;
    that.setData({
      searchValue: e.currentTarget.dataset.text,
    });
  },
});
