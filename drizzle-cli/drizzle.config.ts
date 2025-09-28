import type { Config } from "drizzle-kit";
export default {
  schema: "../electron/backend/schema.ts",
  out: "../drizzle",
  dialect: "sqlite",
  driver: "sqliteProxy",
  dbCredentials: {
    url: "../data/app.db",
  },
} satisfies Config;
