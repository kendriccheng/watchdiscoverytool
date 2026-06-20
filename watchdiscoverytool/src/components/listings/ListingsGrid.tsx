import type { WatchListing } from "../../data/mockListings";
import WatchCard from "./WatchCard";

type Props = {
  watches: WatchListing[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
};

export default function ListingsGrid({
  watches,
  savedIds,
  onToggleSave
}: Props) {
  return (
    <div style={styles.grid}>
      {watches.map((watch) => (
        <WatchCard
          key={watch.id}
          watch={watch}
          isSaved={savedIds.includes(watch.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 12,
    padding: 16
  }
};




