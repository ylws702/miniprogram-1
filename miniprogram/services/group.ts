import db from "./db";
import { Group, GroupStatus } from "../model";
import { uuid } from "../utils/util";

const db_group = db.collection("group");

export interface GetGroupsByCityIdParams {
  cityId: string;
  status?: GroupStatus;
}

export async function getGroupsByCityId(params: GetGroupsByCityIdParams) {
  const filter: Partial<Group> = params;
  console.log("getGroupsByCityId", params);
  filter.status ?? (filter.status = GroupStatus.Passed);
  const value = await db_group.where(filter).get();
  return value.data as Group[];
}

export interface SearchGroupsParams {
  cityId: string;
  keyword: string;
}

export async function searchGroups(params: SearchGroupsParams) {
  const filter: Partial<Group> = {
    cityId: params.cityId,
    status: GroupStatus.Passed,
  };
  const _ = db.command;

  console.log("searchGroups", params);
  const { data } = await db_group
    .where(
      _.and([
        filter,
        _.or([
          {
            title: {
              $regex: `.*${params.keyword}.*`,
              $options: "i",
            },
          },
          {
            introduction: {
              $regex: `.*${params.keyword}.*`,
              $options: "i",
            },
          },
        ]),
      ])
    )
    .get();
  return data as Group[];
}

export async function getGroupByGroupId(groupId: string) {
  const filter: Partial<Group> = { _id: groupId };
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
  console.log("addGroup", params);
  const groupId = uuid();
  const data: Group = {
    _id: groupId,
    ...params,
    like: 0,
    status: GroupStatus.Pending,
    createTime: new Date(),
    comments: [],
  };
  await db_group.add({ data });
}

export interface UpdateLikeByGroupIdParams {
  dLike: number;
  groupId: string;
}

export async function updateLikeByGroupId(
  params: UpdateLikeByGroupIdParams
): Promise<void> {
  const group: any = await getGroupByGroupId(params.groupId);
  if (!group) {
    return Promise.reject("没有该groupId");
  }
  await db_group.doc(group._id).update({
    data: {
      like: group.like + params.dLike,
    },
  });
}

export interface UpdateCommentsByGroupIdParams {
  comment: string;
  groupId: string;
}
export async function addCommentByGroupId(
  params: UpdateCommentsByGroupIdParams
): Promise<void> {
  //TODO
  const { comment, groupId } = params;
  const group = await getGroupByGroupId(groupId);
  if (!group) {
    return Promise.reject("没有该groupId");
  }
  const { comments } = group;
  comments.push(comment);
  await db_group.doc(groupId).update({
    data: {
      comments,
    },
  });
}
