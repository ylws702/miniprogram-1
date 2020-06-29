import db from "./db";
import { CityInfo } from "../model";
import { uuid, queryGet } from "../utils/util";
const db_city = db.collection("city");
const MAX_LIMIT = 20;

export interface Province {
  name: string;
  cities: CityInfo[];
}

export async function getCityData() {
  // 先取出集合记录总数
  const countResult = await db_city.count();
  const total = countResult.total;
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 20);
  // 承载所有读操作的 promise 的数组
  const tasks = [];
  for (let i = 0; i < batchTimes; i++) {
    const promise = db_city
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get();
    tasks.push(promise);
  }
  const map = new Map<string, CityInfo[]>();
  const thens = tasks.map((task) =>
    task.then((value) => {
      const cityData = value.data as CityInfo[];
      cityData.forEach((cityInfo) => {
        const { province } = cityInfo;
        const value = map.get(province);
        if (value) {
          value.push(cityInfo);
        } else {
          map.set(province, [cityInfo]);
        }
      });
    })
  );
  await Promise.all(thens);
  return Array.from(map).map<Province>((array) => {
    const [name, cities] = array;
    return {
      name,
      cities,
    };
  });
}

export async function getCityInfoByCityId(cityId: string) {
  const filter: Partial<CityInfo> = { cityId };
  const { data } = await queryGet(db_city.where(filter));
  if (data.length === 0) {
    return undefined;
  }
  const city = data[0];
  return city as CityInfo;
}

export interface GetCityIdParams {
  city: string;
  province: string;
}

export function getCityId(params: GetCityIdParams) {
  const filter: Partial<CityInfo> = params;
  return new Promise<CityInfo>((resolve, reject) => {
    queryGet(db_city.where(filter)).then((value) => {
      const { data } = value;
      if (data.length === 0) {
        const cityId = uuid();
        const cityInfo = { ...params, cityId };
        addCity(cityInfo).then(() => resolve(cityInfo));
      }
      resolve(data[0] as CityInfo);
    }, reject);
  });
}

export async function addCity(city: CityInfo) {
  const result = await db_city.add({ data: city });
  return result._id.toString();
}
