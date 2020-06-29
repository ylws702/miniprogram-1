// miniprogram/pages/comment/comment.js
// miniprogram/pages/group-pending/group-pending.js
import { IAppOption } from "../../model";
import { toastError } from "../../utils/util";
import { getUnreadCommentsByUserId } from "../../services/comment";
import { getGroupByGroupId } from "../../services/group";

interface CommentData {
  groupTitle: string;
  unreadCount: number;
}
export interface Data {
  commentData: CommentData[];
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
      const comments = await getUnreadCommentsByUserId(userId);
      console.log("pending comments", comments);
      const map = comments.reduce<
        Map<string, { count: number; lastModified: Date }>
      >((map, comment) => {
        const { groupId, createTime } = comment;
        const info = map.get(groupId);
        if (info) {
          const { count, lastModified } = info;
          map.set(groupId, {
            count: count + 1,
            lastModified: lastModified < createTime ? createTime : lastModified,
          });
        } else {
          map.set(groupId, {
            count: 1,
            lastModified: createTime,
          });
        }
        return map;
      }, new Map());
      //	群标题按照最近一条待处理评论的时间顺序排列。
      const data = Array.from(map)
        .map(([groupId, { count, lastModified }]) => ({
          groupId,
          count,
          lastModified,
        }))
        .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());

      that.setData({
        commentData: data.map((item) => ({
          groupTitle: "加载中",
          unreadCount: item.count,
        })),
      });
      data.forEach(async (item, index) => {
        const group = await getGroupByGroupId(item.groupId);
        const { commentData } = that.data;
        commentData[index].groupTitle = group?.title ?? "加载失败";
        that.setData({
          commentData,
        });
      });
    })();
  },
});
