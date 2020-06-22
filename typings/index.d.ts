/// <reference path="./types/index.d.ts" />

interface CityInfo {
  cityId: string;
  city: string;
  province: string;
}

interface Group {
  id: number;
  groupId: string;
  cityId: string;
  userId: string;
  images: string[];
  title: string;
  introduction: string;
  like: number;
  status: "Pending" | "Passed" | "Rejected";
}

interface User {
  userId: string;
  userName: string;
}

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
    user?: {};
    location?: {
      province: string;
      city: string;
      cityId: string;
    };
    searchText?: string;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
