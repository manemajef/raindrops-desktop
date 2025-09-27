import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";
import { access } from "fs";

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

export const authTokens = sqliteTable("auth_tokens", {
  id: int("id").primaryKey(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiresAt: int("expires_at").notNull(),
});
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

export const schema = {
  raindrops,
  collections,
  syncMeta,
  authTokens,
};
