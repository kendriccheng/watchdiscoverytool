import type { WatchListing } from "../../data/mockListings";

type Props = {
  watch: WatchListing;
  isSaved: boolean;
  onSave: () => void;
  lists: Record<string, WatchListing[]>;
};



export default function WatchCard({
  watch,
  isSaved,
  onSave,
  lists
}: Props) {
  const savedInLists = Object.keys(lists ?? {}).filter((listName) =>
    (lists?.[listName] ?? []).some((w) => w.id === watch.id)
  );

  return (
    <div style={styles.card}>
      <img src={watch.imageUrl} alt={watch.title} style={styles.image} />

      <div style={styles.content}>
        <h3 style={styles.title}>{watch.title}</h3>

        {savedInLists.length > 0 && (
        <div style={{ fontSize: 11, color: "#666" }}>
          Saved in: {savedInLists.join(", ")}
        </div>
         )}

        <p style={styles.meta}>
          {watch.marketplace.toUpperCase()} • {watch.condition}
        </p>

        <p style={styles.price}>${watch.totalCost}</p>

        <p style={styles.desc}>{watch.description}</p>

          <div style={{marginTop: "auto"}}>
            <button
                onClick={onSave}
                style={{
                  marginTop: 8,
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  fontSize: 12,
                  background: isSaved ? "#111" : "#fff",
                  color: isSaved ? "#fff" : "#111"
                }}
              >
                {isSaved ? "Saved ✓ (add to list)" : "Save"}
            </button>
          </div>
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
    gap: 12,
    background: "white",
    minHeight: 180
  },
  image: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: 8
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1
  },
  title: {
    fontSize: 14,
    margin: 0
  },
  meta: {
    fontSize: 12,
    color: "#666",
    margin: 0
  },
  price: {
    fontSize: 14,
    fontWeight: 600,
    margin: 0
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
    marginTop: 8,
    padding: "6px 10px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: 12
  }
};