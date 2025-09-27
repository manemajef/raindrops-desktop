# Raindrops Desktop

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
