# Raindrops Desktop

#### current state and workflow

###### **db data (`electron/backend/db/data/local.db`)**

Stores all **raindrops**, **collections**, and **user data** (e.g., credentials, last sync) to reduce Raindrop API calls.  
On startup, data syncs automatically and will later support **incremental sync** (`lastUpdate > lastSync`).  
In the future, user-specific data such as filtered views or tag updates will also be stored here and synced back to Raindrop.

###### **state data (`electron/backend/data/state.json`)**

Contains **core app state** — primarily the active user — so the app can skip unnecessary API calls or database queries.

###### **workflow**

- On startup, the app checks if an **active user** exists via `loadState()` from  
  `electron/backend/utils/state.ts`.

  - If not, it prompts for a **test token**, which is passed to  
    `electron/backend/auth/auth.ts → registerToken(token: string)`.  
    This function fetches user data from the Raindrop API, inserts it into  
    `electron/backend/db/data/local.db`, and updates `electron/backend/data/state.json`.

- Once an active user is found, `electron/backend/sync/sync-data.ts → syncData()` runs automatically,  
  fetching collections and raindrops and updating local data.

> The **public API endpoints** (to be used by the Electron renderer/frontend)  
> are **not yet implemented**, but `registerToken()` and `syncData()` are already functional internally.

## why ?

> Because as usefull as this platform is, it's UI looks like shit and it hurts.

This is **Raindrops Desktop**: a clunky love-letter to productivity masochism. It’s an Electron app that takes your Raindrop.io bookmarks, fetches them with the API, dumps them into SQLite (I wish someone told me before sqlite in electron is such a mess..), and pretends to be useful.

#### Whats the point?

TBH - none.. Im board and Im annoyed that the native app dosnt have the feature to create _Notion_ like "databases" and filter by matching tags, domains etc..
**Will it be usefull?** probably no..

---

## Features (aka: future sources of pain)

- **Bookmark syncing**: Raindrop.io → SQLite, because we obviously trust ourselves more than their infrastructure.
- **Auth handling**: Uses OAuth and refresh tokens
- **Frontend**: React + shadcn/ui
- **Backend**: Drizzle ORM — which sounds fancy until you spend three hours wondering why `references()` explodes. (I realy miss _Flask_ and _FastAPI_ )

---

## If for some reason you want to use it (a.k.a. Setup)

1. **Fork or clone this repo**

   ```bash
   git clone https://github.com/manemajef/raindrops-desktop.git
   cd raindrops-desktop
   ```

2. **Install dependencies**  
   (brace yourself: you’ll need to rebuild `better-sqlite3` at least 7 times)

   ```bash
   pnpm install
   pnpm rebuild
   ```

3. **Run in dev mode**  
   (and pray Electron doesn’t yell about `NODE_MODULE_VERSION` mismatches again)

   ```bash
   pnpm dev
   ```

4. **Build**  
   (for when you want to share the suffering)
   ```bash
   pnpm build
   ```

---

## Roadmap

- [ ] Proper error handling (instead of console.log and despair).
- [ ] Syncing without spamming the Raindrop API like a drunk script kiddie.
- [ ] Something resembling tests. Ha. Sure.
- [ ] Dark mode — because every German README must mention it.

---

## FAQ

**Q: Why does it crash on startup?**  
A: Because you touched it.

**Q: Why SQLite in Electron?**  
A: Because I like pain.

**Q: Why not just use the Raindrop web app?**  
A: Oh look, another genius with hindsight.

---

## Development Notes / Known Issues

- If you see `__dirname is not defined` — congrats, you are me last Tuesday.
- If `better-sqlite3` refuses to build: delete `node_modules`, sacrifice a goat, and run `pnpm rebuild`.
- If nothing works at all, that’s called “feature parity” with my life choices.

---

## License

OpenAI i guess (yes even the readme file was partly generated with chatGPT)

---
