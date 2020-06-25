import db from "./db";
import { Comment } from "../model";

const db_comment = db.collection("comment");

export async function getCommentsByUserId(userId: string) {
  const filter: Partial<Comment> = { userId };
  const { data } = await db_comment.where(filter).get();
  return data as Comment[];
}


export async function addComment(comment: Comment) {
  return db_comment.add({
    data: comment,
  });
}
