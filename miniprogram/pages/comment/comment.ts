// miniprogram/pages/comment/comment.js
// miniprogram/pages/group-pending/group-pending.js
import { getGroupsByUserId } from "../../services/group";
import { GroupStatus, IAppOption } from "../../model";
import { toastError } from "../../utils/util";

// mine.ts
export interface Data {
  commentData: {
    groupTitle: string;
    newCommentsCount: string;
  }[];
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
      const userId = app_group_pending.globalData?.user?.userId;
      if (!userId) {
        toastError("没有用户信息");
        return;
      }
      const groupData = await getGroupsByUserId(userId, GroupStatus.Pending);
      console.log("pending groupData", groupData);
      that.setData({
        groupData,
      });
    })();
  },
});
