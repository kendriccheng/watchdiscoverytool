# Watch Discovery Tool — Local Setup

This guide walks you through running the Watch Discovery Tool demo on your machine. The app is a frontend-only MVP: listings come from local mock data, and there is no backend or API keys to configure.

## What you get locally

- Browse simulated watch listings from eBay, Etsy, Chrono24, and other sources
- Filter, search, and sort listings (including total cost with shipping estimates)
- Save watches to curated lists
- Create and reuse saved searches (presets ship with the app; custom searches persist in your browser)

For product context and build decisions, see the other docs in this folder (`PRD.md`, `Build spec.md`, etc.).

---

## Prerequisites

Install the following before you start:

| Requirement | Notes |
|-------------|--------|
| **Node.js** | Version **18 or newer** (20+ LTS recommended). Vite 8 and the current toolchain expect a recent Node release. |
| **npm** | Included with Node.js. Used to install dependencies and run scripts. |
| **Git** | Only needed if you are cloning the repository. |
| **Modern browser** | Chrome, Edge, Firefox, or Safari. |

Verify your setup:

```bash
node -v
npm -v
```

---

## Repository layout

The git repository has a nested app folder. Run all npm commands from the **inner** `watchdiscoverytool` directory (the one that contains `package.json`).

```
watchdiscoverytool/                 ← repo root (clone lands here)
├── 0. docs/                        ← project docs (this file)
└── watchdiscoverytool/             ← app root — run npm commands here
    ├── package.json
    ├── src/
    └── ...
```

---

## Quick start

### 1. Get the code

**Option A — Clone from GitHub**

```bash
git clone https://github.com/kendriccheng/watchdiscoverytool.git
cd watchdiscoverytool/watchdiscoverytool
```

**Option B — You already have the folder**

Open a terminal and go to the app directory:

```bash
cd path/to/watchdiscoverytool/watchdiscoverytool
```

### 2. Install dependencies

```bash
npm install
```

This reads `package-lock.json` and installs React, Vite, TypeScript, and other dev dependencies. No environment file (`.env`) is required.

### 3. Start the dev server

```bash
npm run dev
```

Vite prints a local URL in the terminal, typically:

```
http://localhost:5173/
```

Open that URL in your browser. The page hot-reloads when you change source files.

### 4. Stop the server

Press `Ctrl+C` in the terminal where the dev server is running.

---

## Available npm scripts

Run these from `watchdiscoverytool/watchdiscoverytool/`:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the local development server (primary way to demo the app). |
| `npm run build` | Type-check and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally (run `npm run build` first). |
| `npm run lint` | Run ESLint on the codebase. |

---

## Trying the demo

Once the app is open:

1. **Discover** — Use the search bar and filters (marketplace, condition, max price, sort). Enter a Canadian postal code (e.g. `M6K1V8`) to see estimated shipping and total cost on cards.
2. **Saved searches** — Try the preset chips (e.g. “Vintage Timex Collector”). Save your own search from the current filters; custom searches are stored in `localStorage`.
3. **My Lists** — Switch to the Lists tab, save watches from discovery, and organize them into named lists (in-memory for the session unless you extend persistence).

Listing data lives in `src/data/mockListings.ts`. External listing links in the mock data point at real marketplace URLs for reference, but the app does not fetch live inventory.

---

## Troubleshooting

### `npm: command not found` or `node: command not found`

Install Node.js from [https://nodejs.org](https://nodejs.org) (LTS), then open a **new** terminal and run `node -v` again.

### Errors when running `npm install` or `npm run dev`

- Confirm you are in `watchdiscoverytool/watchdiscoverytool/` (the folder with `package.json`), not the repo root or `0. docs/`.
- Upgrade Node to 18+ if you are on an older version.
- Delete `node_modules` and reinstall:

  ```bash
  rm -rf node_modules
  npm install
  ```

  On Windows PowerShell:

  ```powershell
  Remove-Item -Recurse -Force node_modules
  npm install
  ```

### Port 5173 already in use

Either stop the other process using that port, or start Vite on a different port:

```bash
npm run dev -- --port 5174
```

### Blank page or stale behavior after pulling changes

Hard-refresh the browser (`Ctrl+Shift+R` / `Cmd+Shift+R`). If saved searches or postal code seem wrong, clear site data for `localhost` in devtools (Application → Local Storage) or use a private window.

### Production preview looks wrong

Run a fresh build before preview:

```bash
npm run build
npm run preview
```

---

## Tech stack (reference)

- **React 19** + **TypeScript**
- **Vite 8** for dev server and bundling
- **CSS** in `src/index.css` (no separate UI framework)
- **Data**: mock listings in-repo; **persistence**: browser `localStorage` for postal code and user-created saved searches only

---

## Related documentation

| Document | Contents |
|----------|----------|
| `project-requirements.md` | Original build brief |
| `PRD.md` | Product requirements |
| `Build spec.md` | Implementation plan and architecture notes |
| `UX spec.md` | UX and interaction details |

---

## Questions

If setup fails after the steps above, note your OS, Node/npm versions, the exact command you ran, and the full error message—that is usually enough to narrow down path, port, or version issues quickly.
