import { db } from "./db";
import {
  syncMeta,
  raindrops,
  collections,
  authTokens,
  appState,
} from "./schema";
import { eq } from "drizzle-orm";
import { RemoteCollection } from "electron/types/remote-collection";
import { RemoteRaindrop } from "electron/types/remote-raindrop";

function toInsertRaindrops(r: RemoteRaindrop, userId: number) {
  return {
    id: r._id,
    link: r.link,
    title: r.title ?? "",
    excerpt: r.excerpt ?? "",
    note: r.note ?? "",
    created: r.created,
    cover: r.cover ?? "",
    type: r.type,
    domain: r.domain ?? "",
    creatorId: r.creatorRef._id,
    creatorName: r.creatorRef.name,
    removed: r.removed ?? false,
    important: r.important ?? false,
    lastUpdate: r.lastUpdate,
    collection_id: r.collectionId,
    tags: JSON.stringify(r.tags ?? []),
    raw: JSON.stringify(r),
    syncedAt: new Date().toISOString(),
    userId,
  };
}

function toInsertCollections(r: RemoteCollection, userId: number) {
  return {
    id: r._id,
    title: r.title,
    description: r.description,
    public: r.public,
    count: r.count,
    cover: JSON.stringify(r.cover ?? []),
    lastAction: r.lastAction,
    created: r.created,
    lastUpdate: r.lastUpdate,
    parent: r.parent,
    slug: r.slug,
    author: r.author,
    creatorId: r.creatorRef._id,
    creatorName: r.creatorRef.name,
    userId,
  };
}

async function fetchAllRaindrops(
  raindropsURL: string,
  headers: { Authorization: string }
) {
  console.log(headers);
  let page = 0;
  const perpage = 50;
  let allItems: RemoteRaindrop[] = [];
  console.log(raindropsURL);

  while (true) {
    const separator = raindropsURL.includes("?") ? "&" : "?";
    const url = `${raindropsURL}${separator}page=${page}&perpage=${perpage}`;
    const res = await fetch(url, {
      headers,
    });
    const data = await res.json();

    const items: RemoteRaindrop[] = data.items ?? [];
    if (items.length === 0) break; // no more pages

    allItems = allItems.concat(items);
    page++;
  }

  return allItems;
}

export async function syncAll() {
  const [state] = await db
    .select({ userId: appState.userId })
    .from(appState)
    .where(eq(appState.id, 1));
  const userId = state?.userId;
  if (!userId) return;
  const [syncRow] = await db
    .select({ lastSync: syncMeta.lastSync })
    .from(syncMeta)
    .where(eq(syncMeta.userId, userId));
  const lastSync = syncRow?.lastSync ?? null;
  let raindropsUrl = "https://api.raindrop.io/rest/v1/raindrops/0";
  if (lastSync) {
    const lastDate = new Date(lastSync).toISOString().split("T")[0];
    raindropsUrl += `?search=lastUpdate:>${lastDate}`;
  }
  const collectionsUrl = "https://api.raindrop.io/rest/v1/collections";
  const [tokenRow] = await db
    .select({ accessToken: authTokens.accessToken })
    .from(authTokens)
    .where(eq(authTokens.id, userId));
  const accessToken = tokenRow?.accessToken;
  if (!accessToken) return;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const collectionsRes = await fetch(collectionsUrl, { headers });
  const collectionsJson = await collectionsRes.json();
  const collectionsData = collectionsJson.items ?? [];
  const raindropsData = await fetchAllRaindrops(raindropsUrl, headers);
  for (const c of collectionsData) {
    await db
      .insert(collections)
      .values(toInsertCollections(c, userId))
      .onConflictDoUpdate({
        target: collections.id,
        set: toInsertCollections(c, userId),
      });
  }
  for (const r of raindropsData) {
    await db
      .insert(raindrops)
      .values(toInsertRaindrops(r, userId))
      .onConflictDoUpdate({
        target: raindrops.id,
        set: toInsertRaindrops(r, userId),
      });
  }
  const now = new Date().toISOString();
  await db
    .insert(syncMeta)
    .values({ id: userId, userId, lastSync: now })
    .onConflictDoUpdate({
      target: syncMeta.id,
      set: { lastSync: now },
    });
  console.log("Synced!");
}

export async function resyncAll() {
  const [state] = await db
    .select({ userId: appState.userId })
    .from(appState)
    .where(eq(appState.id, 1));
  const userId = state?.userId;
  if (!userId) return;
  await db
    .update(syncMeta)
    .set({ lastSync: null })
    .where(eq(syncMeta.userId, userId));
  await syncAll();
}
