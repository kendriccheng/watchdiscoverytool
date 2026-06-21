import type { SavedSearch } from "../../types/savedSearch";
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
          const canDelete = !search.isPreset && onDelete;

          return (
            <div key={search.id} className="saved-search-bar__pill-group">
              <Button
                type="button"
                pill
                sm
                active={isActive}
                className="saved-search-bar__lens-btn"
                onClick={() => onApply(search)}
              >
                <span className="saved-search-bar__lens-name">{search.name}</span>
                {search.isPreset && (
                  <span className="lens-badge">Preset</span>
                )}
              </Button>

              {canDelete && (
                <Button
                  type="button"
                  variant="ghost"
                  className="btn--delete-lens"
                  aria-label={`Delete ${search.name}`}
                  onClick={() => onDelete(search.id)}
                >
                  ×
                </Button>
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
