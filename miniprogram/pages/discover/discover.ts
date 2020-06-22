import { getCity } from "../../services/map";
import { getCityId } from "../../services/city";

const app_discover = getApp<IAppOption>();

interface Data {
  cityName: String;
  searchValue: string;
  groupData: Group[];
  canIUse: boolean;
}
const data: Data = {
  cityName: "北京市",
  searchValue: "",
  groupData: [],
  canIUse: wx.canIUse("button.open-type.getUserInfo"),
};

Page({
  data,
  onLoad() {
    const that = this;
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
      wx.showLoading({
        title: "正在获取定位",
      });
      getCity()
        .then((value) => {
          const { province, city } = value;
          return getCityId(city, province).then((cityInfo) => {
            app_discover.globalData.location = cityInfo;
            console.log(cityInfo);
            that.setData({
              cityName: cityInfo.city,
            });
          }, console.error);
        }, console.error)
        .finally(() => {
          wx.hideLoading();
        });
    }
    if (app_discover.globalData.searchText) {
      this.data.searchValue = app_discover.globalData.searchText;
    }
  },
  onSearchInputTap() {
    if (this.data.searchValue) {
      app_discover.globalData.searchText = this.data.searchValue;
    }
    wx.navigateTo({ url: "../search/search" });
  },
});
