import db from "./db";
import { User } from "../model";
import { queryGet } from "../utils/util";

const db_user = db.collection("user");

export async function getUserByUserId(userId: string) {
  const filter: Partial<User> = { _id: userId };
  const { data } = await queryGet(db_user.where(filter));
  if (data.length === 0) {
    return undefined;
  }
  const user = data[0];
  return user as User;
}

export async function addUser(user: User) {
  return db_user.add({
    data: user,
  });
}
