import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant = "default" | "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  pill?: boolean;
  active?: boolean;
  dashed?: boolean;
  block?: boolean;
  sm?: boolean;
  icon?: boolean;
  children: ReactNode;
};

export default function Button({
  variant = "default",
  pill = false,
  active = false,
  dashed = false,
  block = false,
  sm = false,
  icon = false,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "btn",
        variant === "primary" && "btn--primary",
        variant === "secondary" && "btn--secondary",
        variant === "ghost" && "btn--ghost",
        pill && "btn--pill",
        pill && active && "btn--pill-active",
        dashed && "btn--dashed",
        block && "btn--block",
        sm && "btn--sm",
        icon && "btn--icon",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
