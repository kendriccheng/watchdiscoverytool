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

  const hasShippingEstimate =
    watch.shipping !== null && watch.shipping !== undefined;
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
              Sold by:{" "}
              <span className="watch-card__marketplace">
                {watch.marketplace.toUpperCase()}
              </span>
              {" · "}
              <span className="watch-card__condition">{watch.condition}</span>
            </p>
          </div>

          <div className="watch-card__pricing">
            <div className="watch-card__price-row">
              <span className="watch-card__price-label">Item</span>
              <span className="watch-card__price-value">${watch.price}</span>
            </div>

            <div className="watch-card__price-row">
              <span className="watch-card__price-label">
                {hasShippingEstimate ? "Shipping (est.)" : "Shipping"}
              </span>
              {hasShippingEstimate ? (
                <span className="watch-card__price-value">${watch.shipping}</span>
              ) : (
                <span className="watch-card__price-value watch-card__shipping-hint">
                  Add postal code
                </span>
              )}
            </div>

            <div className="watch-card__total-row">
              <span>
                {hasShippingEstimate ? "Total (est.)" : "Total (item only)"}
              </span>
              <span className="watch-card__price-value">${totalCost}</span>
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
