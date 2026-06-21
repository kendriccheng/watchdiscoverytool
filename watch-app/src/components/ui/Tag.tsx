import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type TagProps = {
  children: ReactNode;
  accent?: boolean;
  className?: string;
};

export default function Tag({ children, accent = false, className }: TagProps) {
  return (
    <span className={cn("tag", accent && "tag--accent", className)}>
      {children}
    </span>
  );
}
