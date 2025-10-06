import type { UserRaw } from "../models/user";
import type { State, ActiveUser, Credentials } from "../models/state";
import { saveState } from "../utils/state";
import { db } from "../db/index";
import * as schema from "../db/schema";

const { userTable } = schema;

const fakeCredentials: Credentials = {
  accessToken: "",
  refreshToken: "",
  tokenStart: "",
  tokenEnd: "",
};

export function activateUser(id: number, token: string) {
  const activeUser: ActiveUser = {
    id,
    token,
    lastSync: new Date(),
    credentials: fakeCredentials,
  };

  const state: State = {
    isDev: true,
    isLogged: true,
    user: activeUser,
  };

  saveState(state);
}

export async function addUser(user: UserRaw, token: string) {
  await db
    .insert(userTable)
    .values({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      lastAction: user.lastAction,
      lastVisit: user.lastVisit,
      token: token,
      name: user.name,
      lastUpdate: user.lastUpdate,
    })
    .onConflictDoUpdate({
      target: userTable.id,
      set: {
        fullName: user.fullName,
        email: user.email,
        lastAction: user.lastAction,
        lastVisit: user.lastVisit,
        token: token,
        name: user.name,
        lastUpdate: user.lastUpdate,
      },
    });

  activateUser(user._id, token);
}
