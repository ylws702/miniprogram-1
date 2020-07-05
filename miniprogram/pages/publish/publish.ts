import {
  addGroup,
  AddGroupParams,
  getGroupByGroupId,
  deleteGroup,
  editPassedGroup,
} from "../../services/group";
import { IAppOption, Event } from "../../model";
import { toastError, DetailType } from "../../utils/util";
import { uploadImage } from "../../services/image";
import { getUserByUserId, addUser } from "../../services/user";
import { getUserId } from "../../services/cloud";

// miniprogram/pages/publish/publish.

interface Image {
  url?: string;
  loading?: boolean;
  error?: boolean;
}

export interface Data {
  title: string;
  introduction: string;
  photos: Image[];
  masterName: string;
  masterPhone: string;
  groupQrCode: Image[];
  personalQrCode: Image[];
  submitData: AddGroupParams;
  editGroup?: {
    groupType: DetailType;
    groupId: string;
  };
}

const emptySubmitData: AddGroupParams = {
  cityId: "",
  masterId: "",
  masterName: "",
  masterPhone: "",
  images: [],
  title: "",
  groupQrCode: "",
  personalQrCode: "",
  introduction: "",
};

const data: Data = {
  title: "",
  introduction: "",
  photos: [],
  masterName: "",
  masterPhone: "",
  groupQrCode: [],
  personalQrCode: [],
  submitData: emptySubmitData,
};

interface Files {
  tempFilePaths: string[];
}

const app_publish = getApp<IAppOption>();

type InputEvent = Event<{ value: string }>;

type UploaderDeleteEvent = Event<{
  index: number;
  item: Image;
}>;

Page({
  data,
  onShow() {
    const that = this;
    const initUserData = async (userInfo: WechatMiniprogram.UserInfo) => {
      const userId = (await getUserId()).openid;
      const user = await getUserByUserId(userId);
      const { nickName, avatarUrl } = userInfo;
      app_publish.globalData.user = {
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
        await addUser({ _id: userId, userName: nickName, userIcon: avatarUrl });
        return;
      }
    };
    if (app_publish.globalData.userInfo) {
      initUserData(app_publish.globalData.userInfo);
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app_publish.userInfoReadyCallback = (res) => {
        initUserData(res.userInfo);
      };
    }
    // 带初始值
    if (app_publish.globalData.tabPublishQuery) {
      that.setData(data);
      const {
        groupId,
        detailType: groupType,
      } = app_publish.globalData.tabPublishQuery;
      console.log("tabPublishQuery", groupId);
      app_publish.globalData.tabPublishQuery = undefined;
      (async () => {
        wx.showLoading({
          title: "加载群数据",
        });
        const group = await getGroupByGroupId(groupId);
        console.log("getGroupByGroupId", group);
        wx.hideLoading();
        if (!group) {
          toastError("没有该群的数据");
          return;
        }
        const {
          images,
          groupQrCode,
          personalQrCode,
          title,
          introduction,
          masterName,
          masterPhone,
        } = group;
        const data: Data = {
          title,
          introduction,
          masterPhone,
          masterName,
          photos: images.map((url) => ({ url })),
          groupQrCode: [{ url: groupQrCode }],
          personalQrCode:
            personalQrCode === "" ? [] : [{ url: personalQrCode }],
          submitData: group,
          editGroup: {
            groupType: groupType,
            groupId,
          },
        };
        that.setData(data);
      })();
    }
    that.setData({
      uplaodPhotos: that.uplaodPhotos.bind(that),
      uplaodGroupQrCode: that.uplaodGroupQrCode.bind(that),
      uplaodPersonalQrCode: that.uplaodPersonalQrCode.bind(that),
    });
  },

  async uplaodPhotos(files: Files) {
    const that = this;
    // 文件上传的函数，返回一个promise
    const imagePaths = files.tempFilePaths;
    const ids = await Promise.all(imagePaths.map(uploadImage));
    that.data.submitData.images.push(...ids);
    console.log("uplaodPhotos", files, ids, that.data.photos);
    return { urls: files.tempFilePaths };
  },
  async uplaodGroupQrCode(files: Files) {
    const that = this;
    const imagePaths = files.tempFilePaths[0];
    const id = await uploadImage(imagePaths);
    that.data.submitData.groupQrCode = id;
    console.log("uplaodGroupQrCode", files, id, that.data.photos);
    return { urls: files.tempFilePaths };
  },
  async uplaodPersonalQrCode(files: Files) {
    const that = this;
    console.log("上传个人二维码");
    const imagePaths = files.tempFilePaths[0];
    const id = await uploadImage(imagePaths);
    that.data.submitData.personalQrCode = id;
    console.log("uplaodPersonalQrCode", files, id, that.data.photos);
    return { urls: files.tempFilePaths };
  },
  uploadError(e: { detail: any }) {
    console.log("upload error", e.detail);
  },
  uploadSuccess(e: { detail: any }) {
    console.log("upload success", e);
  },
  deletePhotos(e: UploaderDeleteEvent) {
    const that = this;
    that.data.submitData.images.splice(e.detail.index, 1);
  },
  deleteGroupQrCode() {
    const that = this;
    that.data.submitData.groupQrCode = "";
  },
  deletePersonalQrCode() {
    const that = this;
    that.data.submitData.personalQrCode = "";
  },
  titleInput(e: InputEvent) {
    const that = this;
    that.data.submitData.title = e.detail.value;
  },
  introductionInput(e: InputEvent) {
    const that = this;
    that.data.submitData.introduction = e.detail.value;
  },
  masterNameInput(e: InputEvent) {
    const that = this;
    that.data.submitData.masterName = e.detail.value;
  },
  masterPhoneInput(e: InputEvent) {
    const that = this;
    that.data.submitData.masterPhone = e.detail.value;
  },
  submitForm() {
    const that = this;
    if (!app_publish.globalData.location) {
      toastError("没有位置信息");
      return;
    }
    if (!app_publish.globalData.user) {
      toastError("没有用户信息");
      return;
    }
    const { cityId } = app_publish.globalData.location;
    const { _id: userId } = app_publish.globalData.user;
    const { submitData, editGroup } = that.data;
    const {
      title,
      introduction,
      masterName,
      masterPhone,
      personalQrCode,
      groupQrCode,
      images,
    } = submitData;
    if (title.length === 0) {
      toastError("未填写标题");
      return;
    }
    if (introduction.length === 0) {
      toastError("未填写描述");
      return;
    }
    if (masterName.length === 0) {
      toastError("未填写申请人姓名");
      return;
    }
    if (masterPhone.length === 0) {
      toastError("未填写申请人手机");
      return;
    }
    if (groupQrCode.length === 0) {
      toastError("未上传群二维码");
    }
    (async () => {
      try {
        const params: AddGroupParams = {
          cityId,
          masterId: userId,
          masterName,
          masterPhone,
          images,
          groupQrCode,
          personalQrCode,
          title,
          introduction,
        };
        if (editGroup) {
          const { groupId: oldGroupId, groupType } = editGroup;
          switch (groupType) {
            case "passed":
              await editPassedGroup(params, oldGroupId);
              break;
            case "pending":
            case "rejected":
              await Promise.all([deleteGroup(oldGroupId), addGroup(params)]);
              break;
          }
        } else {
          await addGroup(params);
        }
        that.data.submitData = emptySubmitData;
        {
          const {
            groupQrCode,
            personalQrCode,
            ...otherSubmitData
          } = emptySubmitData;
          that.setData({
            ...otherSubmitData,
            groupQrCode: [],
            personalQrCode: [],
          });
        }
        wx.showToast({
          title: "成功",
          icon: "success",
          duration: 2000,
        });
        setTimeout(() => {
          wx.switchTab({
            url: "../mine/mine",
          });
        }, 2000);
      } catch (error) {
        toastError(error);
      }
    })();
  },
});
