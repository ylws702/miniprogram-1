import db from "./db";
import { Group, GroupStatus } from "../model";

const db_group = db.collection("group");

export interface GetGroupsByCityIdParams {
  cityId: string;
  status?: GroupStatus;
}

export async function getGroupsByCityId(params: GetGroupsByCityIdParams) {
  const filter: Partial<Group> = params;
  filter.status ?? (filter.status = GroupStatus.Passed);
  const value = await db_group.where(filter).get();
  return value.data as Group[];
}

export interface SearchGroupsParams {
  cityId: string;
  title: string;
}

export async function searchGroups(params: SearchGroupsParams) {
  const filter: Partial<Group> = {
    cityId: params.cityId,
    status: GroupStatus.Passed,
  };
  const value = await db_group
    .where({
      ...filter,
      title: { $regex: `.*${params.title}.*`, $options: "i" },
    })
    .get();
  return value.data as Group[];
}

export async function getGroupByGroupId(groupId: string) {
  const filter: Partial<Group> = { groupId };
  const { data } = await db_group.where(filter).get();
  if (data.length === 0) {
    return undefined;
  }
  const group = data[0];
  return group as Group;
}

export async function getGroupCountByUserId(
  masterId: string,
  status?: GroupStatus
) {
  const filter: Partial<Group> = { masterId, status };
  const value = await db_group.where(filter).count();
  return value.total;
}

export async function getGroupsByUserId(
  masterId: string,
  status?: GroupStatus
) {
  const filter: Partial<Group> = { masterId, status };
  const value = await db_group.where(filter).get();
  return value.data as Group[];
}

export interface AddGroupParams {
  cityId: string;
  masterId: string;
  masterName: string;
  masterPhone: string;
  images: string[];
  title: string;
  groupQrCode: string;
  personalQrCode: string;
  introduction: string;
}

export async function addGroup(params: AddGroupParams) {
  const groupId = (new Date().getTime() * (Math.random() + 1)).toString(36);
  const data: Group = {
    groupId,
    ...params,
    like: 0,
    status: GroupStatus.Pending,
    createTime: new Date(),
    comments: [],
  };
  await db_group.add({ data });
}
