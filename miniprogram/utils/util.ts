import { Group, GroupStatus, User, IAppOption } from "../model";
import { Province } from "../services/city";

export const formatTime = (date: Date, onlyDate: boolean) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const dateString = [year, month, day].map(formatNumber).join("/");
  const timeString = [hour, minute, second].map(formatNumber).join(":");

  return onlyDate ? dateString : dateString + " " + timeString;
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};

export function toastError(message: string, error?: Error) {
  wx.hideLoading();
  wx.showToast({
    title: `错误：${message}`,
    icon: "none",
    duration: 2000,
  });
  console.error(message, error);
}

export const loading = "加载中";

export const defaultGroup: Group = {
  _id: loading,
  cityId: loading,
  masterId: loading,
  masterName: loading,
  masterPhone: loading,
  images: [],
  title: loading,
  groupQrCode: "../../images/loading.gif",
  personalQrCode: "../../images/loading.gif",
  introduction: loading,
  like: 0,
  status: GroupStatus.Pending,
  createTime: new Date(),
  comments: [],
};

export const defaultUser: User = {
  userName: loading,
  userIcon: "../../images/user.png",
  _id: loading,
};

export const defaultGroupImage: string =
  "https://i.52112.com/icon/256/20190426/37741/1796951.png";

export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r =
        (((Math.random() * new Date().getMilliseconds()) / 1000) * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const defaultCityData: Province[] = [{ name: "北京市", cities: [] }];

export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};

const MAX_LIMIT = 20;

export async function queryGet(query: DB.Query) {
  // 先取出集合记录总数
  const countResult = await query.count();
  const total = countResult.total;
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 20);
  // 承载所有读操作的 promise 的数组
  const tasks = [];
  for (let i = 0; i < batchTimes; i++) {
    const promise = query
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get();
    tasks.push(promise);
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce(
    (acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: cur.errMsg,
      };
    },
    { data: [], errMsg: "" }
  );
}

export type DetailType = NonNullable<
  IAppOption['globalData']['tabPublishQuery']
>['detailType'];
