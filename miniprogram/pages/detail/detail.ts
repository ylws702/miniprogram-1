// miniprogram/pages/detail/detail.js

import { Group, User, IAppOption, GroupStatus, Event } from "../../model";
import {
  defaultGroup,
  defaultUser,
  formatTime,
  loading,
  defaultGroupImage,
  toastError,
  DetailType,
} from "../../utils/util";
import { getGroupByGroupId } from "../../services/group";
import { getUserByUserId } from "../../services/user";
import { getCityInfoByCityId } from "../../services/city";
import {
  CommentTree,
  getCommentTreeByGroupId,
  addComment,
  AddCommentParams,
  updateLikeByCommentId,
  readCommentsByGroupMaster,
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
  replyTo: {
    title: string;
    commentId: string;
  };
  showAllReplies: boolean[];
  showComments: boolean;
  showAllComments: boolean;
  type: DetailType;
}

const data: Data = {
  group: defaultGroup,
  user: defaultUser,
  createTime: loading,
  cityName: loading,
  hiddenEditIcon: true,
  hiddenPersonalQrCode: true,
  comments: [],
  myComment: "",
  submitData: {
    content: "",
  },
  showAllReplies: [],
  showComments: false,
  showAllComments: false,
  replyTo: {
    commentId: "",
    title: "",
  },
  type: "passed",
};
const app_detail = getApp<IAppOption>();

Page({
  data,
  onLoad: function (query) {
    console.log("query", query);
    const that = this;
    const { groupId, type } = query;
    that.setData({
      type: (type as DetailType) ?? "",
    });
    if (!groupId) {
      toastError("该群信息不存在");
      return;
    }
    // 加载评论
    (async () => {
      const comments = await getCommentTreeByGroupId(groupId);
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
      if (status === GroupStatus.Passed) {
        that.setData({
          showComments: true,
        });
      }
      const userId = app_detail.globalData.user?._id;
      if (images.length === 0) {
        images.push(defaultGroupImage);
      }
      const hiddenPersonalQrCode = group.personalQrCode.length === 0;
      const newData: Partial<Data> = {
        group,
        hiddenPersonalQrCode,
        createTime: formatTime(group.createTime, true),
      };
      if (userId && masterId === userId) {
        newData.hiddenEditIcon = false;
        readCommentsByGroupMaster(groupId);
      }

      that.setData(newData);
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
    const { group, type: detailType } = that.data;
    const { _id: groupId } = group;
    app_detail.globalData.tabPublishQuery = {
      groupId,
      detailType,
    };
    console.log("set groupid", groupId);
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
    const { replyTo, group, submitData } = that.data;
    const { _id: groupId } = group;
    const { user } = app_detail.globalData;
    const { content } = submitData;
    if (content.length === 0) {
      toastError("未填写回复");
      return;
    }
    try {
      const addCommentParams: AddCommentParams = {
        groupId,
        userId: user._id,
        ...user,
        ...submitData,
      };
      if (replyTo.commentId !== "") {
        addCommentParams.replyTo = replyTo.commentId;
      }
      await addComment(addCommentParams);
      wx.showToast({
        title: "成功",
        icon: "success",
        duration: 2000,
      });
      that.setData({
        submitData: {
          content: "",
        },
        myComment: "",
      });
      that.onShow({
        groupId,
      });
    } catch (error) {
      toastError("回复失败", error);
    }
  },
  onLikeCommentTap(e: Event<{}, { commentid: string; i: string; j?: string }>) {
    const that = this;
    const { comments } = that.data;
    const { commentid, i, j } = e.currentTarget.dataset;
    console.log("dataset", e.currentTarget.dataset);
    const comment =
      j === undefined
        ? comments[Number(i)]
        : comments[Number(i)].comments[Number(j)];
    const { ifLike } = comment;
    const dLike = ifLike ? -1 : 1;
    updateLikeByCommentId({ commentId: commentid, dLike });
    app_detail.globalData.commentLikeRecord[commentid] = !ifLike;
    comment.ifLike = !ifLike;
    comment.like += dLike;
    that.setData({
      comments,
    });
  },
  onReplyTextTap(
    e: Event<{}, { commentid: string; username: string; comment: string }>
  ) {
    const that = this;
    console.log(e);
    const { commentid, username, comment } = e.currentTarget.dataset;
    const title = `回复：${username}:${comment}`;
    that.setData({
      replyTo: {
        title: title.length > 20 ? title.slice(0, 20) + "..." : title,
        commentId: commentid,
      },
    });
  },
  lookAllcollect(e: Event<{}, { i?: string }>) {
    const { i } = e.currentTarget.dataset;
    if (i === undefined) {
      this.setData({
        showAllComments: true,
      });
    } else {
      const { showAllReplies } = this.data;
      showAllReplies[Number(i)] = true;
      this.setData({
        showAllReplies,
      });
    }
    console.log(e);
  },
});
