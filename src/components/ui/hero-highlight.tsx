import { cn } from "lib/utils";
import { motion } from "framer-motion";
import React from "react";

export function HeroHighlight({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[40rem] flex items-center bg-white dark:bg-black justify-center w-full group",
        containerClassName
      )}
    >
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none" />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
}

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-cyan-300 to-teal-500 dark:from-cyan-500 dark:to-teal-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
}

