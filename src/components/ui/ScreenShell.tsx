"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const variants = {
  initial: { opacity: 0, y: 28, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -28, scale: 0.96 },
};

export function ScreenShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        // px-4 trên iPhone nhỏ, px-5 từ sm trở lên
        // py-6 trên mobile, py-10 trên tablet/desktop
        // pb-safe đảm bảo không bị home indicator che
        "relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 py-6 pb-safe pt-safe sm:px-5 sm:py-10",
        className,
      )}
    >
      {children}
    </motion.section>
  );
}
