import type { WatchListing } from "../../data/mockListings";

type Props = {
  watch: WatchListing;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
};

export default function WatchCard({
  watch,
  isSaved,
  onToggleSave
}: Props) {
  return (
    <div style={styles.card}>
      <img src={watch.imageUrl} alt={watch.title} style={styles.image} />

      <div style={styles.content}>
        <h3 style={styles.title}>{watch.title}</h3>

        <p style={styles.meta}>
          {watch.marketplace.toUpperCase()} • {watch.condition}
        </p>

        <p style={styles.price}>${watch.totalCost}</p>

        <p style={styles.desc}>{watch.description}</p>

        <button
          onClick={() => onToggleSave(watch.id)}
          style={{
            ...styles.button,
            background: isSaved ? "#222" : "#eee",
            color: isSaved ? "white" : "black"
          }}
        >
          {isSaved ? "Saved ✓" : "Save"}
        </button>
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
    background: "white"
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
    gap: 4
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
    margin: 0
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