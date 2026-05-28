"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ScreenBearProps {
  src: string;
  fallback?: string;
  alt?: string;
}

/**
 * GIF gấu chính của từng màn — nảy nhẹ, có fallback emoji nếu link lỗi.
 */
export function ScreenBear({ src, fallback = "🐻", alt = "gấu cute" }: ScreenBearProps) {
  const [err, setErr] = useState(false);

  if (!src || err) {
    return (
      <motion.span
        className="block text-7xl"
        animate={{ y: [0, -10, 0], rotate: [0, -6, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        {fallback}
      </motion.span>
    );
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
      transition={{
        scale: { duration: 0.45, type: "spring", stiffness: 200, damping: 14 },
        opacity: { duration: 0.3 },
        y: { repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.5 },
      }}
      className="mx-auto h-44 w-44 rounded-3xl object-contain drop-shadow-lg sm:h-52 sm:w-52"
      draggable={false}
    />
  );
}
