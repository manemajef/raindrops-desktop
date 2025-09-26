import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const envSchema = z.object({
  RAINDROP_TOKEN: z.string().min(1, "RAINDROP_TOKEN is required"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("invalid");
  process.exit(1);
}

const env = parsed.data;

export const RAINDROP_TOKEN = env.RAINDROP_TOKEN;
export const NODE_ENV = env.NODE_ENV;
export const isProduction = env.NODE_ENV === "production";
