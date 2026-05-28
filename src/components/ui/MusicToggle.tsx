"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

export function MusicToggle({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const label = isPlaying ? content.music.onLabel : content.music.offLabel;
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.08 }}
      aria-label={label}
      title={label}
      style={{
        top: "max(1rem, env(safe-area-inset-top))",
        right: "max(1rem, env(safe-area-inset-right))",
      }}
      className="fixed z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/55 text-xl shadow-md shadow-pink-200/50 backdrop-blur-md"
    >
      <motion.span
        animate={isPlaying ? { rotate: [0, 14, -14, 0] } : { rotate: 0 }}
        transition={{ repeat: isPlaying ? Infinity : 0, duration: 1.8 }}
      >
        {isPlaying ? "🔊" : "🔈"}
      </motion.span>
    </motion.button>
  );
}
