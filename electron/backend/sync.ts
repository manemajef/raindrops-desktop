import { db } from "./db";
import { schema } from "./schema";
import { headers } from "./utils/get-headers";
import { eq } from "drizzle-orm";
export interface RemoteRaindrop {
  _id: number;
  link: string;
  title: string;
  excerpt?: string;
  note?: string;
  cover?: string;
  type: string;
  created: string;
  lastUpdate: string;
  collectionId: { $id: number };
  tags: string[];
  [key: string]: unknown;
}

export interface RemoteCollection {
  _id: number;
  title: string;
  description: string;
  public: boolean;
  count: number;
  cover: string[];
  lastAction: string;
  created: string;
  lastUpdate: string;
  parent: number | null;
  slug: string;
  author: boolean;
}

function toInsertParamsRaindrops(r: RemoteRaindrop) {
  return {
    id: r._id,
    link: r.link,
    title: r.title ?? "",
    excerpt: r.excerpt ?? "",
    note: r.note ?? "",
    created: r.created,
    cover: r.cover ?? "",
    type: r.type,
    lastUpdate: r.lastUpdate,
    collectionId: r.collectionId,
    tags: JSON.stringify(r.tags ?? []),
    raw: JSON.stringify(r),
    syncedAt: new Date().toISOString(),
  };
}
async function fetchAllRaindrops(raindropsURL: string) {
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

function ToInsertParamsCollections(r: RemoteCollection) {
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
  };
}

export async function syncAll() {
  const syncMeta = await db.select().from(schema.syncMeta).limit(1);
  const lastSync = syncMeta[0]?.lastSync;
  let raindropsURL = "https://api.raindrop.io/rest/v1/raindrops/0";
  let lastDate: string | undefined = undefined;
  if (lastSync) {
    // Build ISO string with T00:00:00Z (Raindrop API expects UTC midnight)
    lastDate = new Date(lastSync).toISOString().split("T")[0];
    raindropsURL += `?search=lastUpdate:>${lastDate}`;
  }
  const collectionsURL = "https://api.raindrop.io/rest/v1/collections";
  const [raindropsData, collectionsRes] = await Promise.all([
    fetchAllRaindrops(raindropsURL),
    fetch(collectionsURL, { headers }),
  ]);
  //   const raindropsData = await raindropsRes.json();
  const collectionsData = await collectionsRes.json();
  for (const c of collectionsData.items ?? []) {
    await db
      .insert(schema.collections)
      .values(ToInsertParamsCollections(c))
      .onConflictDoUpdate({
        target: schema.collections.id,
        set: ToInsertParamsCollections(c),
      });
  }
  console.log(raindropsData);
  for (const r of raindropsData ?? []) {
    await db
      .insert(schema.raindrops)
      .values(toInsertParamsRaindrops(r))
      .onConflictDoUpdate({
        target: schema.raindrops.id,
        set: toInsertParamsRaindrops(r),
      });
  }
  const now = new Date().toISOString();
  await db
    .insert(schema.syncMeta)
    .values({ id: 1, lastSync: now })
    .onConflictDoUpdate({
      target: schema.syncMeta.id,
      set: { lastSync: now },
    });
  console.log("synced!");
  return {
    collections: collectionsData.items?.length ?? 0,
    raindrops: raindropsData?.length ?? 0,
  };
}
