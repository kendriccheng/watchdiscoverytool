import type { WatchListing } from "../../data/mockListings";

type Props = {
  watch: WatchListing;
  isSaved: boolean;
  onSave: () => void;
  lists: Record<string, WatchListing[]>;
  onRemove?: () => void;
};



export default function WatchCard({
  watch,
  isSaved,
  onSave,
  onRemove,
  lists
}: Props) {
  const savedInLists = Object.keys(lists ?? {}).filter((listName) =>
    (lists?.[listName] ?? []).some((w) => w.id === watch.id)
  );

  return (
    <div style={styles.card}>
      <div style={styles.mainRow}>
        <img src={watch.imageUrl} alt={watch.title} style={styles.image} className="h-24 w-full object-contain"/>

        <div style={styles.content}>

          {/* HEADER */}
          <div>
            <h3 style={styles.title}>{watch.title}</h3>

            <p style={styles.meta}>
              {watch.marketplace.toUpperCase()} • {watch.condition}
            </p>
          </div>

          {/* PRICE (HIERARCHY EMPHASIS) */}
          <div style={styles.priceRow}>
            <div style={styles.priceBlock}>
    
              <div style={styles.priceRowSmall}>
                <span style={styles.label}>Item</span>
                <span>${watch.price}</span>
              </div>

              {watch.shipping !== null && watch.shipping !== undefined && (
                <div style={styles.priceRowSmall}>
                  <span style={styles.label}>Shipping</span>
                  <span>${watch.shipping}</span>
                </div>
              )}

              <div style={styles.totalRow}>
                <span>Total Cost</span>
                <span>${watch.price + watch.shipping}</span>
              </div>

            </div>
          </div>

          {/* DESCRIPTION */}
          <p style={styles.desc}>{watch.description}</p>

          {/* SAVED INFO */}
          {savedInLists.length > 0 && (
            <div style={styles.savedInfo}>
              Saved in: {savedInLists.join(", ")}
            </div>
          )}

        </div>
      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>
        <button
          onClick={onSave}
          style={{
            ...styles.button,
            background: isSaved ? "#111" : "#fff",
            color: isSaved ? "#fff" : "#111",
            border: "1px solid #ddd"
          }}
        >
          {isSaved ? "Saved ✓" : "Save"}
        </button>

        {/*{isSaved && (
          <button
            onClick={onRemove}
            style={styles.removeButton}
          >
            Remove
          </button>
        )*/}
      </div>

    </div>
  );
}


const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #eee",
    borderRadius: 10,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    background: "white",
    minHeight: 180
  },
  mainRow: {
    display: "flex",
    gap: 12,
    alignItems: "stretch",
    flex: 1
  },
  image: {
    width: 80,
    height: 80,
    objectFit: "contain",
    borderRadius: 8
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    textAlign: "left",
    width: "100%"
  },
  title: {
    fontSize: 14,
    margin: 0,
    color: "black"
  },
  meta: {
    fontSize: 12,
    color: "#666",
    margin: 0
  },
  price: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.2
  },
  desc: {
    fontSize: 12,
    color: "#888",
    margin: 0,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical"
  },
  button: {
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 12,
    minWidth: 90,
    textAlign: "center"
  },

  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },

  priceRowSmall: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: "#666",
    lineHeight: 1.2
  },
  
  priceBlock: {
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2
  },

  label: {
    color: "#888"
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    color: "black",
    fontWeight: 700,
    marginTop: 2,
    paddingTop: 4,
    borderTop: "1px solid #eee"
  },
  
  savedInfo: {
    fontSize: 11,
    color: "#666",
    marginTop: 6
  },
  
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%"
  },
  
removeButton: {
  padding: "6px 12px",
  borderRadius: 8,
  fontSize: 12,
  cursor: "pointer",
  border: "1px solid #eee",
  background: "#fff",
  color: "#666",
  minWidth: 90,
  textAlign: "center"
}
};