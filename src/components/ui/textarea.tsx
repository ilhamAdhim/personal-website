import * as React from "react";

import { cn } from "lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-700",
      "placeholder:text-slate-300",
      "resize-none",
      "focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export default Textarea;
