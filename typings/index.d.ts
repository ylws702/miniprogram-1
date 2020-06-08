/// <reference path="./types/index.d.ts" />

interface IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo;
        location?: {
            longitude: number;
            latitude: number;
        };
        searchText?: string;
    };
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
