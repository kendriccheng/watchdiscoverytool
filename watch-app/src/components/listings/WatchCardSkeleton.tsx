export default function WatchCardSkeleton() {
  return (
    <article className="watch-card watch-card--skeleton" aria-hidden="true">
      <div className="watch-card__main">
        <div className="watch-card__image skeleton" />

        <div className="watch-card__content">
          <div className="watch-card__header">
            <div className="skeleton watch-card__skeleton-title" />
            <div className="skeleton watch-card__skeleton-meta" />
          </div>

          <div className="watch-card__pricing">
            <div className="watch-card__price-row">
              <div className="skeleton watch-card__skeleton-line" />
            </div>
            <div className="watch-card__price-row">
              <div className="skeleton watch-card__skeleton-line" />
            </div>
            <div className="watch-card__total-row">
              <div className="skeleton watch-card__skeleton-total" />
            </div>
          </div>

          <div className="skeleton watch-card__skeleton-description" />
        </div>
      </div>

      <div className="watch-card__actions">
        <div className="skeleton watch-card__skeleton-button" />
      </div>
    </article>
  );
}
