# WatchScout – UX Specification

High-level interaction model for the Watch Discovery Tool MVP. For implementation detail, see `Build spec.md`.

---

## Overview

WatchScout helps collectors discover, evaluate, and organize second-hand watch listings from multiple marketplaces in one place — without bouncing between sites or relying on memory.

The experience prioritizes:

- **One place to browse** — aggregated listings in a single feed
- **Transparent narrowing** — search, filters, and all-in cost estimates surface what fits
- **Reusable discovery setups** — saved searches apply a full lens in one click
- **Low-friction curation** — save watches to user-defined lists and revisit later
- **Clear separation** — discovery and saved collections live in distinct tabs

---

## Primary User Flow

```text
Open WatchScout (Discover tab)
      ↓
Browse default listings OR apply a saved search
      ↓
(Optional) Enter Canadian postal code for shipping estimates
      ↓
Search + filter to narrow results
      ↓
Review listing cards (item price, shipping, total cost)
      ↓
Save interesting watches → toggle into one or more lists
      ↓
Continue browsing (discovery is never blocked)
      ↓
(Optional) Save current search/filters as a custom saved search
      ↓
(Optional) Switch to My Lists tab
      ↓
Review saved watches by list · search/sort within a list · remove or clear
```

---

## App Structure

Two tabs in the header — no separate routes:

| Tab | Purpose |
|-----|---------|
| **Discover** | Search, filter, apply saved searches, browse results, save watches |
| **My Lists** | View and manage saved watches grouped by list |

Discovery is the default tab. My Lists is secondary navigation that does not interrupt the browse flow.

---

## Discover View

### Search & shipping

- **Search** — keyword match across title, marketplace, and description
- **Shipping destination** — optional Canadian postal code (e.g. `A1A 2B3`) recalculates estimated shipping and total cost per listing
- Postal code persists across sessions; estimates are approximate by destination and marketplace

### Discovery lenses (saved searches)

Named snapshots of search query + filters + postal code. One click applies the full setup.

- **Preset lenses** ship with the app (e.g. “Vintage Timex Collector” — Timex, under $50 all-in, not broken, sorted low to high)
- **Custom lenses** — user saves the current discovery state when it doesn’t already match an existing lens
- Active lens is highlighted; modifying search or filters deselects it and shows a “custom search” hint
- Lenses can be removed (including presets); user-created lenses persist in browser storage

### Filters

Inline filter bar below saved searches:

- Condition (all, not broken, working, untested, broken)
- Marketplace (all, eBay, Etsy, Chrono24, other)
- Sort (default, price low → high, price high → low)
- Max total price
- Clear filters / reset entire discovery state when no results

### Results

- Listings grid updates immediately as search, filters, or postal code change
- Results meta shows count and active lens name when applicable
- Empty state offers reset or clear-filters actions

### Listing card

Each card shows:

- Image, title, marketplace, condition
- Item price, shipping (estimated when postal code set), total cost
- Truncated description
- Save action and which lists the watch is already in

---

## Save to List

Triggered from any listing card’s **Save** button.

- Modal lists existing lists with **toggle** selection — a watch can belong to multiple lists
- **Create new list** inline; watch is added on creation
- **Done** closes the modal; user returns to browsing without a confirmation step
- Default list: **Favorites** (protected from deletion)

Saving is intentionally non-blocking: no forced list choice before continuing discovery.

---

## Save Discovery Lens

Triggered when the current search/filters/postal code don’t match an existing lens.

- Modal summarizes what will be saved (search terms, filters, ship-to)
- User provides a name and optional description
- Saved lens appears as a pill in the discovery bar and becomes the active lens

This is how the product surfaces **potential purchase candidates** — through transparent, user-defined search setups rather than opaque scores or badges.

---

## My Lists View

Shown only when at least one list contains watches; otherwise an empty state directs the user back to Discover.

- Lists render as sections (Favorites, custom lists)
- Shipping estimates reflect the postal code set on Discover (with a note if none set)
- Per-list **search** and **sort** to compare saved watches
- **Remove** individual watches or **Remove all** from a list
- Save modal is available from list cards to adjust list membership

---

## Design Principles

1. **Browse first** — users can scan listings immediately; search and filters refine, they don’t gate entry
2. **All-in cost matters** — total cost including estimated shipping is visible before saving
3. **Transparent candidate surfacing** — saved searches make “what’s worth attention” explicit and reusable
4. **User-controlled curation** — lists express intent (“Potential Purchases”, “Vintage Finds”); the system does not auto-organize
5. **Low-friction saving** — one click to open save modal; toggles and inline list creation; fast return to browsing
6. **Separation of concerns** — Discover for exploration; My Lists for review and comparison
7. **Progressive engagement** — no onboarding required; users start browsing and naturally adopt saved searches and lists

---

## Out of Scope (MVP UX)

- User accounts and cross-device sync
- Live marketplace links as primary navigation (listing URLs are placeholders in mock data)
- List persistence across browser sessions
- Alerts, recommendations, or purchase workflows
