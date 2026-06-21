import type { WatchListing } from "../data/mockListings";
import type {
  ConditionFilter,
  DiscoveryFilters,
  MarketplaceFilter,
  SortFilter,
} from "../types/savedSearch";
import { matchesConditionFilter } from "./discoveryState";

export type FilterAndSortOptions = {
  searchQuery?: string;
  sort?: SortFilter;
  condition?: ConditionFilter;
  marketplace?: MarketplaceFilter;
  maxPrice?: string;
};

function matchesWatchSearch(watch: WatchListing, searchQuery: string): boolean {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return true;

  return (
    watch.title.toLowerCase().includes(q) ||
    watch.marketplace.toLowerCase().includes(q) ||
    watch.description.toLowerCase().includes(q)
  );
}

function getTotalCost(watch: WatchListing): number {
  const shipping =
    watch.shipping === null || watch.shipping === undefined
      ? 0
      : watch.shipping;

  return watch.totalCost ?? watch.price + shipping;
}

function compareBySort(a: WatchListing, b: WatchListing, sort: SortFilter): number {
  switch (sort) {
    case "price_low":
      return getTotalCost(a) - getTotalCost(b);
    case "price_high":
      return getTotalCost(b) - getTotalCost(a);
    case "none":
    default:
      return 0;
  }
}

/** Filter and sort listings. Omitted filter fields use discover defaults (no narrowing). */
export function filterAndSortWatches<T extends WatchListing>(
  watches: T[],
  options: FilterAndSortOptions = {}
): T[] {
  const {
    searchQuery = "",
    sort = "none",
    condition = "all",
    marketplace = "all",
    maxPrice = "",
  } = options;

  const filtered = watches.filter((watch) => {
    if (!matchesWatchSearch(watch, searchQuery)) return false;

    if (!matchesConditionFilter(watch.condition, condition)) return false;

    if (marketplace !== "all" && watch.marketplace !== marketplace) return false;

    if (maxPrice !== "") {
      const max = Number(maxPrice);
      if (!Number.isNaN(max) && getTotalCost(watch) > max) return false;
    }

    return true;
  });

  return [...filtered].sort((a, b) => compareBySort(a, b, sort));
}

/** Discover view — search plus full discovery filters. */
export function filterAndSortDiscoveryListings<T extends WatchListing>(
  watches: T[],
  searchQuery: string,
  filters: DiscoveryFilters
): T[] {
  return filterAndSortWatches(watches, {
    searchQuery,
    sort: filters.sort,
    condition: filters.condition,
    marketplace: filters.marketplace,
    maxPrice: filters.maxPrice,
  });
}

/** My Lists per-list toolbar — search and sort only (same sort options as Discover). */
export function filterAndSortListWatches<T extends WatchListing>(
  watches: T[],
  searchQuery: string,
  sort: SortFilter
): T[] {
  return filterAndSortWatches(watches, { searchQuery, sort });
}
