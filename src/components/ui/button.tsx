import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-200/60 hover:opacity-90",
        outline:
          "border border-sky-200 bg-white text-sky-600 hover:bg-sky-50 hover:border-sky-300",
        ghost: "text-sky-500 hover:bg-sky-50",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        default: "px-7 py-3",
        sm: "px-4 py-2 text-xs",
        lg: "px-9 py-4 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
