import { getGroupCountByUserId } from "../../services/group";
import { getUserId } from "../../services/cloud";
import { getUserByUserId, addUser } from "../../services/user";

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
        const user = await getUserByUserId(userId);
        const { nickName, avatarUrl } = userInfo;
        that.setData({
          userName: nickName,
          userIconUrl: avatarUrl,
          HideGetUserInfoBtn: true,
        });
        if (user.length === 0) {
          await addUser({ userId, userName: nickName });
          return;
        }
        (async () =>
          that.setData({
            passedCount: await getGroupCountByUserId(userId, "Passed"),
          }))();
        (async () =>
          that.setData({
            pendingCount: await getGroupCountByUserId(userId, "Pending"),
          }))();
        (async () =>
          that.setData({
            rejectedCount: await getGroupCountByUserId(userId, "Rejected"),
          }))();
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
