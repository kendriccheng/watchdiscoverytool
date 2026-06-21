# Watch Discovery Tool – Build Spec

High-level implementation reference for the MVP as built in `watch-app/`. For product intent, see `PRD.md`. For interaction details, see `UX spec.md`.

---

## 1. Overview

Frontend-only MVP that lets users browse mock marketplace listings, search and filter them, estimate total cost with shipping, save watches to curated lists, and reuse saved search presets.

Priorities: speed of delivery, demo clarity, and a realistic discovery workflow — not production-grade backend architecture.

---

## 2. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Routing | None — tab-based views in a single-page app |
| Styling | Global CSS (`src/index.css`) |
| State | React `useState` / `useMemo` / `useCallback` at app root |
| Data | Static mock listings in `src/data/mockListings.ts` |
| Persistence | Browser `localStorage` (postal code + user saved searches only) |
| Backend | None |

---

## 3. Architecture

```
React App (App.tsx)
    │
    ├── Mock listings (mockListings.ts)
    ├── Filter / sort / search (filterAndSortWatches.ts)
    ├── Shipping estimates (shippingEstimate.ts + postal code)
    ├── Saved searches (presets + localStorage)
    └── Curated lists (in-memory session state)
```

No API calls, authentication, or server. Listing links in mock data are placeholders or reference URLs only.

---

## 4. Application Structure

### Views

Two tabs in the header — no client-side router:

- **Discover** — search, postal code, saved-search chips, filters, listings grid
- **My Lists** — saved watches grouped by list name

### Main components

| Area | Components |
|------|------------|
| Discovery | `SavedSearchBar`, `SaveSearchModal`, `ListingsGrid`, `WatchCard` |
| Lists | `ListSection`, `SaveToListModal` |
| Shared UI | `Button`, `Input`, `SearchInput`, `Select`, `Modal`, `Tab`, `EmptyState`, etc. |

State and orchestration live in `App.tsx`. Utilities and hooks are split under `src/utils/` and `src/hooks/`.

---

## 5. Data Model

### Watch listing

```ts
type WatchListing = {
  id: string;
  title: string;
  marketplace: "ebay" | "etsy" | "chrono24" | "other";
  price: number;
  shipping: number;
  totalCost: number;
  condition: "working" | "untested" | "broken";
  imageUrl: string;
  listingUrl: string;
  description: string;
};
```

### Discovery filters

Condition, marketplace, sort order, and max total price — captured in `DiscoveryFilters` and bundled with search query + postal code as `DiscoveryState`.

### Saved search

Named snapshot of discovery state. Presets ship in `presetSavedSearches.ts`; user-created searches persist in `localStorage`.

### Curated lists

In-memory map of list name → `WatchListing[]`. Default list: **Favorites**. Users can create custom lists and toggle watches in/out via the save modal.

---

## 6. Core Behavior

### Discovery

- Text search matches title, marketplace, and description.
- Filters: condition (including “not broken”), marketplace, sort by total cost, max total price.
- Canadian postal code (optional) recalculates estimated shipping and total cost per listing.
- Empty and reset states when no results match.

### Saved searches

- Preset chips (e.g. “Vintage Timex Collector”) apply a full discovery lens in one click.
- Users can save the current search/filters/postal code as a custom lens.
- Custom searches persist across refreshes; presets cannot be deleted.

### Save to list

- Modal from any watch card; toggle membership across lists or create a new list inline.
- Lists are session-only (not persisted to `localStorage` in MVP).

### My Lists

- Shows only lists that contain watches.
- Remove individual watches or clear a list; shipping estimates reflect the postal code from Discover when set.

---

## 7. Persistence

| Data | Storage |
|------|---------|
| Canadian postal code | `localStorage` |
| User saved searches | `localStorage` |
| Curated lists | In-memory (lost on refresh) |
| Mock listings | Static in repo |

---

## 8. MVP Scope

### Included

- Mock marketplace listings with varied price, condition, and source
- Search, filter, sort, and shipping-aware total cost
- Saved search presets and user-created lenses
- Save watches to lists; create and manage list membership
- Discover / My Lists tab navigation

### Excluded

- Live marketplace APIs
- Authentication and accounts
- Backend or cloud sync
- List persistence across sessions
- Recommendations, alerts, or external integrations

---

## 9. Success Criteria

The build meets spec when a user can:

1. Browse listings immediately on load
2. Search, filter, and sort with optional shipping estimates
3. Apply or save discovery lenses
4. Save watches to lists and revisit them on My Lists
5. Complete flows without page reloads or broken modal/navigation behavior

---

## 10. Future Enhancements

- Real marketplace API integration (eBay, Etsy, Chrono24)
- Persist curated lists (Supabase, Firebase, or similar)
- User accounts and cross-device sync
- Alerts for new listings matching saved searches
- Richer filters (brand, era, movement type) and shareable lists
