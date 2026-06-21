import { forwardRef } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  sm?: boolean;
  inline?: boolean;
  filter?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { sm = false, inline = false, filter = false, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "input",
        sm && "input--sm",
        inline && "input--inline",
        filter && "input--filter",
        className
      )}
      {...props}
    />
  );
});

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  sm?: boolean;
  filter?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { sm = false, filter = false, className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(
        "select",
        sm && "select--sm",
        filter && "select--filter",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});
