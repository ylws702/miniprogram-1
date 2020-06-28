import initCloud from "./services/cloud";
import { IAppOption } from "./model";

// app.ts
App<IAppOption>({
  globalData: { likeRecord: {} },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    const that=this;
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    initCloud();
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });
  },
});

export const app = getApp<IAppOption>();
