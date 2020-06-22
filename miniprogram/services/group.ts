import db from "./db";
type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export async function getGroupsByCityId(
  cityId: string,
  status?: PropType<Group, "status">
) {
  const filter: Partial<Group> = { cityId, status };
  const value = await db.collection("group").where(filter).get();
  return value.data as Group[];
}

export async function getGroupCountByUserId(
  userId: string,
  status?: PropType<Group, "status">
) {
  const filter: Partial<Group> = { userId, status };
  const value = await db.collection("group").where(filter).count();
  return value.total;
}
