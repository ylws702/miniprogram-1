export default function initCloud() {
  wx.cloud.init({
    traceUser: true,
  });
}

export interface UserId {
  appid: string;
  openid: string;
}

export async function getUserId() {
  const cloudResult = await wx.cloud.callFunction({
    name: "getUserId",
  });
  return new Promise<UserId>((resolve, reject) => {
    const { result, errMsg } = cloudResult;
    if (!result) {
      reject(errMsg);
      return;
    }
    resolve(result as UserId);
  });
}
