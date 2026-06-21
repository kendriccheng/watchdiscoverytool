export type ConditionFilter =
  | "all"
  | "working"
  | "untested"
  | "broken"
  | "not_broken";

export type MarketplaceFilter =
  | "all"
  | "ebay"
  | "etsy"
  | "chrono24"
  | "other";

export type SortFilter = "none" | "price_low" | "price_high";

export type DiscoveryFilters = {
  condition: ConditionFilter;
  marketplace: MarketplaceFilter;
  sort: SortFilter;
  maxPrice: string;
};

/** Current discovery inputs that drive the listings grid. */
export type DiscoveryState = {
  searchQuery: string;
  filters: DiscoveryFilters;
  shippingLocation: string;
};

/** A named, persistable snapshot of discovery state. */
export type SavedSearch = {
  id: string;
  name: string;
  description?: string;
  searchQuery: string;
  filters: DiscoveryFilters;
  shippingLocation: string;
  createdAt: string;
  isPreset?: boolean;
};
