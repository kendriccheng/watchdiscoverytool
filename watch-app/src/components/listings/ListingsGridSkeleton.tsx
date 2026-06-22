import WatchCardSkeleton from "./WatchCardSkeleton";

const SKELETON_CARD_COUNT = 12;

export default function ListingsGridSkeleton() {
  return (
    <div className="listings-grid" aria-busy="true" aria-label="Loading watches">
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, i) => (
        <WatchCardSkeleton key={i} />
      ))}
    </div>
  );
}
