// miniprogram/pages/group-success/group-success.js

import { getGroupsByUserId } from "../../services/group";
import { GroupStatus, IAppOption, Group } from "../../model";
import { toastError } from "../../utils/util";

// mine.ts
export interface Data {
  groupData: Group[];
}

const data: Data = {
  groupData: [],
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
      const groupData = await getGroupsByUserId(userId, GroupStatus.Passed);
      console.log("Passed groupData", groupData);
      that.setData({
        groupData,
      });
    })();
  },
});
