import { db } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { UserRaw } from "../models/user";
import { addUser, activateUser } from "../sync/sync-user";
const { userTable } = schema;
const userUrl = "https://api.raindrop.io/rest/v1/user";

async function insertUser(user: UserRaw) {}

export async function registerToken(token: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.token, token),
  });
  if (!user) {
    const res = await fetch(userUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data: UserRaw = await res.json();
    await addUser(data, token);
    return data._id;
  }
  await activateUser(user.id, user.token);
  return user.id;
}
