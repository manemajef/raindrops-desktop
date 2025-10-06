import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import path from "node:path";
import { app } from "electron";
import * as schema from "./schema.js";

const dbPath = path.join(app.getPath("userData"), "data.db");
const client = createClient({ url: `file:${dbPath}` });
export const db = drizzle(client, { schema });
