import { useCallback, useEffect, useMemo, useState } from "react";
import ListingsGrid from "./components/listings/ListingsGrid";
import ListSection from "./components/listings/ListSection";
import SaveToListModal from "./components/listings/SaveToListModal";
import SavedSearchBar from "./components/discovery/SavedSearchBar";
import SaveSearchModal from "./components/discovery/SaveSearchModal";
import {
  Button,
  EmptyState,
  FieldLabel,
  Input,
  Select,
  Tab,
  TabBar,
} from "./components/ui";
import { mockListings } from "./data/mockListings";
import type { WatchListing } from "./data/mockListings";
import { useSavedSearches } from "./hooks/useSavedSearches";
import type {
  ConditionFilter,
  DiscoveryFilters,
  MarketplaceFilter,
  SavedSearch,
  SortFilter,
} from "./types/savedSearch";
import {
  applySavedSearch,
  DEFAULT_DISCOVERY_FILTERS,
  discoveryStateMatchesSavedSearch,
} from "./utils/discoveryState";
import { filterAndSortDiscoveryListings } from "./utils/filterAndSortWatches";

function App() {
  const { allSavedSearches, getSearchById, saveSearch, deleteSearch } =
    useSavedSearches();

  const [searchQuery, setSearchQuery] = useState("");

  const [pendingWatch, setPendingWatch] = useState<WatchListing | null>(null);
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);

  const [lists, setLists] = useState<Record<string, WatchListing[]>>({
    "Favorites": []
  });

  const [filters, setFilters] = useState<DiscoveryFilters>({
    ...DEFAULT_DISCOVERY_FILTERS,
  });

  const [activeSavedSearchId, setActiveSavedSearchId] = useState<string | null>(
    null
  );

  const isSaved = (watchId: string) =>
    Object.values(lists)
      .flat()
      .some((w) => w.id === watchId);

  const [view, setView] = useState<"discover" | "lists">("discover");
  
  const [shippingLocation, setShippingLocation] = useState("");

  const activeSavedSearch = activeSavedSearchId
    ? getSearchById(activeSavedSearchId)
    : undefined;

  const discoveryState = {
    searchQuery,
    filters,
    shippingLocation,
  };

  useEffect(() => {
    if (!activeSavedSearchId) return;

    const activeSearch = getSearchById(activeSavedSearchId);
    if (!activeSearch) {
      setActiveSavedSearchId(null);
      return;
    }

    if (!discoveryStateMatchesSavedSearch(discoveryState, activeSearch)) {
      setActiveSavedSearchId(null);
    }
  }, [
    searchQuery,
    filters,
    shippingLocation,
    activeSavedSearchId,
    getSearchById,
  ]);

  const handleApplySavedSearch = (search: SavedSearch) => {
    const next = applySavedSearch(search);
    setSearchQuery(next.searchQuery);
    setFilters(next.filters);
    setShippingLocation(next.shippingLocation);
    setActiveSavedSearchId(search.id);
  };

  const handleClearFilters = () => {
    setFilters({ ...DEFAULT_DISCOVERY_FILTERS });
  };

  const handleResetDiscovery = () => {
    setSearchQuery("");
    setShippingLocation("");
    setFilters({ ...DEFAULT_DISCOVERY_FILTERS });
    setActiveSavedSearchId(null);
  };

  const hasActiveFilters =
    filters.condition !== DEFAULT_DISCOVERY_FILTERS.condition ||
    filters.marketplace !== DEFAULT_DISCOVERY_FILTERS.marketplace ||
    filters.sort !== DEFAULT_DISCOVERY_FILTERS.sort ||
    filters.maxPrice !== DEFAULT_DISCOVERY_FILTERS.maxPrice;

  const listsWithWatches = Object.entries(lists).filter(
    ([, watches]) => watches.length > 0
  );

  const isDefaultDiscoveryState =
    searchQuery === "" &&
    shippingLocation === "" &&
    filters.condition === DEFAULT_DISCOVERY_FILTERS.condition &&
    filters.marketplace === DEFAULT_DISCOVERY_FILTERS.marketplace &&
    filters.sort === DEFAULT_DISCOVERY_FILTERS.sort &&
    filters.maxPrice === DEFAULT_DISCOVERY_FILTERS.maxPrice;

  const matchesExistingSavedSearch = useMemo(
    () =>
      allSavedSearches.some((search) =>
        discoveryStateMatchesSavedSearch(discoveryState, search)
      ),
    [allSavedSearches, searchQuery, filters, shippingLocation]
  );

  const showSaveCurrentSearch =
    !isDefaultDiscoveryState && !matchesExistingSavedSearch;

  const isCustomSearch =
    !activeSavedSearchId && !isDefaultDiscoveryState;

  const handleSaveDiscoveryLens = (input: {
    name: string;
    description?: string;
  }) => {
    const newSearch = saveSearch({
      name: input.name,
      description: input.description,
      searchQuery,
      filters,
      shippingLocation,
    });

    setActiveSavedSearchId(newSearch.id);
    setShowSaveSearchModal(false);
  };

  const handleDeleteSavedSearch = (id: string) => {
    deleteSearch(id);

    if (activeSavedSearchId === id) {
      setActiveSavedSearchId(null);
    }
  };

  const hasPostalCode = shippingLocation?.trim().length > 0;

  const getPostalPrefix = (postal: string) =>
    postal?.replace(/\s/g, "").substring(0, 3).toUpperCase();

  const getShippingCost = (base: number, postalCode: string) => {
    const prefix = getPostalPrefix(postalCode);

    let multiplier = 1;

    if (!prefix) return Math.round(base);

    if (["M6K", "M5V", "M4B"].includes(prefix)) {
      multiplier = 1.1;
    } else if (["H2X", "V6B"].includes(prefix)) {
      multiplier = 1.3;
    }

    return Math.round(base * multiplier);
  };

  const enrichWatch = useCallback(
    (watch: WatchListing) => {
      const shippingCost = hasPostalCode
        ? getShippingCost(watch.shipping, shippingLocation)
        : null;

      return {
        ...watch,
        shipping: shippingCost,
        totalCost: watch.price + (shippingCost ?? 0),
      };
    },
    [hasPostalCode, shippingLocation]
  );

  const enrichedListings = mockListings.map(enrichWatch);

  const filteredListings = filterAndSortDiscoveryListings(
    enrichedListings,
    searchQuery,
    filters
  );

  const deleteList = (listName: string) => {
    if (listName === "Favorites") return; // protect system list
  
    setLists((prev) => {
      const newLists = { ...prev };
      delete newLists[listName];
      return newLists;
    });
  };

  const toggleWatchInList = (listName: string, watch: WatchListing) => {
    setLists((prev) => {
      const list = prev[listName] || [];
      const exists = list.some((w) => w.id === watch.id);
  
      return {
        ...prev,
        [listName]: exists
          ? list.filter((w) => w.id !== watch.id)
          : [...list, watch]
      };
    });
  };

  const createList = (name: string) => {
    setLists((prev) => {
      if (prev[name]) return prev;
  
      return {
        ...prev,
        [name]: []
      };
    });
  };

  const removeFromList = (listName: string, watch: WatchListing) => {
    setLists((prev) => {
      const list = prev[listName] || [];

      return {
        ...prev,
        [listName]: list.filter((w) => w.id !== watch.id),
      };
    });
  };

  const clearList = (listName: string) => {
    setLists((prev) => ({
      ...prev,
      [listName]: [],
    }));
  };


  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-content app-header__inner">
          <div className="app-header__top">
            <div>
              <h1>Watch Discovery Tool</h1>
              <p className="app-header__subtitle">
                Discover vintage Timex and interesting watches across eBay, Etsy,
                and more — with shipping estimates to your door.
              </p>
            </div>
            <TabBar>
              <Tab
                active={view === "discover"}
                onClick={() => setView("discover")}
              >
                Discover
              </Tab>
              <Tab
                active={view === "lists"}
                onClick={() => setView("lists")}
              >
                My Lists
              </Tab>
            </TabBar>
          </div>
        </div>
      </header>

      {view === "discover" && (
        <>
          <div className="app-content section">
            <div className="search-panel surface-card">
              <div className="search-row">
                <FieldLabel
                  htmlFor="watch-search"
                  className="search-row__label search-row__label--search"
                >
                  Search for your watch
                </FieldLabel>
                <FieldLabel
                  htmlFor="shipping-location"
                  className="search-row__label search-row__label--shipping"
                >
                  Shipping destination
                </FieldLabel>
                <Input
                  id="watch-search"
                  className="search-row__input search-row__input--search"
                  type="text"
                  placeholder="Seiko, vintage, Casio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Input
                  id="shipping-location"
                  className="search-row__input search-row__input--shipping"
                  placeholder="Postal code, e.g. M6K 1V8"
                  value={shippingLocation}
                  onChange={(e) => setShippingLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="app-content section section--tight">
            <SavedSearchBar
              savedSearches={allSavedSearches}
              activeSavedSearchId={activeSavedSearchId}
              onApply={handleApplySavedSearch}
              onSaveCurrentSearch={() => setShowSaveSearchModal(true)}
              onDelete={handleDeleteSavedSearch}
              showSaveCurrentSearch={showSaveCurrentSearch}
              isCustomSearch={isCustomSearch}
            />
          </div>

          <div className="filter-bar">
            <div className="app-content filter-bar__inner">
              <span className="filter-bar__label">Filters</span>
              <div className="filter-bar__controls">
                <Select
                  sm
                  filter
                  value={filters.condition}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      condition: e.target.value as ConditionFilter,
                    }))
                  }
                >
                  <option value="all">All Conditions</option>
                  <option value="not_broken">Not Broken</option>
                  <option value="working">Working</option>
                  <option value="untested">Untested</option>
                  <option value="broken">Broken</option>
                </Select>

                <Select
                  sm
                  filter
                  value={filters.marketplace}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      marketplace: e.target.value as MarketplaceFilter,
                    }))
                  }
                >
                  <option value="all">All Marketplaces</option>
                  <option value="ebay">eBay</option>
                  <option value="etsy">Etsy</option>
                  <option value="chrono24">Chrono24</option>
                  <option value="other">Other</option>
                </Select>

                <Select
                  sm
                  filter
                  value={filters.sort}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sort: e.target.value as SortFilter,
                    }))
                  }
                >
                  <option value="none">Sort: Default</option>
                  <option value="price_low">Price: Low → High</option>
                  <option value="price_high">Price: High → Low</option>
                </Select>

                <Input
                  sm
                  filter
                  className="input--max-price"
                  type="number"
                  min={0}
                  placeholder="Max total ($)"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
                  }
                />

                <Button
                  variant="ghost"
                  sm
                  className="btn--clear"
                  onClick={handleClearFilters}
                >
                  Clear filters
                </Button>
              </div>
            </div>
          </div>

          <div className="app-content results-meta">
            {filteredListings.length} watches found
            {activeSavedSearch && (
              <span> · Lens: {activeSavedSearch.name}</span>
            )}
          </div>
        </>
      )}

      <main
        className={`app-content main-content${view === "lists" ? " main-content--lists" : ""}`}
      >
        {view === "discover" ? (
          <>
            {filteredListings.length === 0 ? (
              <EmptyState
                icon="search"
                title="No watches found"
                description={
                  <>
                    Try searching for &ldquo;Seiko&rdquo;, &ldquo;vintage&rdquo;, or
                    &ldquo;Casio&rdquo;, or adjust your filters to see more results.
                  </>
                }
                actions={[
                  ...(!isDefaultDiscoveryState
                    ? [
                        {
                          label: "Reset search & filters",
                          onClick: handleResetDiscovery,
                        },
                      ]
                    : []),
                  ...(hasActiveFilters
                    ? [
                        {
                          label: "Clear filters",
                          onClick: handleClearFilters,
                          variant: "ghost" as const,
                        },
                      ]
                    : []),
                ]}
              />
            ) : (
              <ListingsGrid
                watches={filteredListings}
                isSaved={isSaved}
                onSave={(watch) => setPendingWatch(watch)}
                lists={lists}
              />
            )}
          </>
        ) : (
          <>
            {listsWithWatches.length === 0 ? (
              <EmptyState
                icon="bookmark"
                title="No saved watches yet"
                description="Browse Discover and save watches you want to track. You can organize them into lists like Favorites or custom collections."
                actions={[
                  {
                    label: "Go to Discover",
                    onClick: () => setView("discover"),
                  },
                ]}
              />
            ) : (
              <div className="lists-view">
                {listsWithWatches.map(([listName, listWatches]) => (
                  <ListSection
                    key={listName}
                    listName={listName}
                    watches={listWatches}
                    enrichWatch={enrichWatch}
                    isSaved={isSaved}
                    onSave={(watch) => setPendingWatch(watch)}
                    onRemove={(watch) => removeFromList(listName, watch)}
                    onClearList={() => clearList(listName)}
                    lists={lists}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

    {showSaveSearchModal && (
      <SaveSearchModal
        discoveryState={discoveryState}
        onSave={handleSaveDiscoveryLens}
        onClose={() => setShowSaveSearchModal(false)}
      />
    )}

    {pendingWatch && (
      <SaveToListModal
        watch={pendingWatch}
        lists={lists}
        onClose={() => setPendingWatch(null)}
        onToggleList={(listName) => {
          const alreadySaved = lists[listName]?.some(
            (w) => w.id === pendingWatch.id
          );
          if (alreadySaved) {
            removeFromList(listName, pendingWatch);
          } else {
            toggleWatchInList(listName, pendingWatch);
          }
        }}
        onDeleteList={deleteList}
        onCreateList={(name) => {
          createList(name);
          toggleWatchInList(name, pendingWatch);
        }}
      />
    )}

    </div>
  );
}

export default App;
