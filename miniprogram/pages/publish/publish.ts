// import { uploadImage } from "../../services/image";

// miniprogram/pages/publish/publish.

interface Image {
  url: string;
}

export interface Data {
  photos: Image[];
  groupQrCode: Image[];
  personalQrCode: Image[];
}

const data: Data = {
  photos: [],
  groupQrCode: [],
  personalQrCode: [],
};

interface Files {
  tempFilePaths: string[];
}

Page({
  data,
  onLoad() {
    this.setData({
      selectFile: this.selectFile.bind(this),
    });
  },
  selectFile(files: Files) {
    console.log("files", files);
    // 返回false可以阻止某次文件上传
  },
  async uplaodPhotos(files: Files) {
    console.log("uplaodPhotos", files);
    // 文件上传的函数，返回一个promise
    // const imagePath = files.tempFilePaths[0];
    // await uploadImage(imagePath);
    this.setData({
      photos: files.tempFilePaths.map((url) => ({ url })),
    });
    return {
      urls: files.tempFilePaths,
    };
  },
  async uplaodGroupQrCode(files: Files) {
    console.log("uplaodGroupQrCode", files);
    this.setData({
      groupQrCode: files.tempFilePaths.map((url) => ({ url })),
    });
    return {
      urls: files.tempFilePaths,
    };
  },
  async uplaodPersonalQrCode(files: Files) {
    console.log("uplaodPersonalQrCode", files);
    this.setData({
      personalQrCode: files.tempFilePaths.map((url) => ({ url })),
    });
    return {
      urls: files.tempFilePaths,
    };
  },
  uploadError(e: { detail: any }) {
    console.log("upload error", e.detail);
  },
  uploadSuccess(e: { detail: any }) {
    console.log("upload success", e);
  },
});
