import { Group, GroupStatus, User } from "../model";
import { Province } from "../services/city";

export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join("-");
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};

export function toastError(error: string) {
  wx.hideLoading();
  wx.showToast({
    title: `错误：${error}`,
    icon: "none",
    duration: 2000,
  });
  console.error(error);
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
    const r = (Math.random() * new Date().getMilliseconds() / 1000 * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const defaultCityData: Province[] = [{ name: '北京市', cities: [] }]