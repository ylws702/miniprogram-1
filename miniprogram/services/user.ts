import db from "./db";
import { User } from "../model";

const db_user = db.collection("user");

export async function getUserByUserId(userId: string) {
  const filter: Partial<User> = { userId };
  const { data } = await db_user.where(filter).get();
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
