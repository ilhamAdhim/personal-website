import * as React from "react";

import { cn } from "lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => (
        <input
            type={type}
            ref={ref}
            className={cn(
                "w-full rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-700",
                "placeholder:text-slate-300",
                "focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "transition",
                className
            )}
            {...props}
        />
    )
);
Input.displayName = "Input";

export { Input };
