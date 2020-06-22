import db from "./db";

export function getCities() {
  return new Promise<CityInfo[]>((resolve, reject) => {
    db.collection("city")
      .get()
      .then((value) => resolve(value.data as CityInfo[]), reject);
  });
}

export function getCityId(city: string, province: string) {
  const filter: Partial<CityInfo> = {
    city,
    province,
  };
  return new Promise<CityInfo>((resolve, reject) => {
    db.collection("city")
      .where(filter)
      .get()
      .then((value) => {
        const { data } = value;
        if (data.length === 0) {
          reject("没有该城市记录");
          return;
        }
        resolve(data[0] as CityInfo);
      }, reject);
  });
}
