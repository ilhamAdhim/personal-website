import { motion } from "framer-motion";
import { cn } from "lib/utils";

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const wordsArray = words.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className={cn("font-normal", className)}>
      <motion.div
        className="text-neutral-300"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {wordsArray.map((word, idx) => (
          <motion.span
            variants={child}
            key={idx}
            className="dark:text-white text-black inline-block mr-1"
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

