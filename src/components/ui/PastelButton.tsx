"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "yes" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg shadow-pink-400/40",
  yes: "bg-gradient-to-br from-pink-400 via-rose-400 to-fuchsia-500 text-white shadow-xl shadow-pink-500/50",
  ghost:
    "bg-white/70 text-rose-500 border border-white/80 shadow-md shadow-pink-200/50",
};

interface PastelButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
}

export function PastelButton({
  variant = "primary",
  className,
  children,
  ...props
}: PastelButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className={cn(
        "inline-flex min-h-[52px] select-none items-center justify-center gap-2 rounded-full px-7 py-3 text-lg font-bold tracking-wide transition-colors",
        styles[variant],
        props.disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
