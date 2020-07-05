import db from './db';
import { Group, GroupStatus } from '../model';
import { queryGet, uuid } from '../utils/util';

const db_group = db.collection("group");
const _ = db.command;

export interface GetGroupsByCityIdParams {
  cityId: string;
  status?: GroupStatus;
}

export async function getGroupsByCityId(params: GetGroupsByCityIdParams) {
  console.log("getGroupsByCityId", params);
  const filter: Partial<Group> = params;
  filter.status ?? (filter.status = GroupStatus.Passed);
  const value = await queryGet(db_group.where(filter));
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

  console.log('searchGroups', params);
  const { data } = await queryGet(
    db_group.where(
      _.and([
        filter,
        _.or([
          {
            title: {
              $regex: `.*${params.keyword}.*`,
              $options: 'i',
            },
          },
          {
            introduction: {
              $regex: `.*${params.keyword}.*`,
              $options: 'i',
            },
          },
        ]),
      ])
    )
  );
  return data as Group[];
}

export async function getGroupByGroupId(groupId: string) {
  const filter: Partial<Group> = { _id: groupId };
  const { data } = await queryGet(db_group.where(filter));
  if (data.length === 0) {
    return undefined;
  }
  const group = data[0];
  return group as Group;
}

export async function getGroupCount(status?: GroupStatus) {
  const filter: Partial<Group> = { status };
  const value = await db_group.where(filter).count();
  return value.total;
}

export async function rejectGroupByGroupId(
  groupId: string,
  rejectReason: string
) {
  const partial: Partial<Group> = {
    status: GroupStatus.Rejected,
    rejectReason,
  };
  await db_group.doc(groupId).update({
    data: partial,
  });
}

export async function passGroupByGroupId(groupId: string) {
  const partial: Partial<Group> = {
    status: GroupStatus.Passed,
  };
  await db_group.doc(groupId).update({
    data: partial,
  });
}

export async function getGroupsByStatus(status: GroupStatus) {
  const filter: Partial<Group> = { status };
  const value = await queryGet(db_group.where(filter));
  return value.data as Group[];
}

export async function getGroupsByStatus(status: GroupStatus) {
  const filter: Partial<Group> = { status };
  const value = await queryGet(db_group.where(filter));
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
  console.log('addGroup', params);
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

export async function editPassedGroup(
  params: AddGroupParams,
  oldGroupId: string
) {
  const groupId = uuid();
  const data: Group = {
    _id: groupId,
    ...params,
    like: 0,
    status: GroupStatus.Repending,
    oldGroupId,
    createTime: new Date(),
    comments: [],
  };
  await db_group.add({ data });
}

export async function deleteGroup(groupId: string) {
  const partial: Partial<Group> = {
    status: GroupStatus.Deleted,
  };
  await db_group.doc(groupId).update({ data: partial });
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
    return Promise.reject('没有该groupId');
  }
  await db_group.doc(group._id).update({
    data: {
      like: group.like + params.dLike,
    },
  });
}

export interface AddCommentsByGroupIdParams {
  commentId: string;
  groupId: string;
}
export async function addCommentByGroupId(
  params: AddCommentsByGroupIdParams
): Promise<void> {
  //TODO
  const { commentId, groupId } = params;
  const group = await getGroupByGroupId(groupId);
  if (!group) {
    return Promise.reject('没有该groupId');
  }
  const { comments } = group;
  comments.push(commentId);
  await db_group.doc(groupId).update({
    data: {
      comments,
    },
  });
}

export async function getCommentGroups(cityId: string) {
  const groups = await getGroupsByCityId({ cityId });
  return groups.sort((a, b) => b.like - a.like).slice(0, 6);
}
