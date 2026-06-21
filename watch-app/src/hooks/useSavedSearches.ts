import { useCallback, useMemo, useState } from "react";
import type { SavedSearch } from "../types/savedSearch";
import {
  createUserSavedSearch,
  isPresetSavedSearchId,
  loadUserSavedSearches,
  mergeSavedSearches,
  persistUserSavedSearches,
} from "../utils/savedSearchStorage";

type SaveSearchInput = {
  name: string;
  description?: string;
  searchQuery: string;
  filters: SavedSearch["filters"];
  shippingLocation: string;
};

export function useSavedSearches() {
  const [userSavedSearches, setUserSavedSearches] = useState<SavedSearch[]>(
    () => loadUserSavedSearches()
  );
  const [dismissedPresetIds, setDismissedPresetIds] = useState<string[]>([]);

  const allSavedSearches = useMemo(
    () =>
      mergeSavedSearches(userSavedSearches).filter(
        (search) =>
          !search.isPreset || !dismissedPresetIds.includes(search.id)
      ),
    [userSavedSearches, dismissedPresetIds]
  );

  const saveSearch = useCallback((input: SaveSearchInput) => {
    const newSearch = createUserSavedSearch(input);

    setUserSavedSearches((prev) => {
      const next = [...prev, newSearch];
      persistUserSavedSearches(next);
      return next;
    });

    return newSearch;
  }, []);

  const deleteSearch = useCallback((id: string) => {
    if (isPresetSavedSearchId(id)) {
      setDismissedPresetIds((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      );
      return true;
    }

    setUserSavedSearches((prev) => {
      const next = prev.filter((search) => search.id !== id);
      persistUserSavedSearches(next);
      return next;
    });

    return true;
  }, []);

  const getSearchById = useCallback(
    (id: string) => allSavedSearches.find((search) => search.id === id),
    [allSavedSearches]
  );

  return {
    userSavedSearches,
    allSavedSearches,
    saveSearch,
    deleteSearch,
    getSearchById,
  };
}

export type { SaveSearchInput };
