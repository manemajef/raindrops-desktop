import type { UserRaw } from "../models/user";
import type { State, ActiveUser, Credential } from "../models/state";
import { saveState } from "../utils/state";
import { db } from "../db/index";
import * as schema from "../db/schema";
const { userTable } = schema;
const fakeCredentials: Credential = {
  accessToken: "",
  refreshToken: "",
  tokenStatr: "",
  tokenEnd: "",
};
export function activateUser(user: UserRaw, id: number, token: string) {
  const activeUser: ActiveUser = {
    id: id,
    token: token,
    lastSync: "",
    credentiials: fakeCredentials,
  };
  const state: State = {
    isDev: true,
    isLogged: true,
    user: activateUser,
  };
  saveState(state);
}

export async function addUser(user: UserRaw, token: string) {
  await db.insert(userTable).values({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    lastAction: user.lastAction,
    lastVisit: user.lastVisit,
    token: token,
    name: user.name,
    lastUpdate: user.lastUpdate,
  }).onConflictDoNothing;
  const userId = user._id;
  activateUser(user, userId, token);
}
