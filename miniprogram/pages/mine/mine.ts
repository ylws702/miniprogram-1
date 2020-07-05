import { getGroupCountByUserId } from "../../services/group";
import { getUserId } from "../../services/cloud";
import { getUserByUserId, addUser } from "../../services/user";
import { GroupStatus, IAppOption } from "../../model";
import { getUnreadCommentsCountByUserId } from "../../services/comment";

// mine.ts
export interface Data {
  passedCount: number;
  pendingCount: number;
  rejectedCount: number;
  reviewCount: number;
  userName: string;
  userIconUrl: string;
  HideGetUserInfoBtn: boolean;
}

const data: Data = {
  passedCount: 0,
  pendingCount: 0,
  rejectedCount: 0,
  reviewCount: 0,
  userName: "未登录",
  userIconUrl: "../../images/user.png",
  HideGetUserInfoBtn: false,
};

const app_mine = getApp<IAppOption>();

Page({
  data,
  onPullDownRefresh() {
    const that = this;
    that.onLoad();
  },
  onLoad() {
    const that = this; // 登录
    // wx.login({
    //   success: (res) => {
    //     console.log(res.code);
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // });
    // 查看是否授权
    const initUserData = async (userInfo: WechatMiniprogram.UserInfo) => {
      const userId = (await getUserId()).openid;
      (async () => {
        // TODO:更新用户信息
        const user = await getUserByUserId(userId);
        const { nickName, avatarUrl } = userInfo;
        app_mine.globalData.user = {
          _id: userId,
          userName: nickName,
          userIcon: avatarUrl,
        };
        that.setData({
          userName: nickName,
          userIconUrl: avatarUrl,
          HideGetUserInfoBtn: true,
        });
        if (!user) {
          console.log({ userId, userName: nickName });
          await addUser({
            _id: userId,
            userName: nickName,
            userIcon: avatarUrl,
          });
          return;
        }
        (async () =>
          that.setData({
            passedCount: await getGroupCountByUserId(
              userId,
              GroupStatus.Passed
            ),
          }))();
        (async () =>
          that.setData({
            pendingCount: await getGroupCountByUserId(
              userId,
              GroupStatus.Pending
            ),
          }))();
        (async () =>
          that.setData({
            rejectedCount: await getGroupCountByUserId(
              userId,
              GroupStatus.Rejected
            ),
          }))();
        (async () => {
          that.setData({
            reviewCount: await getUnreadCommentsCountByUserId(userId),
          });
        })();
      })();
    };

    if (app_mine.globalData.userInfo) {
      initUserData(app_mine.globalData.userInfo);
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app_mine.userInfoReadyCallback = (res) => {
        initUserData(res.userInfo);
      };
    }
  },
});
