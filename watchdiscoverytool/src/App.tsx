import { useState } from "react";
import ListingsGrid from "./components/listings/ListingsGrid";
import { mockListings } from "./data/mockListings";

function App() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [lists, setLists] = useState<Record<string, string[]>>({
    "My List": []
  });

  const toggleSave = (id: string) => {
    const isSaved = savedIds.includes(id);
  
    setSavedIds((prev) =>
      isSaved ? prev.filter((x) => x !== id) : [...prev, id]
    );
  
    setLists((prev) => {
      const current = prev["My List"] || [];
  
      return {
        ...prev,
        "My List": isSaved
          ? current.filter((x) => x !== id)
          : [...current, id]
      };
    });
  };

  const [view, setView] = useState<"discover" | "lists">("discover");

  const filteredListings = mockListings.filter((watch) => {
    const q = searchQuery.toLowerCase();
  
    return (
      watch.title.toLowerCase().includes(q) ||
      watch.marketplace.toLowerCase().includes(q) ||
      watch.description.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <h1 style={{ padding: 16 }}>Watch Discovery Tool</h1>
  
      {/* SEARCH */}
      <div style={{ padding: "0 16px" }}>
        <input
          type="text"
          placeholder="Search watches (Seiko, vintage, Casio...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            marginBottom: 12
          }}
        />
      </div>
  
      {/* NAV */}
      <div style={{ display: "flex", gap: 12, padding: 16 }}>
        <button onClick={() => setView("discover")}>
          Discover
        </button>
  
        <button onClick={() => setView("lists")}>
          My Lists
        </button>
      </div>
  
      {/* VIEW SWITCH */}
      {view === "discover" ? (
        <>
          {filteredListings.length === 0 ? (
            <div style={{ padding: 16, color: "#666" }}>
              <h3>No watches found</h3>
              <p>Try searching for “Seiko”, “vintage”, or “Casio”.</p>
            </div>
          ) : (
            <ListingsGrid
              watches={filteredListings}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          )}
        </>
      ) : (
        <>
          {Object.values(lists).every((arr) => arr.length === 0) ? (
            <div style={{ padding: 16, color: "#666" }}>
              <h3>No saved watches yet</h3>
              <p>Go to Discover and click “Save” on watches you like.</p>
            </div>
          ) : (
            Object.entries(lists).map(([listName, ids]) => (
              <div key={listName} style={{ marginBottom: 24 }}>
                <h3 style={{ paddingLeft: 16 }}>{listName}</h3>
  
                <ListingsGrid
                  watches={mockListings.filter((w) => ids.includes(w.id))}
                  savedIds={savedIds}
                  onToggleSave={toggleSave}
                />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default App;
