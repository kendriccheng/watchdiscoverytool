# Watch Discovery Tool — WatchScout


## Core User Problem

The collector behind this brief isn't asking for another marketplace — they're asking for relief from manually checking sites and hoping they don't miss something.

**The issue:**

> I collect vintage Timex watches and want a better way to stay on top of interesting listings across the market. Today, finding good pieces means manually checking multiple sites, remembering what I like, and hoping I don't miss something.

**What they want the tool to do:**

- Sync active listings from key marketplaces (eBay, Chrono24, and any others you think are worth including).
- Surface listings that match their preferences:
  - Less than **$50** in total cost (including shipping to M6K1V8)
  - Isn't explicitly broken — willing to replace a battery.
  - Is interesting. Collabs, deadstock, vintage models. Three watches they've bought recently:
    - https://www.ebay.ca/itm/377073705816
    - https://www.ebay.ca/itm/117111976291
    - https://www.etsy.com/ca/listing/4469739360
- Highlight and identify potential purchase candidates worth paying attention to.

### My perspective

The brief asks for sync, filters, and highlighting good candidates. All of that makes sense - but what stood out to me is the day-to-day friction of  manually checking eBay, Chrono24, Etsy, and other sites, again and again, with nothing pulling it together in one place - this is the pain point. 

The other half is remembering. A watch that catches your eye on Tuesday is easy to forget by Thursday — unless you can actually recollect what you’ve seen and where you saw it.

That’s the core user problem I wanted to solve:

1. **Cut down the manual checking** — one place to browse instead of bouncing between sites.
2. **Make it easy to hold onto the good ones** — save watches worth coming back to so you’re not relying on memory.

The $50 cap, condition rules, and “interesting” stuff still matter. But they only help if you fix the core user problem.

That’s what I scoped the build around.

---

## Constraints

A few things shaped what was realistic before I decided what to build:

- **48-hour time box** — focus on a working discovery → filter → save loop, not production infra or integrations
- **No live marketplace APIs** — eBay, Chrono24, and Etsy need keys, approval, and ongoing maintenance — use representative mock listings with a normalized data model so live sync can plug in later
- **Exact shipping is hard without seller details** — estimate all-in cost from postal code + marketplace rules instead of live carrier quotes
- **“Interesting” is subjective** — collabs, deadstock, and taste don’t map cleanly to fixed rules, creating a recommendation or scoring system is too much for the this project
- **Highlighting candidates without purchase history or ML** — no structured data from the brief’s example URLs to train on — surface candidates through transparent saved searches, not opaque scores or badges
- **Solo build, frontend-first** — skip accounts, backend, and alerts for the MVP

---

## Scope

I scoped the build around a few concrete pillars — not every feature in the brief on day one, but the pieces that would actually move the needle on manual checking and remembering.

### 1. One place to browse - Discovery Experience

Stop bouncing between eBay, Chrono24, and Etsy. Pull listings into a single discovery view with a consistent layout so the collector can scan everything in one sitting — not three separate tabs.

For the MVP, that means representative data from multiple marketplaces in one feed. Live sync is the natural next step, but the workflow has to work first.

### 2. Filter down to what actually fits

The brief’s rules aren’t optional — **under $50 all-in**, **not explicitly broken**, and room to search for the stuff they actually care about (Timex, collabs, deadstock, etc.).

I wanted filtering and search to do the heavy lifting so they’re not wading through junk. Shipping to **M6K 1V8** matters too — list price alone doesn’t tell you if something’s really in budget.

### 3. Saved searches to surface good candidates

The brief also asks to **highlight potential purchase candidates** — watches worth paying attention to. Rather than hiding how this works with a black-box score, I leaned into letting users quickly save and reuse their own search configurations.

**Saved searches** — snapshots of search terms, filters, and postal code — let them save a setup once and apply it again in one click. The **“Vintage Timex Collector”** preset is basically the brief’s constraints as a saved search. They can create their own when they dial in something that works.

### 4. Curated lists to hold onto the good ones

This is the “remembering” half of the problem. When something catches their eye, they should be able to **save it to a list** — Favorites, Potential Purchases, whatever they name — and come back later without trying to recall which site it was on.

Multi-list support matters here: one watch might be “maybe buy” and “cool vintage find” at the same time.

### 5. Build something that can grow

I didn’t want to hardcode this around one exact criteria — Timex, $50, M6K 1V8 — and call it done. Collectors change what they’re looking for, add new marketplaces, tighten or loosen their rules. The product should be able to move with that.

So I kept the build fairly generic: listings look the same whether they come from eBay, Etsy, or somewhere else; filtering and search sit on their own; saving to lists isn’t tied to any one filter combo. If “interesting” means something different next month, or they want to track a new brand, the app shouldn’t need a rewrite — just updated data or tweaked settings.

That’s the idea: solve today’s problem without limiting capabilities in the future. 

---

## Outcome

If WatchScout is doing its job, the collector spends less time manually checking sites and less mental energy trying to remember what they’ve already seen.

**What that looks like in practice:**

- **One session, one place** — they open the app and scan listings from eBay, Chrono24, and Etsy together instead of checking three sites separately
- **Less noise, faster shortlist** — filters, search, and all-in cost (with shipping estimates) cut the pile down to watches that actually fit their rules — under budget, not broken, worth a look
- **A saved search they can rerun** — apply the same filters and criteria every time without rebuilding from scratch
- **Nothing good gets lost** — watches worth a second look land in curated lists they can come back to days later, with context still attached
- **Less friction than manual browsing** — the whole discover → narrow → save → revisit loop takes fewer steps than their current workflow

**What I’m proving with the MVP:** that this workflow feels better than tab-hopping and mental note-taking — even before live marketplace sync or smarter recommendations are in place. If that holds, adding real data and alerts is worth doing. If it doesn’t, fancier tech won’t fix it.

---
