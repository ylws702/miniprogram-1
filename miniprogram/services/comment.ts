import db, { _ } from "./db";
import { Comment, User, CommentStatus } from "../model";
import {
  getGroupByGroupId,
  addCommentByGroupId,
  getGroupsByUserId,
} from "./group";
import { uuid, formatTime, queryGet } from "../utils/util";

const db_comment = db.collection("comment");

export async function getCommentByCommentId(commentID: string) {
  const filter: Partial<Comment> = { _id: commentID };
  const { data } = await queryGet(db_comment.where(filter));
  if (data.length === 0) {
    return undefined;
  }
  const city = data[0];
  return city as Comment;
}

export interface CommentTree {
  commentId: string;
  groupId: string;
  user: User;
  createTime: string;
  like: number;
  ifLike: boolean;
  content: string;
  comments: CommentTree[];
}

export async function getCommentsByGroupId(groupId: string) {
  const group = await getGroupByGroupId(groupId);
  console.log("getGroupByGroupId", group);
  if (group) {
    const { comments } = group;
    const tasks = comments.map<Promise<CommentTree | undefined>>(
      async (commentId) => {
        const comment = await getCommentByCommentId(commentId);
        if (!comment) {
          return undefined;
        }
        const tasks = comment.comments.map<Promise<CommentTree | undefined>>(
          async (commentId) => {
            const comment = await getCommentByCommentId(commentId);
            if (!comment) {
              return undefined;
            }
            const { createTime, ...other } = comment;
            return {
              commentId,
              createTime: formatTime(createTime, false),
              ...other,
              user: {
                ...other,
              },
              ifLike: false,
              comments: [],
            };
          }
        );
        const { createTime, ...other } = comment;
        const result: CommentTree = {
          commentId,
          createTime: formatTime(createTime, false),
          ...other,
          user: {
            ...other,
          },
          ifLike: false,
          comments: (await Promise.all(tasks)).filter(Boolean) as CommentTree[],
        };
        return result;
      }
    );
    const results = (await Promise.all(tasks)).filter(Boolean) as CommentTree[];
    return results;
  }
  return [];
}

export interface AddCommentParams {
  groupId: string;
  userId: string;
  userName: string;
  replyTo?: string;
  userIcon: string;
  content: string;
}

export async function addComment(params: AddCommentParams) {
  const fromCommentId = uuid();
  const { replyTo } = params;
  const data: Comment = {
    _id: fromCommentId,
    groupId: params.groupId,
    userId: params.userId,
    userName: params.userName,
    userIcon: params.userIcon,
    content: params.content,
    like: 0,
    createTime: new Date(),
    comments: [],
    groupMasterRead: CommentStatus.Unread,
  };
  if (replyTo) {
    data.replyTo = {
      userId: replyTo,
      read: CommentStatus.Unread,
    };
    await addCommentByCommentId({
      fromCommentId: fromCommentId,
      toCommentId: replyTo,
    });
  } else {
    const { groupId: groupId } = params;
    await addCommentByGroupId({
      groupId,
      commentId: fromCommentId,
    });
  }
  console.log("db_comment.add", data);
  return db_comment.add({
    data,
  });
}

export interface UpdateLikeByCommentIdParams {
  dLike: number;
  commentId: string;
}

export async function updateLikeByCommentId(
  params: UpdateLikeByCommentIdParams
): Promise<void> {
  const group = await getCommentByCommentId(params.commentId);
  if (!group) {
    return Promise.reject("没有该commentId");
  }
  await db_comment.doc(group._id).update({
    data: {
      like: group.like + params.dLike,
    },
  });
}

export interface AddCommentByCommentIdParams {
  fromCommentId: string;
  toCommentId: string;
}
export async function addCommentByCommentId(
  params: AddCommentByCommentIdParams
): Promise<void> {
  const { fromCommentId, toCommentId } = params;
  const toComment = await getCommentByCommentId(toCommentId);
  if (!toComment) {
    return Promise.reject("没有该toCommentId");
  }
  const { comments } = toComment;
  comments.push(fromCommentId);
  await db_comment.doc(toComment._id).update({
    data: {
      comments,
    },
  });
}

export async function getUnreadCommentsByUserId(
  userId: string
): Promise<Comment[]> {
  //群主的：
  const groups = await getGroupsByUserId(userId);
  const promises1 = groups.map(async (group) => {
    const filter1: Partial<Comment> = {
      groupId: group._id,
      groupMasterRead: CommentStatus.Unread,
    };
    const result = await queryGet(db_comment.where(filter1));
    return result.data as Comment[];
  });
  const result1 = await Promise.all(promises1);
  //用户的
  const filter2: Partial<Comment> = {
    replyTo: { userId, read: CommentStatus.Unread },
  };
  const result2 = await queryGet(db_comment.where(filter2));
  const result = (result2.data as Comment[]).concat(...result1);
  return result;
}

export async function getUnreadCommentsCountByUserId(userId: string) {
  //群主的：
  const groups = await getGroupsByUserId(userId);
  const promises1 = groups.map(async (group) => {
    const filter1: Partial<Comment> = {
      groupId: group._id,
      groupMasterRead: CommentStatus.Unread,
    };
    const result = await db_comment.where(filter1).count();
    return result.total;
  });
  const result1 = await Promise.all(promises1);
  //用户的
  const filter2: Partial<Comment> = {
    replyTo: { userId, read: CommentStatus.Unread },
  };
  const result2 = await await db_comment.where(filter2).count();
  const result = result1.reduce((a, b) => a + b, 0) + result2.total;
  return result;
}
