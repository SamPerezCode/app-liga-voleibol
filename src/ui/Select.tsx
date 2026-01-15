import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 focus:border-league-400 focus:outline-none ${className}`}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";

export default Select;
