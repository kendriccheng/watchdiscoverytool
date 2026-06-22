import type { WatchListing } from "../../data/mockListings";
import WatchCard from "./WatchCard";

type Props = {
  watches: WatchListing[];
  isSaved: (id: string) => boolean;
  onSave: (watch: WatchListing) => void;
  lists: Record<string, WatchListing[]>;
  onRemove?: (watch: WatchListing) => void;
  className?: string;
};

export default function ListingsGrid({
  watches,
  isSaved,
  onSave,
  lists,
  className,
}: Props) {
  return (
    <div
      className={className ? `listings-grid ${className}` : "listings-grid"}
    >
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
