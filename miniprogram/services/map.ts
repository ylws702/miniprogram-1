import md5 = require('blueimp-md5');
const key = 'WEZBZ-D5JWP-F5EDI-VOBGX-B33O3-F5F25';
const sk = 'LbVPiUdMRA4pPVLwqAFPCjfn3CpNHgem'

export type GeoCoderResult = {
    message: string
    status: number;
    result?: {
        address: string;
        address_component: {
            nation: string;
            province: string;
            city: string;
        };
    }
}

export interface GetCityResult {
    province: string;
    city: string;
}

export interface GetLocationResult {
    latitude: number;
    longitude: number;
}

function getLocation() {
    return new Promise<GetLocationResult>((resolve, reject) => {
        if (!wx.getLocation) {
            reject('微信版本不支持定位');
        }
        wx.getLocation({
            success: resolve,
            fail: reject,
        });
    })
}

export async function getCity() {
    const { latitude, longitude } = await getLocation();
    const pos = `${latitude},${longitude}`;
    const url = `/ws/geocoder/v1?key=${key}&location=${pos}`;
    const sig = md5(`${url}${sk}`);
    return new Promise<GetCityResult>((resolve, reject) => {
        wx.request({
            url: `https://apis.map.qq.com${url}&sig=${sig}`,
            success(res) {
                const data = res.data as GeoCoderResult;
                if (data.status !== 0) {
                    reject(data.message);
                    return;
                }
                const addr = data.result?.address_component;
                if (!addr) {
                    reject('geocoder result为空');
                    return;
                }
                if (addr.nation !== '中国') {
                    reject('不在中国');
                    return;
                }
                resolve({
                    province: addr.province,
                    city: addr.city,
                });
            },
            fail(res) {
                reject(res.errMsg);
            }
        })
    })
}