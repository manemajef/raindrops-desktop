import { loadState } from "../utils/state";
import * as schema from "../db/schema";
import { db } from "../db";
import type { RaindropRaw, RaindropRes } from "../models/raindrop";
import type { CollectionRaw, CollectionRes } from "../models/collection";
import type { State } from "../models/state";
import { eq } from "drizzle-orm";

export async function syncCollection(collection: CollectionRaw) {
  const { collectionTable } = schema;

  await db
    .insert(collectionTable)
    .values({
      id: collection._id,
      title: collection.title,
      userId: collection.user.$id,
      lastAction: collection.lastAction,
      lastUpdate: collection.lastUpdate,
      created: collection.created,
      parentId: collection.parent?.$id ?? null,
    })
    .onConflictDoUpdate({
      target: collectionTable.id,
      set: {
        title: collection.title,
        lastUpdate: collection.lastUpdate,
        lastAction: collection.lastAction,
        parentId: collection.parent?.$id ?? null,
      },
    });
}

export async function syncRaindrop(raindrop: RaindropRaw) {
  const { raindropTable } = schema;
  await db
    .insert(raindropTable)
    .values({
      id: raindrop._id,
      link: raindrop.link,
      title: raindrop.title,
      excerpt: raindrop.excerpt,
      note: raindrop.note,
      userId: raindrop.user.$id,
      tags: raindrop.tags,
      important: raindrop.important,
      removed: raindrop.removed,
      created: raindrop.created,
      collectionId: raindrop.collectionId > 0 ? raindrop.collectionId : null,
      lastUpdate: raindrop.lastUpdate,
      domain: raindrop.domain,
    })
    .onConflictDoUpdate({
      target: raindropTable.id,
      set: {
        tags: raindrop.tags,
        important: raindrop.important,
        collectionId: raindrop.collectionId,
        lastUpdate: raindrop.lastUpdate,
        note: raindrop.note,
        removed: raindrop.removed,
      },
    });
}

export async function syncCollections(headers: HeadersInit) {
  let res = await fetch("https://api.raindrop.io/rest/v1/collections", {
    headers,
  });
  if (!res.ok) throw new Error("Failed to fetch collections");
  const collectionRes: CollectionRes = await res.json();
  const collections: CollectionRaw[] = collectionRes.items ?? [];
  res = await fetch("https://api.raindrop.io/rest/v1/collections/childrens", {
    headers,
  });
  if (!res.ok) throw new Error("Failed to fetch subcollections");
  const childrenRes: CollectionRes = await res.json();
  if (childrenRes.items?.length) collections.push(...childrenRes.items);
  for (const c of collections) await syncCollection(c);
}

export async function syncRaindrops(headers: HeadersInit) {
  let page = 0;
  const raindrops: RaindropRaw[] = [];
  let done = false;
  while (!done) {
    const res = await fetch(
      `https://api.raindrop.io/rest/v1/raindrops/0?perpage=100&page=${page}`,
      { headers }
    );
    const data: RaindropRes = await res.json();
    if (data.items.length === 0) done = true;
    raindrops.push(...data.items);
    page++;
  }
  for (const r of raindrops) {
    await syncRaindrop(r);
  }
  // const res = await fetch("https://api.raindrop.io/rest/v1/raindrops/0", {
  //   headers,
  // });
  // if (!res.ok) throw new Error("Failed to fetch raindrops");

  // const raindropsRes: RaindropRes = await res.json();
  // for (const r of raindropsRes.items ?? []) await syncRaindrop(r);
}

export async function syncData() {
  const { userTable } = schema;
  const state: State = loadState();
  if (!state.isLogged || !state.user) throw new Error("No user is logged");
  // await db.insert(userTable).values({
  //   id: -1,
  //   title: "unsorted",
  //   userId: state.user.id,
  // });

  const headers = { Authorization: `Bearer ${state.user.token}` };
  await syncCollections(headers);
  await syncRaindrops(headers);

  await db
    .update(userTable)
    .set({ lastSync: new Date().toISOString() })
    .where(eq(userTable.id, state.user.id));
}

// const one: number = 1;
// if (one === 1) {
//   // const state = loadState();
//   // console.log(state);
//   // await syncData();
//   await syncData();
//   const collections = await db.select().from(schema.collectionTable);
//   const raindrops = await db.select().from(schema.raindropTable);
//   console.log(collections);
//   console.log(raindrops);
// }
