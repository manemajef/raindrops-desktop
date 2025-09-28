import { verifyToken } from "./auth";
import { Headers } from "electron/types/types";

export async function getHeaders() {
  const token = await verifyToken();
  if (!token) return;
  const access_token = token.accessToken;
  const headers: Headers = {
    Authorization: `Bearer ${access_token}`,
  };
  return headers;
}
