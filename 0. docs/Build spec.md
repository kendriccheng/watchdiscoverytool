# Watch Discovery Tool – Build Spec

 

## 1. Overview

 

This build implements a lightweight MVP of the Watch Discovery Tool.

 

The system enables users to:

 

- Browse watch listings from a simulated marketplace dataset

- Search and filter listings

- Save watches into curated lists

- Create and manage lists

- Navigate between discovery and saved collections

 

The implementation prioritizes speed, simplicity, and demonstrability over production-grade architecture.

 

---

 

## 2. Tech Stack (Recommended)

 

### Frontend

 

- React (Vite or Next.js)

- TypeScript

- Simple CSS (or Tailwind for speed)

 

### State Management

 

- React useState / useReducer (no Redux required)

 

### Data Storage (MVP)

 

- In-memory state OR localStorage persistence

 

### Backend (Optional / Not required)

 

- None required for MVP

- Marketplace data will be mocked locally

 

---

 

## 3. System Architecture (High Level)

 

```text

+----------------------+

|  Frontend (React)    |

+----------------------+

          |

          v

+----------------------+

| Mock Listings Data   |

| (JSON file / module) |

+----------------------+

          |

          v

+----------------------+

| UI State Layer       |

| - Search             |

| - Filters            |

| - Saved Lists        |

+----------------------+

```

 

No backend services are required.

 

---

 

## 4. Core Data Model

 

### 4.1 Watch Listing

 

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

 

### 4.2 Curated List

 

```ts

type WatchList = {

  id: string;

  name: string;

  description?: string;

  watches: WatchListing[];

  createdAt: string;

};

```

 

### 4.3 App State

 

```ts

type AppState = {

  listings: WatchListing[];

  filteredListings: WatchListing[];

  searchQuery: string;

  watchLists: WatchList[];

  selectedListId: string | null;

};

```

 

---

 

## 5. Data Strategy (Mock Marketplace Listings)

 

Since API access is not used in MVP:

 

**Approach:**

 

- Create a static JSON file: `mockListings.ts`

- Include ~30–50 watch listings

- Ensure variety:

  - price range ($10–$200, but filter focuses on <$50)

  - conditions (working / broken / untested)

  - marketplaces (eBay, Etsy, Chrono24)

  - styles (vintage, military, dress, etc.)

 

**Purpose:**

 

- Simulate real marketplace variability

- Allow filtering + search logic to be demonstrated

- Support realistic UX demo

 

---

 

## 6. Frontend Architecture

 

### 6.1 Pages

 

**1. Discovery Page (Primary)**

 

- Route: `/`

- Includes:

  - Header

  - Search bar

  - Listings feed

  - Save-to-list modal trigger

 

**2. My Lists Page**

 

- Route: `/lists`

- Includes:

  - List overview

  - Individual list detail view

  - Remove watches from lists

 

---

 

## 7. Component Breakdown

 

### 7.1 Layout Components

 

**AppHeader**

 

- Title

- "My Lists" navigation link

 

**SearchBar** — Responsibilities:

 

- Capture search input

- Update searchQuery state

- Trigger filtering logic

 

**ListingsGrid** — Responsibilities:

 

- Render filtered listings

- Map WatchCard components

 

**WatchCard** — Responsibilities:

 

- Display listing info

- Trigger Save modal

- Navigate to listing detail (optional)

 

### 7.2 Save Flow Components

 

**SaveToListModal** — Responsibilities:

 

- Show existing lists

- Allow list selection

- Trigger create new list flow

- Confirm save action

 

State handled:

 

- selectedListId

- modal open/close state

 

**CreateListModal** — Responsibilities:

 

- Capture list name + optional description

- Create new WatchList object

- Add selected watch automatically

 

### 7.3 Lists Page Components

 

**ListsSidebar (or ListSelector)**

 

- Display all user lists

- Allow switching between lists

 

**ListDetailView**

 

- Render watches inside selected list

- Allow removal of watches

 

---

 

## 8. Core Logic Flows

 

### 8.1 Search Flow

 

```text

User types query

      ↓

Filter mockListings

      ↓

Update filteredListings state

      ↓

Re-render ListingsGrid

```

 

### 8.2 Save to List Flow

 

```text

User clicks "Save"

      ↓

Open SaveToListModal

      ↓

User selects list OR creates new list

      ↓

Add watch to selected WatchList

      ↓

Update watchLists state

      ↓

Close modal

```

 

### 8.3 Create List Flow

 

```text

User enters list name

      ↓

Create WatchList object

      ↓

Append to watchLists array

      ↓

Auto-add selected watch

      ↓

Close modal

```

 

---

## 9. Filtering Logic (MVP Rules)

 

**Budget Filter (Implicit Rule)**

 

- totalCost ≤ $50 CAD (primary constraint from prompt)

 

**Condition Filter** — Exclude:

 

- "broken"

- "for parts"

 

**Search Filter** — Match against:

 

- title

- marketplace

- description

- style keywords

 

---

 

## 10. State Management Strategy

 

**Approach: Local React State**

 

Why:

 

- Faster to implement

- No backend required

- Sufficient for demo purposes

 

State stored in:

 

- App-level state (useState or useReducer)

- Optional localStorage persistence for refresh survival

 

---

 

## 11. Persistence Strategy (Optional Enhancement)

 

If time allows:

 

Store:

 

- watchLists

- saved watches

 

Using:

 

- `localStorage.setItem("watch-app-state")`

 

On app load:

 

- hydrate state from localStorage

 

---

 

## 12. UI Behavior Requirements

 

**Discovery Page**

 

- Listings visible immediately on load

- Search updates results instantly

- Save action opens modal without navigation

 

**Save Modal**

 

- Must not navigate away from page

- Must close after save

- Must return user to same scroll position

 

**Lists Page**

 

- Must allow switching between lists without page reload

- Must allow removal of saved watches

 

---

 

## 13. MVP Scope Summary

 

**Included**

 

- Mock marketplace listings

- Search + filter

- Listings UI

- Save to list functionality

- Create new list flow

- My Lists page

- Local state persistence (optional)

 

**Excluded**

 

- Real marketplace APIs

- Authentication

- Backend services

- Machine learning / ranking

- Notifications

- External integrations

- Real-time updates

 

---

 

## 14. Key Engineering Tradeoffs

 

1. **Mock Data Over APIs** — Reduces complexity and ensures full control over UX demonstration.

2. **Client-Side State Only** — Avoids backend overhead and speeds up delivery.

3. **Simple Filtering Logic** — Focuses on product experience rather than algorithm design.

4. **No Recommendation Engine** — All "interestingness" is user-driven via curated lists.

 

---

 

## 15. Build Success Criteria

 

The implementation is successful if:

 

- Users can browse listings immediately

- Users can search and filter listings

- Users can save watches into lists

- Users can create new lists on the fly

- Users can revisit saved collections

- UX matches defined flow without friction

 

---

 

## 16. Future Enhancements (Post-MVP)

 

- Real marketplace API integration (eBay, Etsy, Chrono24)

- Cloud persistence (Supabase/Firebase)

- Personalization based on saved lists

- Alerts for new listings

- Advanced filtering (brand, era, movement type)

- Shareable lists

 

---