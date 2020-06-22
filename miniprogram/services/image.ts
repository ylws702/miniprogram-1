import md5 = require("blueimp-md5");

export function uploadImage(filePath: string) {
  return new Promise<void>((resolve, fail) => {
    const iid = md5(new Date().toLocaleDateString());
    wx.cloud.uploadFile({
      cloudPath: `group_images/${iid}.jpg`,
      filePath,
      success() {
        resolve();
      },
      fail,
    });
  });
}
