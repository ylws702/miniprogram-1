import { uuid } from "../utils/util";

export function uploadImage(filePath: string) {
  return new Promise<string>((resolve, fail) => {
    const iid = uuid();
    const cloudPath = `group_images/${iid}.jpg`;
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success(res) {
        console.log("uploadImage", filePath, res.fileID);
        resolve(res.fileID);
      },
      fail,
    });
  });
}
