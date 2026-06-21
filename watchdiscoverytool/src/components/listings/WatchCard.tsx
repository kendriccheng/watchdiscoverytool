import type { WatchListing } from "../../data/mockListings";
import { Button } from "../ui";

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
  lists,
}: Props) {
  const savedInLists = Object.keys(lists ?? {}).filter((listName) =>
    (lists?.[listName] ?? []).some((w) => w.id === watch.id)
  );

  const totalCost = watch.totalCost ?? watch.price + (watch.shipping ?? 0);

  return (
    <article className="watch-card card-interactive">
      <div className="watch-card__main">
        <img
          src={watch.imageUrl}
          alt={watch.title}
          className="watch-card__image"
        />

        <div className="watch-card__content">
          <div className="watch-card__header">
            <h3 className="watch-card__title">{watch.title}</h3>
            <p className="watch-card__meta">
              {watch.marketplace.toUpperCase()} · {watch.condition}
            </p>
          </div>

          <div className="watch-card__pricing">
            <div className="watch-card__price-row">
              <span className="watch-card__price-label">Item</span>
              <span>${watch.price}</span>
            </div>

            {watch.shipping !== null && watch.shipping !== undefined && (
              <div className="watch-card__price-row">
                <span className="watch-card__price-label">Shipping</span>
                <span>${watch.shipping}</span>
              </div>
            )}

            <div className="watch-card__total-row">
              <span>Total cost</span>
              <span>${totalCost}</span>
            </div>
          </div>

          <p className="watch-card__description">{watch.description}</p>

          {savedInLists.length > 0 && (
            <p className="watch-card__saved">
              <span className="watch-card__saved-label">Saved in:</span>{" "}
              {savedInLists.join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="watch-card__actions">
        <Button
          type="button"
          variant={isSaved ? "primary" : "default"}
          sm
          className="watch-card__save-btn"
          onClick={onSave}
        >
          {isSaved ? (
            <>
              Saved <span className="watch-card__saved-mark">✓</span>
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </article>
  );
}
