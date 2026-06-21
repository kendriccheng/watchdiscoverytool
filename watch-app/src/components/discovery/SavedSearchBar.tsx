import type { SavedSearch } from "../../types/savedSearch";
import { cn } from "../../utils/cn";
import { Button, SectionLabel } from "../ui";

type Props = {
  savedSearches: SavedSearch[];
  activeSavedSearchId: string | null;
  onApply: (search: SavedSearch) => void;
  onSaveCurrentSearch?: () => void;
  onDelete?: (id: string) => void;
  showSaveCurrentSearch?: boolean;
  isCustomSearch?: boolean;
};

export default function SavedSearchBar({
  savedSearches,
  activeSavedSearchId,
  onApply,
  onSaveCurrentSearch,
  onDelete,
  showSaveCurrentSearch = false,
  isCustomSearch = false,
}: Props) {
  const activeSearch = savedSearches.find(
    (search) => search.id === activeSavedSearchId
  );

  return (
    <div className="saved-search-bar">
      <SectionLabel>Discovery lenses</SectionLabel>

      <div className="saved-search-bar__pills">
        {savedSearches.map((search) => {
          const isActive = search.id === activeSavedSearchId;

          return (
            <div
              key={search.id}
              className={cn("lens-pill", isActive && "lens-pill--active")}
            >
              <button
                type="button"
                className="lens-pill__apply"
                onClick={() => onApply(search)}
              >
                {search.name}
              </button>

              {onDelete && (
                <button
                  type="button"
                  className="lens-pill__dismiss"
                  aria-label={`Remove ${search.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(search.id);
                  }}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        {showSaveCurrentSearch && onSaveCurrentSearch && (
          <Button
            type="button"
            pill
            sm
            dashed
            className="saved-search-bar__save-btn"
            onClick={onSaveCurrentSearch}
          >
            + Save current search
          </Button>
        )}
      </div>

      {activeSearch?.description && (
        <p className="saved-search-bar__hint saved-search-bar__hint--active">
          {activeSearch.description}
        </p>
      )}

      {isCustomSearch && !activeSearch && (
        <p className="saved-search-bar__hint">
          Custom search — adjust filters or save this lens for next time.
        </p>
      )}
    </div>
  );
}
