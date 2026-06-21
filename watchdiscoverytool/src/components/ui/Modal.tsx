import { useEffect, type ReactNode } from "react";
import Button from "./Button";
import { cn } from "../../utils/cn";

type ModalProps = {
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function Modal({
  onClose,
  title,
  description,
  children,
  footer,
  className,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className={cn("modal-panel", className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header__row">
            <h3 id="modal-title">{title}</h3>
            <Button
              variant="ghost"
              icon
              sm
              aria-label="Close"
              className="modal-close"
              onClick={onClose}
            >
              ×
            </Button>
          </div>
          {description && (
            <p className="modal-description">{description}</p>
          )}
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
