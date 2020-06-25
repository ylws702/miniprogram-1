import { getCity } from "../../services/map";
import { getCityId } from "../../services/city";
import { Group, IAppOption, Event } from "../../model";
import {
  getGroupsByCityId,
  updateLikeByGroupId,
  searchGroups,
} from "../../services/group";
import { toastError } from "../../utils/util";

const app_discover = getApp<IAppOption>();

type GroupInfo = Group & {
  ifLike: boolean;
};

interface Data {
  cityName: String;
  searchValue: string;
  groupData: GroupInfo[];
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
    let title: string | undefined = undefined;
    if (app_discover.globalData.tabDiscoverQuery) {
      title = app_discover.globalData.tabDiscoverQuery.searchText;
      app_discover.globalData.tabDiscoverQuery = undefined;
      that.setData({
        searchValue: title,
      });
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
          const { cityId } = cityInfo;
          app_discover.globalData.location = cityInfo;
          console.log(cityInfo);
          that.setData({
            cityName: cityInfo.city,
          });
          const groups = await (title
            ? searchGroups({ cityId, title })
            : getGroupsByCityId({ cityId }));
          const { likeRecord } = app_discover.globalData;
          const groupData = groups.map(
            (group): GroupInfo => ({
              ...group,
              ifLike: likeRecord[group.groupId] ?? false,
            })
          );
          that.setData({ groupData });
        } catch (error) {
          wx.hideLoading();
          console.error(error);
          toastError("获取定位失败");
        } finally {
          wx.hideLoading();
        }
      })();
    }
  },
  onSearchInputTap() {
    wx.navigateTo({ url: "../search/search" });
  },
  onLikeTap(e: Event<{}, { groupid: string }>) {
    const { groupData } = this.data;
    const { groupid } = e.currentTarget.dataset;
    const group: GroupInfo | undefined = groupData.filter(
      (groupInfo) => groupInfo.groupId === groupid
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
    this.setData({
      groupData,
    });
  },
});
