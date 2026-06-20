import type { WatchListing } from "../../data/mockListings";
import WatchCard from "./WatchCard";


type Props = {
  watches: WatchListing[];
  isSaved: (id: string) => boolean;
  onSave: (watch: WatchListing) => void;
  lists: Record<string, WatchListing[]>;
};

export default function ListingsGrid({
  watches,
  isSaved,
  onSave,
  lists
}: Props) {
  return (
    <div style={styles.grid}>
      {watches.map((watch) => (
        <WatchCard
        key={watch.id}
        watch={watch}
        isSaved={isSaved(watch.id)}
        onSave={() => onSave(watch)}
        lists={lists}
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