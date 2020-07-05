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
      detailType: "pending" | "rejected" | "passed";
    };
    tabDiscoverQuery?: {
      searchText: string;
    };
    groupLikeRecord: Record<string, boolean | undefined>;
    commentLikeRecord: Record<string, boolean | undefined>;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}

export interface CityInfo {
  cityId: string;
  city: string;
  province: string;
  topGroups: string[];
}

export enum GroupStatus {
  "Deleted" = -1,
  "Pending" = 0,
  "Passed" = 1,
  "Rejected" = 2,
  "Repending" = 3,
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
    commentId: string;
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
      status: GroupStatus.Passed | GroupStatus.Pending | GroupStatus.Deleted;
    }
  | { status: GroupStatus.Rejected; rejectReason: string }
  | { status: GroupStatus.Repending; oldGroupId: string }
);

export interface User {
  _id: string;
  userName: string;
  userIcon: string;
}

export interface Event<
  Detail = {},
  DataSet extends Record<string, string | undefined> = {}
> {
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
