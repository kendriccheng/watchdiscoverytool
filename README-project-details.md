# Watch Discovery Tool — Project Details & Decision Log

> **Purpose of this document:** Support the submission walkthrough. It maps the original brief to what was built, explains scoping decisions, and suggests a presentation structure for evaluators.

---

## 1. Executive Summary

The original brief asked for a tool that **syncs live marketplace listings**, applies **personal preference filters** (budget, condition, “interesting”), and **highlights purchase candidates**.

Within a **48-hour window** and without marketplace API access, I scoped the problem differently:

| Original intent | My interpretation & delivery |
|-----------------|----------------------------|
| Stay on top of listings across sites | Single **Discover** view with normalized mock listings from eBay, Etsy, Chrono24 |
| Match my preferences | **Filters** + **saved search lenses** that encode constraints in one click |
| Remember what I like | **Curated lists** — user-defined collections, not system recommendations |
| Highlight candidates | **Preset lenses** (e.g. “Vintage Timex Collector”) surface the right subset; user saves watches worth attention |

**The bet:** Validate the *discovery and curation workflow* first — aggregation, filtering, shipping-aware totals, and low-friction saving — before investing in live ingestion or automated ranking.

This aligns with the brief’s own guidance: *“Scope it to something you can do well in the time you have”* and *“We're not looking for the most technically complex solution.”*

---

## 2. The Original Ask (Recap)

From `0. docs/project-requirements.md`, the collector wanted:

1. **Sync active listings** from eBay, Chrono24, and other marketplaces
2. **Surface listings** matching:
   - Total cost **< $50 CAD** including shipping to **M6K 1V8**
   - **Not explicitly broken** (battery replacement OK)
   - **Subjectively interesting** — collabs, deadstock, vintage Timex (with example purchase links)
3. **Highlight potential purchase candidates** worth paying attention to

Deliverables: build plan, working MVP, and a walkthrough of decisions and tradeoffs.

---

## 3. What I Built (The Scoped Alternative)

A **frontend-only MVP** (`watch-app/`) that demonstrates a complete discovery → evaluate → curate loop using representative data.

### Core experience

- **Discover tab** — Search-first browsing with filters (condition, marketplace, max total price, sort by cost), optional Canadian postal code for **shipping estimates**, and a **saved search bar** with preset and custom “lenses”
- **My Lists tab** — Saved watches grouped by user-defined lists (default: Favorites); compare and remove without leaving the app
- **Save to list** — Modal with multi-list membership, inline list creation, minimal interruption to browsing

### How the brief’s constraints are represented today

The preset **“Vintage Timex Collector”** lens directly encodes the brief’s example preferences:

- Search: `Timex`
- Condition: not broken
- Max total: $50
- Sort: lowest total first
- Postal code: `M6K 1V8`

Users can save their own lenses (persisted in `localStorage`) when they dial in a combination that works for them.

### Technical shape

| Layer | Choice | Why |
|-------|--------|-----|
| React 19 + TypeScript + Vite | Fast iteration, type-safe data model | Fits 48h solo build |
| Mock listings (`mockListings.ts`) | Controlled dataset | No API keys, no scraping infra, reproducible demo |
| Normalized `WatchListing` type | Same fields regardless of source | Ready for future ingestion swap |
| `filterAndSortWatches.ts` | Decoupled from UI | Ingestion can plug in later without rewriting filters |
| `shippingEstimate.ts` | Zone + marketplace multipliers | Makes “total cost to my door” tangible without live shipping APIs |
| `localStorage` | Postal code + user saved searches | Persistence where it matters most for repeat visits |
| In-memory lists | Session-only curation | Simpler MVP; lists are the “working set” during a browse session |

Full implementation reference: `0. docs/Build spec.md`.

---

## 4. Requirements Mapping

| Requirement (brief / PRD) | Status | Notes |
|---------------------------|--------|-------|
| Aggregate listings from multiple marketplaces | **Partial** | Multiple sources in one UI; **mock data**, not live sync |
| Normalize listing structure | **Done** | Shared `WatchListing` model across eBay, Etsy, Chrono24, other |
| Filter by max total cost (≤ $50) | **Done** | Max price filter; preset lens defaults to $50 |
| Exclude broken / for-parts listings | **Done** | “Not broken” condition filter |
| Shipping to M6K 1V8 in total cost | **Done** | Postal code field + estimate logic; preset uses M6K 1V8 |
| Search by keyword | **Done** | Title, marketplace, description |
| Sort listings | **Partial** | By total cost (low/high); not by title or marketplace |
| Save watches to curated lists | **Done** | Multi-list support, create lists inline |
| List management (add, remove, view) | **Done** | Clear list, remove individual watches |
| Navigate to original listing | **Partial** | Model includes `listingUrl`; mock data mostly uses placeholders |
| Expand listing details | **Not built** | Description shown on card; no expand/collapse or detail page |
| Highlight / identify purchase candidates | **Reframed** | **Saved search lenses** + user curation replace automated highlighting |
| Detect “interesting” (collabs, deadstock, style) | **Reframed** | User judgment via search terms + lists; no ML or similarity engine |
| Live marketplace sync | **Not built** | Explicitly out of scope for MVP (see PRD + business plan) |
| User accounts | **Not built** | Browser-only persistence |
| Alerts for new listings | **Not built** | Future enhancement |

**Legend:** *Done* = implemented in MVP · *Partial* = addressed differently or incompletely · *Reframed* = same user need, different product mechanism · *Not built* = consciously deferred

---

## 5. Key Decisions & Rationale

### Decision 1: Mock data instead of live marketplace APIs

**Context:** eBay, Etsy, and Chrono24 require API approval, keys, rate limits, and ongoing maintenance. Real shipping quotes need seller location and carrier data not available in a weekend build.

**Decision:** Ship a **representative curated dataset** with a normalized schema and decoupled filter layer.

**Tradeoff:** Less “real” inventory, but reliable demo, full control over edge cases (broken vs working, price spread, marketplace mix), and no blocked progress on API paperwork.

**What this validates:** Can a single interface + filters + total-cost awareness reduce manual cross-site browsing?

---

### Decision 2: Saved search lenses instead of automated candidate highlighting

**Context:** The brief asks to “highlight potential purchase candidates.” That implies ranking, scoring, or badges — which needs either live data, purchase history ingestion, or ML.

**Decision:** Introduce **discovery lenses** — named snapshots of search + filters + postal code. Presets model the collector’s stated preferences; users save custom lenses for recurring hunts.

**Tradeoff:** The system does not *proactively* flag “buy this.” The user (or a preset) defines what “candidate” means. This is transparent and matches the PRD assumption that **user-defined organization beats opaque recommendations** in MVP.

**Connection to brief:** “Vintage Timex Collector” is effectively a saved query for the exact constraints in the requirements doc.

---

### Decision 3: Curated lists instead of a recommendation engine

**Context:** “Interesting” is subjective — collabs, deadstock, specific eras. Hard to encode in rules alone.

**Decision:** Let the user **save watches to named lists** (Potential Purchases, Vintage Finds, etc.) with multi-list membership.

**Tradeoff:** More manual than auto-recommendations, but honest about MVP limits and creates a **preference signal** for future personalization (saved watches = training data later).

---

### Decision 4: Shipping estimates vs. exact shipping

**Context:** True shipping to M6K 1V8 requires seller address, item weight, and carrier — unavailable in mock data.

**Decision:** **Approximate** shipping from base mock shipping × Canadian postal zone × marketplace multiplier.

**Tradeoff:** Estimates are labeled as such; still supports the core budget question (“Is this likely under $50 all-in?”).

---

### Decision 5: Frontend-only, no backend

**Context:** 48-hour constraint; evaluation focuses on product thinking, not DevOps.

**Decision:** All state in React; persist only postal code and user-created saved searches in `localStorage`. Lists reset on refresh.

**Tradeoff:** No cross-device sync, but zero deployment complexity and fast local demo (`README - setup.md`).

---

### Decision 6: Search-first UX with tab navigation (not routes)

**Context:** UX spec emphasizes discovery as primary, lists as secondary.

**Decision:** **Discover / My Lists** tabs in header; no React Router.

**Tradeoff:** Simpler state management; sufficient for MVP demo scope.

---

### Decision 7: UI polish investment in Phase 2

**Context:** Time box forces prioritization.

**Decision:** After core flows worked, invested in a **unified design system** (warm vintage palette, shared components, accessible modals, card layout).

**Tradeoff:** Less time for backend/integration features; stronger first impression and clearer hierarchy for walkthrough.

---

## 6. What I Chose Not to Build (And Why)

| Deferred | Reason |
|----------|--------|
| Live listing sync / scraping | API access, ToS, infra, and reliability risk exceed MVP window |
| ML / similarity to past purchases | Needs data pipeline + model iteration; brief examples are URLs, not structured features |
| Automated “candidate” badges | Would be misleading on static mock data; lenses + lists are honest substitutes |
| User accounts & cloud sync | Not required to prove discovery UX; adds auth + storage scope |
| List persistence across sessions | Conscious cut; saved searches persist, lists are session “working memory” |
| Sort by title / marketplace | Price sort covers primary budget use case; time spent elsewhere |
| Listing detail page / expand | Card shows key fields; external navigation deferred until real URLs |
| Notifications / alerts | Depends on live sync; natural Phase 2 after ingestion |
| Purchase / bid automation | Out of product scope |

---

## 7. Suggested Presentation Structure

Use this as a ~15–20 minute walkthrough outline. Adjust depth based on evaluator questions.

### Opening (2 min)

- **Problem:** Fragmented marketplace browsing for vintage Timex under strict budget/condition rules
- **Honest framing:** “I did not build live sync or auto-recommendations. I built the discovery and curation workflow I believe must work first — and encoded your constraints as reusable lenses.”

### Demo flow (8–10 min)

1. **Land on Discover** — Immediate feed; no onboarding
2. **Apply “Vintage Timex Collector” preset** — Show $50 cap, not broken, M6K 1V8, sorted by total
3. **Enter postal code** — Shipping estimates update totals on cards
4. **Tweak filters / search** — e.g. Etsy-only preset for deadstock/collab browsing
5. **Save current search as custom lens** — Shows persistence after refresh
6. **Save a watch to a list** — Multi-list modal, create new list
7. **Switch to My Lists** — Review saved watches, remove, compare totals

### Decisions & tradeoffs (5 min)

- Walk through **Section 5** above — emphasize *why* mock data and *why* lenses over black-box ranking
- Call out **modular ingestion** (`WatchListing` + `filterAndSortWatches`) as the intentional extension point

### What’s under the hood (3 min, if asked)

- Data flow: `mockListings` → enrich with shipping → filter/sort → grid
- Persistence: what survives refresh vs what doesn’t
- Preset definitions: `presetSavedSearches.ts`

### What I’d do next (2 min)

Prioritized roadmap:

1. **Live ingestion** — eBay Browse API first; normalize into existing `WatchListing` shape
2. **Real shipping** — Seller postal code + carrier API or cached estimates
3. **Persist lists** — Supabase/Firebase or similar
4. **Candidate surfacing v2** — Rule-based badges on top of lenses (e.g. “Under budget”, “Matches saved list patterns”)
5. **Alerts** — Notify when new listings match a saved lens
6. **Preference learning** — Use saved lists as signals for ranking (post-validation)

### Close (1 min)

- Restate success criteria met: filter, discover, save, revisit, fewer steps than manual multi-site browsing
- Invite questions on any cut scope

---

## 8. How This Maps to Evaluation Criteria

| What evaluators look for | Where to point |
|--------------------------|----------------|
| Ambiguous problem → concrete scope | Sections 1, 5, 6; `0. docs/PRD.md`, `business-one-pager.md` |
| Product thinking, not just code | Saved lenses vs auto-rank; lists vs ML; shipping estimates labeled honestly |
| Clear communication | This doc + live demo script (Section 7) |
| Understanding how it works | `0. docs/Build spec.md`, `App.tsx` orchestration, `filterAndSortWatches.ts`, `shippingEstimate.ts` |

---

## 9. Related Documentation

| Document | Role |
|----------|------|
| `0. docs/project-requirements.md` | Original build brief |
| `0. docs/PRD.md` | Product requirements derived from the brief |
| `0. docs/business-one-pager.md` | Problem, assumptions, MVP scope at proposal stage |
| `0. docs/UX spec.md` | Interaction design for Discover, Save modal, My Lists |
| `0. docs/Build spec.md` | As-built technical reference |
| `README - setup.md` | Local run instructions for evaluators |

---

## 10. Open Items for Review

Before presenting, consider whether to adjust messaging on:

- [ ] **Listing URLs** — Wire mock cards to real example URLs from the brief for stronger “marketplace” feel
- [ ] **Candidate language** — Rename “lens” to “saved hunt” or add subtle “matches your budget” badges on filtered results
- [ ] **List persistence** — Quick `localStorage` win if evaluators expect saved lists to survive refresh
- [ ] **Sort options** — Add title/marketplace sort if PRD parity matters for the conversation

---

*Last updated: June 2026 — reflects MVP as built in `watch-app/`.*
