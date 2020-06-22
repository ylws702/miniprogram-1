import db from "./db";

export async function getUserByUserId(userId: string) {
  const filter: Partial<User> = { userId };
  const value = await db.collection("user").where(filter).get();
  return value.data as Group[];
}

export async function addUser(user: User) {
  return db.collection("user").add({
    data: user,
  });
}
