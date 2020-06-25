export interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
    user?: User;
    location?: {
      province: string;
      city: string;
      cityId: string;
    };
    tabPublishQuery?: {
      groupId: string;
    };
    tabDiscoverQuery?: {
      searchText: string;
    };
    likeRecord: Record<string, boolean | undefined>;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}

export interface CityInfo {
  cityId: string;
  city: string;
  province: string;
}

export enum GroupStatus {
  "Pending" = 0,
  "Passed" = 1,
  "Rejected" = 2,
}

export interface Comment {
  commentID: string;
  groupId: string;
  userId: string;
  time: Date;
  content: string;
  comments: Comment[];
}

export type Group = {
  groupId: string;
  cityId: string;
  masterId: string;
  masterName: string;
  masterPhone: string;
  images: string[];
  groupQrCode: string;
  personalQrCode: string;
  title: string;
  introduction: string;
  like: number;
  createTime: Date;
  comments: Comment[];
} & (
  | {
      status: GroupStatus.Passed | GroupStatus.Pending;
    }
  | { status: GroupStatus.Rejected; rejectReason: string }
);

export interface User {
  userId: string;
  userName: string;
  userIcon: string;
}

export interface Event<Detail = {}, DataSet extends Record<string, any> = {}> {
  type: string;
  timeStamp: number;
  target: {
    id: string;
    dataset: DataSet;
  };
  currentTarget: {
    id: string;
    dataset: DataSet;
  };
  detail: Detail;
}
