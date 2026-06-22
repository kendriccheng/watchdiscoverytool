import type {
  ConditionFilter,
  DiscoveryFilters,
  DiscoveryState,
  SavedSearch,
} from "../types/savedSearch";
import { getValidPostalCode } from "./shippingEstimate";

export const DEFAULT_DISCOVERY_FILTERS: DiscoveryFilters = {
  condition: "all",
  marketplace: "all",
  sort: "none",
  maxPrice: "",
};

export const DEFAULT_DISCOVERY_STATE: DiscoveryState = {
  searchQuery: "",
  filters: DEFAULT_DISCOVERY_FILTERS,
  shippingLocation: "",
};

/** Returns a fresh default discovery state (for "Clear filters"). */
export function clearDiscoveryState(): DiscoveryState {
  return {
    searchQuery: DEFAULT_DISCOVERY_STATE.searchQuery,
    filters: { ...DEFAULT_DISCOVERY_FILTERS },
    shippingLocation: DEFAULT_DISCOVERY_STATE.shippingLocation,
  };
}

/** Maps a saved search into discovery state ready to apply to the UI. */
export function applySavedSearch(search: SavedSearch): DiscoveryState {
  const shippingLocation =
    getValidPostalCode(search.shippingLocation) ??
    search.shippingLocation.trim();

  return {
    searchQuery: search.searchQuery,
    filters: { ...search.filters },
    shippingLocation,
  };
}

function normalizeShippingLocation(location: string): string {
  return getValidPostalCode(location) ?? location.trim();
}

function discoveryStatesEqual(a: DiscoveryState, b: DiscoveryState): boolean {
  return (
    a.searchQuery === b.searchQuery &&
    normalizeShippingLocation(a.shippingLocation) ===
      normalizeShippingLocation(b.shippingLocation) &&
    a.filters.condition === b.filters.condition &&
    a.filters.marketplace === b.filters.marketplace &&
    a.filters.sort === b.filters.sort &&
    a.filters.maxPrice === b.filters.maxPrice
  );
}

/** True when current discovery state exactly matches a saved search snapshot. */
export function discoveryStateMatchesSavedSearch(
  state: DiscoveryState,
  search: SavedSearch
): boolean {
  return discoveryStatesEqual(state, applySavedSearch(search));
}

/** Whether a listing's condition passes the active condition filter. */
export function matchesConditionFilter(
  watchCondition: "working" | "untested" | "broken",
  filter: ConditionFilter
): boolean {
  switch (filter) {
    case "all":
      return true;
    case "not_broken":
      return watchCondition !== "broken";
    default:
      return watchCondition === filter;
  }
}
