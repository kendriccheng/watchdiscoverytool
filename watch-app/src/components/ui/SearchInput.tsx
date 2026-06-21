import { forwardRef } from "react";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { Input } from "./Input";

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  sm?: boolean;
  value: string;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { sm = false, value, onChange, className, ...props },
    ref
  ) {
    const showClear = value.length > 0;

    const handleClear = () => {
      onChange?.({
        target: { value: "" },
      } as ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className={cn("search-input", sm && "search-input--sm", className)}>
        <Input
          ref={ref}
          sm={sm}
          type="search"
          value={value}
          onChange={onChange}
          className="search-input__field"
          {...props}
        />
        {showClear && (
          <button
            type="button"
            className="search-input__clear"
            aria-label="Clear search"
            onClick={handleClear}
          >
            ×
          </button>
        )}
      </div>
    );
  }
);
