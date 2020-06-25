// import { uploadImage } from "../../services/image";

import {
  addGroup,
  AddGroupParams,
  getGroupByGroupId,
} from "../../services/group";
import { IAppOption, Event } from "../../model";
import { toastError } from "../../utils/util";
import { uploadImage } from "../../services/image";

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
  onLoad() {
    if (!app_publish.globalData.user) {
      toastError("请先登录");
    }
    if (app_publish.globalData.tabPublishQuery) {
      const { groupId } = app_publish.globalData.tabPublishQuery;
      app_publish.globalData.tabPublishQuery = undefined;
      (async () => {
        const group = await getGroupByGroupId(groupId);
        if (!group) {
          return;
        }
        const {
          images,
          groupQrCode,
          personalQrCode,
          ...otherGroupInfo
        } = group;
        this.setData({
          photos: images.map((url) => ({ url })),
          ...otherGroupInfo,
          groupQrCode: [{ url: groupQrCode }],
          personalQrCode: [{ url: personalQrCode }],
          submitData: group,
        });
      })();
    }
    this.setData({
      uplaodPhotos: this.uplaodPhotos.bind(this),
      uplaodGroupQrCode: this.uplaodGroupQrCode.bind(this),
      uplaodPersonalQrCode: this.uplaodPersonalQrCode.bind(this),
    });
  },

  async uplaodPhotos(files: Files) {
    // 文件上传的函数，返回一个promise
    const imagePaths = files.tempFilePaths;
    const ids = await Promise.all(imagePaths.map(uploadImage));
    this.data.submitData.images.push(...ids);
    console.log("uplaodPhotos", files, ids, this.data.photos);
    return { urls: files.tempFilePaths };
  },
  async uplaodGroupQrCode(files: Files) {
    const imagePaths = files.tempFilePaths[0];
    const id = await uploadImage(imagePaths);
    this.data.submitData.groupQrCode = id;
    console.log("uplaodGroupQrCode", files, id, this.data.photos);
    return { urls: files.tempFilePaths };
  },
  async uplaodPersonalQrCode(files: Files) {
    console.log("上传个人二维码");
    const imagePaths = files.tempFilePaths[0];
    const id = await uploadImage(imagePaths);
    this.data.submitData.personalQrCode = id;
    console.log("uplaodPersonalQrCode", files, id, this.data.photos);
    return { urls: files.tempFilePaths };
  },
  uploadError(e: { detail: any }) {
    console.log("upload error", e.detail);
  },
  uploadSuccess(e: { detail: any }) {
    console.log("upload success", e);
  },
  deletePhotos(e: UploaderDeleteEvent) {
    this.data.submitData.images.splice(e.detail.index, 1);
  },
  deleteGroupQrCode() {
    this.data.submitData.groupQrCode = "";
  },
  deletePersonalQrCode() {
    this.data.submitData.personalQrCode = "";
  },
  titleInput(e: InputEvent) {
    this.data.submitData.title = e.detail.value;
  },
  introductionInput(e: InputEvent) {
    this.data.submitData.introduction = e.detail.value;
  },
  masterNameInput(e: InputEvent) {
    this.data.submitData.masterName = e.detail.value;
  },
  masterPhoneInput(e: InputEvent) {
    this.data.submitData.masterPhone = e.detail.value;
  },
  submitForm() {
    if (!app_publish.globalData.location) {
      toastError("没有位置信息");
      return;
    }
    if (!app_publish.globalData.user) {
      toastError("没有用户信息");
      return;
    }
    const { cityId } = app_publish.globalData.location;
    const { userId } = app_publish.globalData.user;
    const {
      title,
      introduction,
      masterName,
      masterPhone,
      personalQrCode,
      groupQrCode,
      images,
    } = this.data.submitData;
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
    if (personalQrCode.length === 0) {
      toastError("未上传个人二维码");
    }
    (async () => {
      try {
        await addGroup({
          cityId,
          masterId: userId,
          masterName,
          masterPhone,
          images,
          groupQrCode,
          personalQrCode,
          title,
          introduction,
        });
        this.data.submitData = emptySubmitData;
        {
          const {
            groupQrCode,
            personalQrCode,
            ...otherSubmitData
          } = emptySubmitData;
          this.setData({
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
