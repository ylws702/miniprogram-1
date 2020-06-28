import db from "./db";
import { Comment, User, CommentStatus } from "../model";
import { getGroupByGroupId, addCommentByGroupId } from "./group";
import { uuid } from "../utils/util";

const db_comment = db.collection("comment");

export async function getCommentsByUserId(userId: string) {
  const filter: Partial<Comment> = { userId };
  const { data } = await db_comment.where(filter).get();
  return data as Comment[];
}

export async function getCommentsCountByUserId(userId: string) {
  const filter: Partial<Comment> = { userId };
  const value = await db_comment.where(filter).count();
  return value.total;
}

export async function getCommentByCommentId(commentID: string) {
  const filter: Partial<Comment> = { _id: commentID };
  const { data } = await db_comment.where(filter).get();
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
  createTime: Date;
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
            return {
              commentId,
              ...comment,
              user: {
                ...comment,
              },
              comments: [],
            };
          }
        );
        const result: CommentTree = {
          commentId,
          ...comment,
          user: {
            ...comment,
          },
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
  const commentId = uuid();
  const { replyTo, ...otherParams } = params;
  const data: Comment = {
    _id: commentId,
    ...otherParams,
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
  }
  const { content, groupId } = params;
  await addCommentByGroupId({
    groupId,
    comment: content,
  });
  return db_comment.add({
    data,
  });
}
