import md5 = require("blueimp-md5");

export function uploadImage(filePath: string) {
  console.log("uploadImage", filePath);
  return new Promise<string>((resolve, fail) => {
    const iid = md5(new Date().toLocaleDateString());
    const cloudPath = `group_images/${iid}.jpg`;
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success(res) {
        resolve(res.fileID);
      },
      fail,
    });
  });
}
