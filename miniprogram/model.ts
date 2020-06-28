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

export enum CommentStatus {
  "Unread" = 0,
  "Read" = 1,
}

export interface Comment {
  _id: string;
  groupId: string;
  userId: string;
  userName: string;
  userIcon: string;
  createTime: Date;
  content: string;
  like: number;
  replyTo?: {
    userId: string;
    read: CommentStatus;
  };
  groupMasterRead: CommentStatus;
  comments: string[];
}

export type Group = {
  _id: string;
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
  comments: string[];
} & (
  | {
      status: GroupStatus.Passed | GroupStatus.Pending;
    }
  | { status: GroupStatus.Rejected; rejectReason: string }
);

export interface User {
  _id: string;
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
