// miniprogram/pages/comment/comment.js
// miniprogram/pages/group-pending/group-pending.js
import { IAppOption, Comment } from "../../model";
import { toastError } from "../../utils/util";
import { getCommentsByUserId } from "../../services/comment";

// mine.ts
export interface Data {
  commentData: Comment[];
}

const data: Data = {
  commentData: [],
};

const app_group_pending = getApp<IAppOption>();

Page({
  data,
  onLoad() {
    const that = this;
    (async () => {
      const userId = app_group_pending.globalData?.user?._id;
      if (!userId) {
        toastError("没有用户信息");
        return;
      }
      const commentData = await getCommentsByUserId(userId);
      console.log("pending commentData", commentData);
      that.setData({
        commentData,
      });
    })();
  },
});
