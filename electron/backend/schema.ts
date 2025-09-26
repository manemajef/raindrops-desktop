import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const raindrops = sqliteTable("raindrops", {
  id: int("id").primaryKey(),
  link: text("link"),
  title: text("title"),
  excerpt: text("excerpt"),
  note: text("note"),
  created: text("created"),
  cover: text("cover"),
  type: text("type"),
  lastUpdate: text("last_update"),
  collection_id: int("collection_id"),
  tags: text("tags").$type<string[]>(),
  raw: text("raw").$type<unknown>(),
  syncedAt: text("synced_at"),
});

export const collections = sqliteTable("collections", {
  id: int("id").primaryKey(),
  title: text("title"),
  public: int("public", { mode: "boolean" }).notNull().default(false),
  count: int("count"),
  cover: text("cover").$type<string[]>(),
  lastAction: text("last_action"),
  description: text("description"),
  created: text("created"),
  lastUpdate: text("last_update"),
  parent: int("parent"),
  slug: text("slug"),
  author: int("author", { mode: "boolean" }).notNull().default(true),
});
export const syncMeta = sqliteTable("sync_meta", {
  id: int("id").primaryKey(),
  lastSync: text("last_sync"),
});

export const schema = {
  raindrops,
  collections,
  syncMeta,
};
