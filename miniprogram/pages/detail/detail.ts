// miniprogram/pages/detail/detail.js

import { Group, User, IAppOption, GroupStatus } from "../../model";
import {
  defaultGroup,
  defaultUser,
  formatTime,
  loading,
  defaultGroupImage,
  toastError,
} from "../../utils/util";
import { getGroupByGroupId } from "../../services/group";
import { getUserByUserId } from "../../services/user";
import { getCityInfoByCityId } from "../../services/city";

export interface Data {
  group: Group;
  user: User;
  createTime: string;
  cityName: string;
  hiddenEditIcon: boolean;
}

const data: Data = {
  group: defaultGroup,
  user: defaultUser,
  createTime: loading,
  cityName: loading,
  hiddenEditIcon: true,
};
const app_detail = getApp<IAppOption>();

Page({
  data,
  onLoad: function (query) {
    const that = this;
    const { groupId } = query;
    if (!groupId) {
      return;
    }
    (async () => {
      const group = await getGroupByGroupId(groupId);
      if (!group) {
        toastError("该群信息不存在");
        return;
      }
      const { images, masterId, status } = group;
      if (status === GroupStatus.Pending) {
        wx.setNavigationBarTitle({
          title: "群详情页（申请中）",
        });
      }
      const userId = app_detail.globalData.user?.userId;
      if (images.length === 0) {
        images.push(defaultGroupImage);
      }
      that.setData({
        group,
        createTime: formatTime(group.createTime),
        hiddenEditIcon: !(userId && masterId === userId),
      });
      (async () => {
        const { masterId } = group;
        const user = await getUserByUserId(masterId);
        that.setData({
          user,
        });
      })();
      (async () => {
        const { cityId } = group;
        const cityInfo = await getCityInfoByCityId(cityId);
        that.setData({
          cityName: cityInfo ? cityInfo.city : "未知",
        });
      })();
    })();
  },
  edit() {
    app_detail.globalData.tabPublishQuery = {
      groupId: this.data.group.groupId,
    };
    wx.switchTab({
      url: "../publish/publish",
    });
  },
});
