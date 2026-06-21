import type { ReactNode } from "react";
import Button, { type ButtonVariant } from "./Button";
import { cn } from "../../utils/cn";

type EmptyStateAction = {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
};

type Props = {
  icon?: "search" | "bookmark";
  title: string;
  description: ReactNode;
  actions?: EmptyStateAction[];
  className?: string;
};

export default function EmptyState({
  icon = "search",
  title,
  description,
  actions = [],
  className,
}: Props) {
  return (
    <div className={cn("empty-state surface-card", className)}>
      <div
        className={cn("empty-state__icon", `empty-state__icon--${icon}`)}
        aria-hidden="true"
      />
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {actions.length > 0 && (
        <div className="empty-state__actions">
          {actions.map((action) => (
            <Button
              key={action.label}
              type="button"
              variant={action.variant ?? "primary"}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
