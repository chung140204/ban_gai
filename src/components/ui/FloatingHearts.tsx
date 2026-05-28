"use client";

import { useMemo } from "react";

const EMOJIS = ["❤️", "🩷", "💕", "💖", "🌸", "✨"];

/** PRNG có hạt giống cố định để server & client render giống nhau (tránh hydration mismatch). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function FloatingHearts({ count = 16 }: { count?: number }) {
  const hearts = useMemo(() => {
    const rand = mulberry32(0x9e3779b9 ^ count);
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      size: 14 + rand() * 30,
      duration: 6 + rand() * 7,
      delay: -(rand() * 9),
      opacity: 0.45 + rand() * 0.45,
      spin: rand() * 80 - 40,
      emoji: EMOJIS[Math.floor(rand() * EMOJIS.length)],
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {hearts.map((h, i) => (
        <span
          key={i}
          className="animate-float-slow absolute bottom-[-12vh] will-change-transform"
          style={
            {
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              "--heart-opacity": h.opacity,
              "--heart-spin": `${h.spin}deg`,
            } as React.CSSProperties
          }
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
