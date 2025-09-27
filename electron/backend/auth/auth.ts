import { BrowserWindow, shell } from "electron";
import http from "http";
import { db } from "../db";
import { authTokens } from "../schema";
import { eq } from "drizzle-orm";
import { string } from "zod";

function waitForCode(authUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const authWin = new BrowserWindow({
      width: 500,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
      },
    });
    authWin.loadURL(authUrl);
    authWin.webContents.on("will-redirect", (event, url) => {
      const code = new URL(url).searchParams.get("code");
      if (code) {
        event.preventDefault();
        authWin.close();
        resolve(code);
      }
    });
    authWin.on("closed", () => reject(new Error("Auth window closed")));
  });
}

export async function queryToken() {
  const rows = await db.select().from(authTokens).where(eq(authTokens.id, 1));
  return rows[0] ?? null;
}

async function updateToken(token) {
  const nowSec = Math.floor(Date.now() / 1000);
  const expiresInSec = nowSec + token.expires_in;
  await db
    .insert(authTokens)
    .values({
      id: 1,
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      expiresAt: expiresInSec,
    })
    .onConflictDoUpdate({
      target: authTokens.id,
      set: {
        expiresAt: expiresInSec,
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
      },
    });
}

export async function Authenticate() {
  const client_id = process.env.RAINDROP_CLIENT_ID!;
  const client_secret = process.env.RAINDROP_CLIENT_SECRET!;
  const redirectUri = "http://localhost:3000/callback";
  const authUrl = `https://raindrop.io/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code`;

  await shell.openExternal(authUrl);
  const code = await waitForCode(authUrl);

  const tokenRes = await fetch("https://raindrop.io/auth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      redirectUri: redirectUri,
      grant_type: "authorization_code",
      code,
    }),
  });
  const token = await tokenRes.json();
  if (token) {
    await updateToken(token);
    // await db.insert(authTokens).values({
    //   accessToken: token.access_token,
    //   refreshToken: token.refresh_token,
    //   expiresAt: token.expires_in,
    // });
    return token;
  }
  return false;
}

export async function refreshToken() {
  const client_secret = process.env.RAINDROP_CLIENT_SECRET!;
  const client_id = process.env.RAINDROP_CLIENT_ID!;
  const grant_type = "refresh_token";
  const rows = await db
    .select({ refreshToken: authTokens.refreshToken })
    .from(authTokens)
    .where(eq(authTokens.id, 1));
  const refresh_token = rows[0]?.refreshToken;
  if (!refresh_token) {
    const auth = await Authenticate();
    return auth;
  }

  try {
    const tokenRes = await fetch("https://raindrop.io/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: client_id,
        client_secret: client_secret,
        grant_type: grant_type,
        refresh_token: refresh_token,
      }),
    });
    const token = await tokenRes.json();
    await updateToken(token);
    return token;
  } catch (err) {
    console.error(err);
    const auth = await Authenticate();
    return auth;
  }
}

export async function verifyToken() {
  const token = await queryToken();
  if (!token) return false;
  if (Math.floor(Date.now() / 1000) > token.expiresAt) {
    const res = await refreshToken();
    return res;
  }
  return token;
}
