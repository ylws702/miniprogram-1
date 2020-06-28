// miniprogram/pages/detail/detail.js

import { Group, User, IAppOption, GroupStatus, Event } from "../../model";
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
import {
  CommentTree,
  getCommentsByGroupId,
  addComment,
} from "../../services/comment";

export interface Data {
  group: Group;
  user: User;
  createTime: string;
  cityName: string;
  hiddenEditIcon: boolean;
  hiddenPersonalQrCode: boolean;
  comments: CommentTree[];
  myComment: string;
  submitData: {
    content: string;
    replyTo?: string;
  };
}

const data: Data = {
  group: defaultGroup,
  user: defaultUser,
  createTime: loading,
  cityName: loading,
  hiddenEditIcon: true,
  hiddenPersonalQrCode: true,
  comments: [
    {
      commentId: "",
      groupId: "",
      user: defaultUser,
      createTime: new Date(),
      content: "加载中",
      comments: [],
    },
  ],
  myComment: "",
  submitData: {
    content: "",
  },
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
    // 加载评论
    (async () => {
      const comments = await getCommentsByGroupId(groupId);
      console.log("getCommentsByGroupId", comments);
      that.setData({
        comments,
      });
    })();
    (async () => {
      const group = await getGroupByGroupId(groupId);
      console.log("group", group);
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
      const userId = app_detail.globalData.user?._id;
      if (images.length === 0) {
        images.push(defaultGroupImage);
      }
      const hiddenPersonalQrCode = group.personalQrCode.length === 0;
      that.setData({
        group,
        hiddenPersonalQrCode,
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
    const that = this;
    app_detail.globalData.tabPublishQuery = {
      groupId: that.data.group._id,
    };
    console.log("set groupid", that.data.group._id);
    wx.switchTab({
      url: "../publish/publish",
    });
  },
  myCommentInput(e: Event<{ value: string }>) {
    const that = this;
    that.data.submitData.content = e.detail.value;
  },
  async submitComment() {
    const that = this;
    if (!app_detail.globalData.user) {
      toastError("还没登录");
      return;
    }
    const { group, submitData } = that.data;
    const { _id: groupId } = group;
    const { user } = app_detail.globalData;
    const { content } = submitData;
    if (content.length === 0) {
      toastError("未填写回复");
      return;
    }
    try {
      await addComment({
        groupId,
        userId: user._id,
        ...user,
        ...submitData,
      });
      wx.showToast({
        title: "成功",
        icon: "success",
        duration: 2000,
      });
      that.setData({
        submitData: {
          content: "",
        },
      });
      that.onLoad({
        groupId,
      });
    } catch (error) {
      toastError("回复失败");
    }
  },
});
