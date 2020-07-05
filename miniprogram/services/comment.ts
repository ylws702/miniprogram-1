import db, { _ } from './db';
import { Comment, User, CommentStatus } from '../model';
import {
  getGroupByGroupId,
  addCommentByGroupId,
  getGroupsByUserId,
} from './group';
import {
  uuid,
  formatTime,
  queryGet,
  PartialDeep as DeepPartial,
} from '../utils/util';

const db_comment = db.collection('comment');

export async function getCommentByCommentId(commentID: string) {
  const filter: Partial<Comment> = { _id: commentID };
  const { data } = await queryGet(db_comment.where(filter));
  if (data.length === 0) {
    return undefined;
  }
  const city = data[0];
  return city as Comment;
}

export async function getCommentsByGroupId(groupId: string) {
  const filter: Partial<Comment> = { groupId };
  const { data } = await queryGet(db_comment.where(filter));
  return data as Comment[];
}

export async function getCommentsByFilter(filter: Partial<Comment>) {
  const { data } = await queryGet(db_comment.where(filter));
  return data as Comment[];
}

export interface CommentTree<T = string, U = T> {
  commentId: string;
  groupId: string;
  user: User;
  createTime: T;
  like: number;
  ifLike: boolean;
  content: string;
  comments: CommentTree<U>[];
}

export async function getCommentTreeByGroupId(groupId: string) {
  const group = await getGroupByGroupId(groupId);
  console.log('getGroupByGroupId', group);
  if (group) {
    const { comments } = group;
    const tasks = comments.map<Promise<CommentTree<Date, string> | undefined>>(
      async (commentId) => {
        const comment = await getCommentByCommentId(commentId);
        if (!comment) {
          return undefined;
        }
        //每个评论的回复
        const tasks = comment.comments.map(async (commentId) => {
          const comment = await getCommentByCommentId(commentId);
          if (!comment) {
            return undefined;
          }
          const { createTime, ...other } = comment;
          return {
            commentId,
            createTime: createTime,
            ...other,
            user: {
              ...other,
            },
            ifLike: false,
            comments: [],
          };
        });
        const results = (await Promise.all(tasks)).filter(
          Boolean
        ) as CommentTree<Date>[];

        const { createTime, ...other } = comment;
        const result: CommentTree<Date, string> = {
          commentId,
          createTime: createTime,
          ...other,
          user: {
            ...other,
          },
          ifLike: false,
          //从旧到新
          comments: results
            .sort((a, b) => a.createTime.getTime() - b.createTime.getTime())
            .map<CommentTree>((item) => {
              const { createTime, comments, ...other } = item;
              return {
                createTime: formatTime(createTime, false),
                comments: [],
                ...other,
              };
            }),
        };
        return result;
      }
    );
    const results = (await Promise.all(tasks)).filter(Boolean) as CommentTree<
      Date,
      string
    >[];
    //	用户主评论点赞数最高的2条评论默认位于第一第二位，其他评论按时间顺序排列；
    const first2 = results.sort((a, b) => b.like - a.like).splice(0, 2);
    return first2
      .concat(
        results.sort((a, b) => a.createTime.getTime() - b.createTime.getTime())
      )
      .map<CommentTree>((item) => {
        const { createTime, ...other } = item;
        return {
          createTime: formatTime(createTime, false),
          ...other,
        };
      });
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
      commentId: replyTo,
      read: CommentStatus.Unread,
    };
    await addCommentByCommentId({
      fromCommentId: fromCommentId,
      toCommentId: replyTo,
    });
  } else {
    const { groupId } = params;
    await addCommentByGroupId({
      groupId,
      commentId: fromCommentId,
    });
  }
  console.log('db_comment.add', data);
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
    return Promise.reject('没有该commentId');
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
    return Promise.reject('没有该toCommentId');
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
    replyTo: { commentId: userId, read: CommentStatus.Unread },
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
    replyTo: { commentId: userId, read: CommentStatus.Unread },
  };
  const result2 = await db_comment.where(filter2).count();
  const result = result1.reduce((a, b) => a + b, 0) + result2.total;
  return result;
}

export async function readCommentsByGroupMaster(groupId: string) {
  const comments = await getCommentsByGroupId(groupId);
  const partial: Partial<Comment> = {
    groupMasterRead: CommentStatus.Read,
  };
  const updates = comments.map(({ _id }) =>
    db_comment.doc(_id).update({ data: partial })
  );
  await Promise.all(updates);
}

export async function readRepliesByUser(groupId: string, userId: string) {
  const comments = await getCommentsByFilter({
    groupId,
    userId,
  });
  const partial: DeepPartial<Comment> = {
    replyTo: {
      read: CommentStatus.Read,
    },
  };
  const tasks = comments.map(({ _id }) =>
    db_comment.doc(_id).update({ data: partial })
  );
  await Promise.all(tasks);
}
