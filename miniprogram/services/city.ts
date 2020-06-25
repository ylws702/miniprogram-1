import db from "./db";
import { CityInfo } from "../model";
import { uuid } from "../utils/util";
const db_city = db.collection("city");
export function getCities() {
  return new Promise<CityInfo[]>((resolve, reject) => {
    db_city.get().then((value) => resolve(value.data as CityInfo[]), reject);
  });
}

export async function getCityInfoByCityId(cityId: string) {
  const filter: Partial<CityInfo> = { cityId };
  const { data } = await db_city.where(filter).get();
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
    db_city
      .where(filter)
      .get()
      .then((value) => {
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
