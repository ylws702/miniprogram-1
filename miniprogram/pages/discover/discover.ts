import { getCity } from "../../services/map";
import { getCityId, Province, getCityData } from "../../services/city";
import { Group, IAppOption, Event } from "../../model";
import {
  getGroupsByCityId,
  updateLikeByGroupId,
  searchGroups,
} from "../../services/group";
import { toastError } from "../../utils/util";

const app_discover = getApp<IAppOption>();

const key_cityData = "cityData";

type GroupInfo = Group & {
  ifLike: boolean;
};

interface Data {
  cityName: String;
  cityId: string;
  searchValue: string;
  groupData: GroupInfo[];
  canIUse: boolean;
  multiArray: string[][];
  multiIndex: number[];
  cityData: Province[];
  title?: string;
}
const data: Data = {
  cityName: "北京市",
  cityId: "",
  searchValue: "",
  groupData: [],
  canIUse: wx.canIUse("button.open-type.getUserInfo"),
  multiArray: [["加载中"], ["加载中"]],
  multiIndex: [0, 0],
  cityData: [],
  title: undefined,
};

Page({
  data,
  onPullDownRefresh() {
    const that = this;
    that.onLoad();
  },
  onLoad() {
    const that = this;
    if (app_discover.globalData.tabDiscoverQuery) {
      const { title } = that.data;
      that.setData({
        searchValue: title,
        title: app_discover.globalData.tabDiscoverQuery.searchText,
      });
      app_discover.globalData.tabDiscoverQuery = undefined;
    }
    if (app_discover.globalData.userInfo) {
      that.setData({
        userInfo: app_discover.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app_discover.userInfoReadyCallback = (res) => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    }
    if (!app_discover.globalData.location) {
      (async () => {
        try {
          wx.showLoading({
            title: "正在获取定位",
          });
          const city = await getCity();
          const cityInfo = await getCityId(city);
          wx.hideLoading();
          const { cityId } = cityInfo;
          app_discover.globalData.location = cityInfo;
          console.log(cityInfo);
          that.setData({
            cityName: cityInfo.city,
            cityId,
          });
          that.updateGroup();
        } catch (error) {
          wx.hideLoading();
          console.error(error);
          toastError("获取定位失败");
        } finally {
          wx.hideLoading();
        }
      })();
    } else {
      that.updateGroup();
    }
  },
  async updateGroup() {
    const that = this;
    try {
      wx.hideLoading();
      wx.showLoading({
        title: "正在获取群信息",
      });
      const { cityId, title } = that.data;
      const groups = await (title
        ? searchGroups({ cityId, keyword: title })
        : getGroupsByCityId({ cityId }));
      const { likeRecord } = app_discover.globalData;
      const groupData = groups.map(
        (group): GroupInfo => ({
          ...group,
          ifLike: likeRecord[group._id] ?? false,
        })
      );
      that.setData({ groupData });
    } catch (error) {
      console.error(error);
      toastError("获取定位失败");
    } finally {
      wx.hideLoading();
    }
  },
  onSearchInputTap() {
    wx.navigateTo({ url: "../search/search" });
  },
  onLikeTap(e: Event<{}, { groupid: string }>) {
    const that = this;
    const { groupData } = that.data;
    const { groupid } = e.currentTarget.dataset;
    const group: GroupInfo | undefined = groupData.filter(
      (groupInfo) => groupInfo._id === groupid
    )[0];
    if (!group) {
      return;
    }
    const { ifLike } = group;
    const dLike = ifLike ? -1 : 1;
    updateLikeByGroupId({ groupId: groupid, dLike });
    app_discover.globalData.likeRecord[groupid] = !ifLike;
    group.ifLike = !ifLike;
    group.like += dLike;
    that.setData({
      groupData,
    });
  },
  onPickerTap() {
    const that = this;
    const { cityData } = that.data;
    const setCityData = async () => {
      wx.showLoading({
        title: "获取城市中...",
      });
      const cityData = await getCityData();
      wx.setStorage({
        key: key_cityData,
        data: cityData,
      });
      wx.hideLoading();
      const provinces = cityData.map((province) => province.name);
      const firstCities = cityData[0].cities.map((city) => city.city);
      that.setData({
        cityData,
        multiArray: [[...provinces], [...firstCities]],
      });
    };
    if (cityData.length === 0) {
      (async () => {
        wx.getStorage({
          key: key_cityData,
          success(res) {
            const cityData: Province[] = res.data;
            if (cityData.length === 0) {
              setCityData();
              return;
            }
            const provinces = cityData.map((province) => province.name);
            const firstCities = cityData[0].cities.map((city) => city.city);
            that.setData({
              cityData,
              multiArray: [[...provinces], [...firstCities]],
            });
          },
          fail: setCityData,
        });
      })();
    }
  },
  bindMultiPickerColumnChange: function (
    e: Event<{ column: number; value: number }>
  ) {
    const that = this;
    const { column, value } = e.detail;
    console.log("修改的列为", column, "，值为", value);
    const { multiArray, multiIndex, cityData } = that.data;
    if (cityData.length === 0) {
      return;
    }
    multiIndex[column] = value;
    if (column === 0) {
      multiIndex[1] = 0;
      multiArray[1] = cityData[e.detail.value].cities.map((city) => city.city);
    }
    that.setData({
      multiArray,
      multiIndex,
      cityData,
    });
  },
  async bindMultiPickerChange() {
    const that = this;
    try {
      const { multiArray, multiIndex, cityData } = that.data;
      // 没有获取城市数据
      if (cityData.length === 0) {
        return;
      }
      const city = multiArray[1][multiIndex[1]];
      const province = multiArray[0][multiIndex[0]];
      that.setData({
        cityName: city,
      });
      wx.showLoading({
        title: "正在获取城市信息",
      });
      const cityInfo = await getCityId({
        city,
        province,
      });
      wx.hideLoading();
      const { cityId } = cityInfo;
      app_discover.globalData.location = cityInfo;
      console.log(cityInfo);
      that.setData({
        cityName: cityInfo.city,
        cityId,
      });
      that.updateGroup();
    } catch (error) {}
  },
});
