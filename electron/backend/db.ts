import { schema } from "./schema";
import fs from "fs";
import path from "path";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const appRoot = process.env.APP_ROOT ?? path.resolve(process.cwd());
const dbPath = path.join(appRoot, "data/app.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const sqlite = new Database(dbPath);

sqlite.pragma("foreign_keys = ON");
sqlite.pragma("journal_mode = WAL");
sqlite.defaultSafeIntegers(true);
export const db = drizzle(sqlite, { schema });
