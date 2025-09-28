import { shell } from "electron";
import http from "http";
import { db } from "../db";
import { authTokens, appState, users } from "../schema";
import { eq } from "drizzle-orm";
import { RemoteUser } from "electron/types/remote-user";
import dotenv from "dotenv";
dotenv.config();
function waitForCode(redirectUri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      if (req.url?.startsWith("/callback")) {
        const code = new URL(req.url, redirectUri).searchParams.get("code");
        res.end("Login successful! You can close this window now.");
        server.close();
        if (code) resolve(code);
        else reject(new Error("No code in callback"));
      }
    });
    server.listen(3000, () => {
      console.log(
        "Listening for OAuth callback on http://localhost:3000/callback"
      );
    });
  });
}

async function getActiveUserId() {
  const [state] = await db
    .select({ userId: appState.userId })
    .from(appState)
    .where(eq(appState.id, 1));
  return state?.userId ?? null;
}

export async function queryToken() {
  const userId = await getActiveUserId();
  if (!userId) return null;
  const [row] = await db
    .select()
    .from(authTokens)
    .where(eq(authTokens.id, userId));
  return row ?? null;
}

async function updateToken(token) {
  const nowSec = Math.floor(Date.now() / 1000);
  const expiresInSec = nowSec + token.expires_in;
  const userId = await getActiveUserId();
  if (!userId) return;

  await db
    .insert(authTokens)
    .values({
      id: userId,
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      expiresAt: expiresInSec,
      userId,
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
async function updateAppState(token) {
  const accessToken = token.access_token;
  const res = await fetch("https://api.raindrop.io/rest/v1/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    return;
  }
  const { user }: { user: RemoteUser } = await res.json();
  await db
    .insert(users)
    .values({
      id: user._id,
      fullName: user.fullName,
    })
    .onConflictDoUpdate({ target: users.id, set: { fullName: user.fullName } });
  await db
    .insert(appState)
    .values({
      id: 1,
      userId: user._id,
    })
    .onConflictDoUpdate({
      target: appState.id,
      set: { userId: user._id, metaId: null, tokenId: null },
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
  const code = await waitForCode(redirectUri);

  const tokenRes = await fetch("https://raindrop.io/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      client_id,
      client_secret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
    }),
  });
  const tokenRaw = await tokenRes.text();
  console.log("OAuth token response:", tokenRes.status, tokenRaw);
  if (!tokenRes.ok) {
    throw new Error(`Token request failed: ${tokenRes.status} ${tokenRaw}`);
  }
  const token = JSON.parse(tokenRaw);
  if (token) {
    await updateAppState(token);
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
  const userId = await getActiveUserId();
  if (!userId) {
    const auth = await Authenticate();
    return auth;
  }
  const [tokenRow] = await db
    .select({ refreshToken: authTokens.refreshToken })
    .from(authTokens)
    .where(eq(authTokens.id, userId));
  const refresh_token = tokenRow?.refreshToken;
  if (!refresh_token) {
    const auth = await Authenticate();
    return auth;
  }

  try {
    const tokenRes = await fetch("https://raindrop.io/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id,
        client_secret,
        grant_type,
        refresh_token,
      }),
    });
    const tokenRaw = await tokenRes.text();
    console.log("OAuth refresh response:", tokenRes.status, tokenRaw);
    if (!tokenRes.ok) {
      throw new Error(`Refresh request failed: ${tokenRes.status} ${tokenRaw}`);
    }
    const token = JSON.parse(tokenRaw);
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
