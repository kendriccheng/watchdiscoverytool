import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return <span className={cn("section-label", className)}>{children}</span>;
}

type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export function FieldLabel({ children, className, ...props }: FieldLabelProps) {
  return (
    <label className={cn("field-label", className)} {...props}>
      {children}
    </label>
  );
}

type FieldProps = {
  children: ReactNode;
  className?: string;
};

export function Field({ children, className }: FieldProps) {
  return <div className={cn("field", className)}>{children}</div>;
}
