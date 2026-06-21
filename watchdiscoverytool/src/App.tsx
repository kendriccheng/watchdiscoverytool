import { useState } from "react";
import ListingsGrid from "./components/listings/ListingsGrid";
import { mockListings } from "./data/mockListings";
import type { WatchListing } from "./data/mockListings";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [pendingWatch, setPendingWatch] = useState<WatchListing | null>(null);

  const [lists, setLists] = useState<Record<string, WatchListing[]>>({
    "Favorites": []
  });

  const isSaved = (watchId: string) =>
    Object.values(lists)
      .flat()
      .some((w) => w.id === watchId);

  const getWatchLists = (watchId: string) =>
    Object.keys(lists).filter((listName) =>
      lists[listName].some((w) => w.id === watchId)
    );
 
  const [view, setView] = useState<"discover" | "lists">("discover");

  const filteredListings = mockListings.filter((watch) => {
    const q = searchQuery.toLowerCase();
  
    return (
      watch.title.toLowerCase().includes(q) ||
      watch.marketplace.toLowerCase().includes(q) ||
      watch.description.toLowerCase().includes(q)
    );
  });

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
        [listName]: list.filter((w) => w.id !== watch.id)
      };
    });
  };



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
            maxWidth: "100%",
            boxSizing: "border-box",
            padding: "8px 10px",
            marginBottom: 8,
            borderRadius: 8,
            border: "1px solid #ddd"
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
              lists={lists}
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
              <div key={listName} style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 10,
                background: "#fff"
              }}
              >
                <h3 style={{ paddingLeft: 16 }}>{listName}</h3>
  
                <ListingsGrid
                  watches={lists[listName]}
                  isSaved={isSaved}
                  onSave={(watch) => setPendingWatch(watch)}
                  onRemove={(watch) => removeFromList(listName, watch)}
                  lists={lists}
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
            padding: 16,
            borderRadius: 12,
            width: "100%",
            maxWidth: 420,
            maxHeight: "80vh",
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box"
          }}>
          
          <div style={{ marginBottom: 12 }}>
              <h3 style={{ margin: 0 }}>Save to list</h3>

              <p style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
                Select a list or create a new one. You can save the same watch to multiple lists.
              </p>
          </div>

          <h4 style={{ fontSize: 13, marginTop: 16, marginBottom: 8 }}>
            Existing Lists
          </h4>

          {/* EXISTING LISTS */}
          {Object.keys(lists).map((listName) => {
            const alreadySaved = lists[listName]?.some(
              (w) => w.id === pendingWatch?.id
            );

            const isEmpty = lists[listName]?.length === 0;

            return (
              <div
                key={listName}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 10
                }}
              >
      
                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 8,
                    border: "1px solid #eee",
                    background: alreadySaved ? "#111" : "#fafafa",
                    color: alreadySaved ? "#fff" : "#111",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500
                  }}
                  onClick={() => {
                    if (!pendingWatch) return;

                    if (alreadySaved) {
                      removeFromList(listName, pendingWatch);
                    } else {
                      toggleWatchInList(listName, pendingWatch);
                    }
                  }}
                >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{listName}</span>

                  {alreadySaved && (
                    <span style={{ fontSize: 11, opacity: 0.7 }}>
                      Saved ✓
                    </span>
                  )}
                </div>
                </button>

                
                {/* ✅ DELETE BUTTON GOES HERE */}
                {isEmpty && listName !== "Favorites" && (
                  <button
                    onClick={() => deleteList(listName)}
                    style={{
                      marginTop: 6,
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "1px solid #f0f0f0",
                      background: "#fff",
                      color: "#999",
                      fontSize: 12,
                      cursor: "pointer"
                    }}
                  >
                    Delete empty list
                  </button>
                )}

              </div>

            );
          })}

          <h4 style={{ fontSize: 13, marginTop: 16, marginBottom: 8 }}>
            Create New List
          </h4>
          {/* CREATE NEW LIST */}
          <CreateListInput
            onCreate={(name) => {
              createList(name);

              // optional UX improvement:
              if (pendingWatch) {
                toggleWatchInList(name, pendingWatch);
              }
            }}
          />

          {/* CANCEL */}
          <button
            style={{ marginTop: 10 }}
            onClick={() => setPendingWatch(null)}
          >
            Close
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
      <div style={{
        marginTop: 14,
        padding: 10,
        border: "1px dashed #ddd",
        borderRadius: 10
      }}>
        <input
          placeholder="New list name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 13
          }}
        />
  
        <button
          onClick={() => {
            if (!value.trim()) return;
            onCreate(value.trim());
            setValue("");
          }}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "8px",
            borderRadius: 8,
            border: "none",
            background: "#111",
            color: "#fff",
            fontSize: 13,
            cursor: "pointer"
          }}
        >
          + Create List
        </button>
      </div>
    );
  }
}

export default App;
