import { useState } from "react";
import ListingsGrid from "./components/listings/ListingsGrid";
import { mockListings } from "./data/mockListings";
import type { WatchListing } from "./data/mockListings";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [pendingWatch, setPendingWatch] = useState<WatchListing | null>(null);

  const [lists, setLists] = useState<Record<string, WatchListing[]>>({
    "My List": []
  });

  const saveToList = (listName: string, watch: WatchListing) => {
    setLists((prev) => {
      const existing = prev[listName] || [];
  
      const exists = existing.find((w) => w.id === watch.id);
  
      return {
        ...prev,
        [listName]: exists
          ? existing.filter((w) => w.id !== watch.id)
          : [...existing, watch]
      };
    });
  
    setPendingWatch(null);
  };

  const isSaved = (id: string) =>
    lists["My List"]?.some((w) => w.id === id) ?? false;

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
            isSaved={isSaved}
            onSave={(watch) => setPendingWatch(watch)}
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
                  watches={lists["My List"]}
                  isSaved={isSaved}
                  onSave={(watch) => setPendingWatch(watch)}
                />
              </div>
            ))
          )}
        </>
      )}

    {pendingWatch && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          background: "white",
          padding: 20,
          borderRadius: 10,
          width: 320
        }}>
          
          <h3>Save Watch</h3>
          <p style={{ fontSize: 12, color: "#666" }}>
            Choose a list or create a new one
          </p>

          {/* EXISTING LISTS */}
          {Object.keys(lists).map((listName) => (
            <button
              key={listName}
              style={{
                display: "block",
                width: "100%",
                marginBottom: 8
              }}
              onClick={() => saveToList(listName, pendingWatch)}
            >
              {listName}
            </button>
          ))}

          {/* CREATE NEW LIST */}
          <CreateListInput
            onCreate={(name) => saveToList(name, pendingWatch)}
          />

          {/* CANCEL */}
          <button
            style={{ marginTop: 10 }}
            onClick={() => setPendingWatch(null)}
          >
            Cancel
          </button>

        </div>
      </div>
    )}

    </div>
  );


  function CreateListInput({
    onCreate
  }: {
    onCreate: (name: string) => void;
  }) {
    const [value, setValue] = useState("");
  
    return (
      <div style={{ marginTop: 10 }}>
        <input
          placeholder="New list name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 8
          }}
        />
  
        <button
          onClick={() => {
            if (!value.trim()) return;
            onCreate(value.trim());
            setValue("");
          }}
          style={{ width: "100%" }}
        >
          + Create List
        </button>
      </div>
    );
  }
}

export default App;
