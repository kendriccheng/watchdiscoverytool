import type { SavedSearch } from "../types/savedSearch";

export const presetSavedSearches: SavedSearch[] = [
  {
    id: "preset-vintage-timex-collector",
    name: "Vintage Timex Collector",
    description:
      "Timex under $50 all-in to M6K1V8 — working or untested, sorted lowest total first.",
    searchQuery: "Timex",
    filters: {
      condition: "not_broken",
      marketplace: "all",
      sort: "price_low",
      maxPrice: "50",
    },
    shippingLocation: "M6K1V8",
    createdAt: "2026-01-01T00:00:00.000Z",
    isPreset: true,
  },
  {
    id: "preset-budget-vintage",
    name: "Budget Vintage",
    description:
      "Any brand vintage pieces under $50 — excludes explicitly broken listings.",
    searchQuery: "vintage",
    filters: {
      condition: "not_broken",
      marketplace: "all",
      sort: "price_low",
      maxPrice: "50",
    },
    shippingLocation: "",
    createdAt: "2026-01-01T00:00:00.000Z",
    isPreset: true,
  },
  {
    id: "preset-etsy-finds",
    name: "Etsy Finds",
    description: "Browse Etsy listings with no price cap — good for deadstock and collabs.",
    searchQuery: "",
    filters: {
      condition: "all",
      marketplace: "etsy",
      sort: "none",
      maxPrice: "",
    },
    shippingLocation: "",
    createdAt: "2026-01-01T00:00:00.000Z",
    isPreset: true,
  },
];
