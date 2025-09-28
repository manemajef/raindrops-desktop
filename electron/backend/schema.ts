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
  collection_id: int("collection_id").references(() => collections.id),
  tags: text("tags").$type<string[]>(),
  raw: text("raw").$type<unknown>(),
  syncedAt: text("synced_at"),
  domain: text("domain"),
  creatorId: int("creator_id"),
  creatorName: text("creator_name"),
  important: int("important", { mode: "boolean" }).default(false),
  removed: int("removed", { mode: "boolean" }).default(false),
  userId: int("user_id").references(() => users.id),
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
  creatorId: text("creator_id"),
  creatorName: text("creator_name"),
  userId: int("user_id").references(() => users.id),
});
export const syncMeta = sqliteTable("sync_meta", {
  id: int("id").primaryKey(),
  lastSync: text("last_sync"),
  userId: int("user_id").references(() => users.id),
});

export const authTokens = sqliteTable("auth_tokens", {
  id: int("id").primaryKey(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiresAt: int("expires_at").notNull(),
  userId: int("user_id").references(() => users.id),
});

export const users = sqliteTable("users", {
  id: int("id").primaryKey(),
  fullName: text("full_name"),
});

export const appState = sqliteTable("app_state", {
  id: int("id").primaryKey(),
  userId: int("user_id").references(() => users.id),
  metaId: int("meta_id").references(() => syncMeta.id),
  tokenId: int("token_id").references(() => authTokens.id),
});

export const schema = {
  raindrops,
  collections,
  syncMeta,
  authTokens,
  users,
};
