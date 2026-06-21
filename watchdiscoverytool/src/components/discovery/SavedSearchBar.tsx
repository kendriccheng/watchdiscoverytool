import type { SavedSearch } from "../../types/savedSearch";

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
    <div style={{ padding: "0 16px", marginBottom: 8 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: "#666",
          marginBottom: 6,
          textAlign: "left",
        }}
      >
        Discovery lenses
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
        }}
      >
        {savedSearches.map((search) => {
          const isActive = search.id === activeSavedSearchId;
          const canDelete = !search.isPreset && onDelete;

          return (
            <div
              key={search.id}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <button
                type="button"
                onClick={() => onApply(search)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid #ddd",
                  fontSize: 12,
                  cursor: "pointer",
                  background: isActive ? "#111" : "#fff",
                  color: isActive ? "#fff" : "#111",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {search.name}
              </button>

              {canDelete && (
                <button
                  type="button"
                  aria-label={`Delete ${search.name}`}
                  onClick={() => onDelete(search.id)}
                  style={{
                    padding: "2px 6px",
                    borderRadius: 999,
                    border: "1px solid #eee",
                    fontSize: 11,
                    cursor: "pointer",
                    background: "#fff",
                    color: "#999",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        {showSaveCurrentSearch && onSaveCurrentSearch && (
          <button
            type="button"
            onClick={onSaveCurrentSearch}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px dashed #999",
              fontSize: 12,
              cursor: "pointer",
              background: "#fafafa",
              color: "#111",
            }}
          >
            + Save current search
          </button>
        )}
      </div>

      {activeSearch?.description && (
        <p
          style={{
            margin: "6px 0 0",
            fontSize: 12,
            color: "#666",
            textAlign: "left",
          }}
        >
          {activeSearch.description}
        </p>
      )}

      {isCustomSearch && !activeSearch && (
        <p
          style={{
            margin: "6px 0 0",
            fontSize: 12,
            color: "#666",
            textAlign: "left",
          }}
        >
          Custom search — adjust filters or save this lens for next time.
        </p>
      )}
    </div>
  );
}
