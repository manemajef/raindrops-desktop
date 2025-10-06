import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const userTable = sqliteTable("user", {
  id: int().primaryKey(),
  fullName: text(),
  email: text(),
  lastAction: text(),
  lastVisit: text(),
  name: text(),
  lastUpdate: text(),
  hashedToken: text(),
});

export const collectionTable = sqliteTable("collection", {
  id: int().primaryKey(),
  title: text(),
  userId: int().references(() => userTable.id),
  count: int(),
  lastAction: int(),
  created: text(),
  lastUpdate: text(),
  parentId: int().notNull().default(-1),
});

export const raindropTable = sqliteTable("raindrop", {
  id: int().primaryKey(),
  link: text(),
  title: text(),
  excerpt: text(),
  note: text(),
  type: text(),
  userId: int().references(() => userTable.id),
  tags: text({ mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
  important: int({ mode: "boolean" }).notNull().default(false),
  removed: int({ mode: "boolean" }).notNull().default(false),
  created: text(),
  collectionId: int().references(() => collectionTable.id),
  lastUpdate: text(),
  domain: text(),
});
