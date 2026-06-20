import { useState } from "react";
import ListingsGrid from "./components/listings/ListingsGrid";
import { mockListings } from "./data/mockListings";

function App() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

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

  return (
    <div>
      <div style={{ display: "flex", gap: 12, padding: 16 }}>
        <button onClick={() => setView("discover")}>
          Discover
        </button>
  
        <button onClick={() => setView("lists")}>
          My Lists
        </button>
      </div>
  
      <h1 style={{ padding: 16 }}>Watch Discovery Tool</h1>
  
      {view === "discover" ? (
        <ListingsGrid
          watches={mockListings}
          savedIds={savedIds}
          onToggleSave={toggleSave}
        />
      ) : (
        <div style={{ padding: 16 }}>
          <h2>My Lists</h2>
  
          {Object.entries(lists).map(([listName, ids]) => (
            <div key={listName} style={{ marginBottom: 24 }}>
              <h3>{listName}</h3>
  
              <ListingsGrid
                watches={mockListings.filter((w) =>
                  ids.includes(w.id)
                )}
                savedIds={savedIds}
                onToggleSave={toggleSave}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;