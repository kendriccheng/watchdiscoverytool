import { useMemo, useState } from "react";
import type { WatchListing } from "../../data/mockListings";
import type { SortFilter } from "../../types/savedSearch";
import { filterAndSortListWatches } from "../../utils/filterAndSortWatches";
import { Button, Input, Select } from "../ui";
import ListingsGrid from "./ListingsGrid";

type Props = {
  listName: string;
  watches: WatchListing[];
  enrichWatch: (watch: WatchListing) => WatchListing;
  isSaved: (id: string) => boolean;
  onSave: (watch: WatchListing) => void;
  onRemove: (watch: WatchListing) => void;
  onClearList: () => void;
  lists: Record<string, WatchListing[]>;
};

export default function ListSection({
  listName,
  watches,
  enrichWatch,
  isSaved,
  onSave,
  onRemove,
  onClearList,
  lists,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<SortFilter>("none");

  const enrichedWatches = useMemo(
    () => watches.map(enrichWatch),
    [watches, enrichWatch]
  );

  const visibleWatches = useMemo(
    () => filterAndSortListWatches(enrichedWatches, searchQuery, sort),
    [enrichedWatches, searchQuery, sort]
  );

  const isFiltering = searchQuery.trim().length > 0 || sort !== "none";
  const countLabel =
    isFiltering && visibleWatches.length !== watches.length
      ? `${visibleWatches.length} of ${watches.length} watches`
      : `${watches.length} ${watches.length === 1 ? "watch" : "watches"}`;

  const searchFieldId = `list-search-${listName.replace(/\s+/g, "-").toLowerCase()}`;
  const sortFieldId = `list-sort-${listName.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section className="list-section surface-card">
      <div className="list-section__header">
        <div className="list-section__header-main">
          <h3>{listName}</h3>
          <span className="list-section__count">{countLabel}</span>
        </div>
        <Button
          type="button"
          variant="secondary"
          sm
          className="list-section__clear"
          onClick={onClearList}
        >
          Remove all
        </Button>
      </div>

      <div className="list-section__toolbar">
        <Input
          id={searchFieldId}
          sm
          className="list-section__search"
          type="search"
          placeholder="Search this list..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          id={sortFieldId}
          sm
          className="list-section__sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortFilter)}
          aria-label={`Sort ${listName}`}
        >
          <option value="none">Sort: Default</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
        </Select>
      </div>

      {visibleWatches.length === 0 ? (
        <p className="list-section__empty">
          No watches match your search in this list.
        </p>
      ) : (
        <ListingsGrid
          watches={visibleWatches}
          isSaved={isSaved}
          onSave={onSave}
          onRemove={onRemove}
          lists={lists}
        />
      )}
    </section>
  );
}
