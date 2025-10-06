import { loadState, saveState } from "../utils/state";
import { syncData } from "../sync/sync-data";
import { collectionTable, userTable, raindropTable } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { registerToken } from "../auth/auth";
import type { State } from "../models/state";

export async function getCurrentUser() {
  const state = loadState();

  if (state.isLogged && state.user) {
    if (!state.isDev) await syncData();
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, state.user.id),
    });
    return user;
  } else {
    return false;
  }
}

export async function loginUser(token: string) {
  try {
    await registerToken(token);
    return onStartUp();
  } catch (err) {
    return { error: err };
  }
}

export async function logoutUser() {
  const state: State = {
    isDev: true,
    isLogged: false,
    user: null,
  };
  saveState(state);
}

export async function getAllCollections(userId: number) {
  const collections = await db.query.collectionTable.findMany({
    where: eq(collectionTable.userId, userId),
  });
  return collections;
}

export async function getAllRaindrops(userId: number) {
  const raindrops = await db.query.raindropTable.findMany({
    where: eq(raindropTable.userId, userId),
  });
  return raindrops;
}

export async function onStartUp() {
  const user = await getCurrentUser();
  if (!user) return false;
  const userId = user.id;
  const raindrops = await getAllRaindrops(userId);
  const collections = await getAllCollections(userId);
  return {
    user,
    collections,
    raindrops,
  };
}
export async function syncAllData() {
  const state = loadState();
  if (!state.isLogged || !state.user) return;
  await syncData();
  const newData = await onStartUp();
  return newData;
}
