import React from "react";
import { motion } from "framer-motion";
import { cn } from "lib/utils";

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: any;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ padding: "2px" }}
      >
        <div className={cn(
          "h-full w-full",
          borderClassName
        )} />
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}

