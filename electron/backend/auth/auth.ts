import "dotenv/config";
import { db } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { UserRaw, UserRes } from "../models/user";
import { addUser, activateUser } from "../sync/sync-user";
const { userTable } = schema;
const userUrl = "https://api.raindrop.io/rest/v1/user";

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
    const data: UserRes = await res.json();

    const userRaw: UserRaw = data.user;
    await addUser(userRaw, token);
    return userRaw._id;
  }
  activateUser(user.id, user.token);
  return user.id;
}

// async function test() {
//   const token = process.env.RAINDROP_TOKEN!;
//   const id = await registerToken(token);
//   console.log(id);
//   return id;
// }

// const one: number = 1;

// if (one === 1) {
//   test();
// }
