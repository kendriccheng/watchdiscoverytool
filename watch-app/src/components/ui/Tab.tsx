import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type TabBarProps = {
  children: ReactNode;
  className?: string;
};

export function TabBar({ children, className }: TabBarProps) {
  return <div className={cn("tab-bar", className)}>{children}</div>;
}

type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  children: ReactNode;
};

export function Tab({
  active = false,
  className,
  type = "button",
  children,
  ...props
}: TabProps) {
  return (
    <button
      type={type}
      className={cn("tab", active && "tab--active", className)}
      {...props}
    >
      {children}
    </button>
  );
}
