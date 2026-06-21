import type { SavedSearch } from "../types/savedSearch";
import { presetSavedSearches } from "../data/presetSavedSearches";

export const SAVED_SEARCHES_STORAGE_KEY = "watch-discovery:saved-searches:v1";

type SavedSearchStore = {
  version: 1;
  userSearches: SavedSearch[];
};

const PRESET_IDS = new Set(presetSavedSearches.map((search) => search.id));

export function isPresetSavedSearchId(id: string): boolean {
  return PRESET_IDS.has(id);
}

function isSavedSearch(value: unknown): value is SavedSearch {
  if (!value || typeof value !== "object") return false;

  const search = value as SavedSearch;

  return (
    typeof search.id === "string" &&
    typeof search.name === "string" &&
    typeof search.searchQuery === "string" &&
    typeof search.shippingLocation === "string" &&
    typeof search.createdAt === "string" &&
    search.filters !== null &&
    typeof search.filters === "object" &&
    typeof search.filters.condition === "string" &&
    typeof search.filters.marketplace === "string" &&
    typeof search.filters.sort === "string" &&
    typeof search.filters.maxPrice === "string"
  );
}

/** Reads user-created saved searches from localStorage. Presets are never stored here. */
export function loadUserSavedSearches(): SavedSearch[] {
  try {
    const raw = localStorage.getItem(SAVED_SEARCHES_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as SavedSearchStore;

    if (parsed.version !== 1 || !Array.isArray(parsed.userSearches)) {
      return [];
    }

    return parsed.userSearches.filter(
      (search) => isSavedSearch(search) && !isPresetSavedSearchId(search.id)
    );
  } catch {
    return [];
  }
}

/** Persists user-created saved searches to localStorage. */
export function persistUserSavedSearches(userSearches: SavedSearch[]): void {
  const store: SavedSearchStore = {
    version: 1,
    userSearches: userSearches.filter(
      (search) => !search.isPreset && !isPresetSavedSearchId(search.id)
    ),
  };

  localStorage.setItem(SAVED_SEARCHES_STORAGE_KEY, JSON.stringify(store));
}

export function mergeSavedSearches(
  userSearches: SavedSearch[]
): SavedSearch[] {
  return [...presetSavedSearches, ...userSearches];
}

export function createUserSavedSearch(input: {
  name: string;
  description?: string;
  searchQuery: string;
  filters: SavedSearch["filters"];
  shippingLocation: string;
}): SavedSearch {
  return {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    description: input.description?.trim() || undefined,
    searchQuery: input.searchQuery,
    filters: { ...input.filters },
    shippingLocation: input.shippingLocation,
    createdAt: new Date().toISOString(),
    isPreset: false,
  };
}
