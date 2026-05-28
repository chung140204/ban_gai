"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { DateSelection } from "@/lib/types";
import { content } from "@/config/content";
import { assets } from "@/config/assets";
import { formatHour, formatVietnameseDate } from "@/lib/formatDate";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { PastelButton } from "@/components/ui/PastelButton";
import { ScreenBear } from "@/components/ui/ScreenBear";
import { celebrate, heartRain } from "@/lib/confetti";

export function SuccessScreen({
  selection,
  onRestart,
}: {
  selection: DateSelection;
  onRestart: () => void;
}) {
  useEffect(() => {
    void celebrate();
    void heartRain();
  }, []);

  return (
    <ScreenShell>
      <GlassCard>
        <motion.h2
          className="font-display text-3xl font-extrabold text-rose-500"
          initial={{ scale: 0.6 }}
          animate={{ scale: [0.6, 1.15, 1] }}
          transition={{ duration: 0.7 }}
        >
          {content.success.title}
        </motion.h2>

        {/* Gấu nhảy múa ăn mừng — nhân vật chính của màn success */}
        <div className="mt-4 flex justify-center">
          <ScreenBear src={assets.bears.success} fallback="🐻" alt="gấu ăn mừng" />
        </div>

        <p className="mx-auto mt-4 max-w-sm text-base text-rose-400/90">
          {content.success.message}
        </p>

        <div className="mt-4 rounded-3xl border border-white/60 bg-white/55 p-4 text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-400/70">
            {content.success.summaryPrefix}
          </p>
          <div className="space-y-1 text-sm font-semibold text-rose-500">
            <p>📅 {formatVietnameseDate(selection.date)}</p>
            <p>🕐 {selection.slot.emoji} {selection.slot.label} · {formatHour(selection.hour)}</p>
            {selection.location && <p>📍 {selection.location}</p>}
            {selection.food     && <p>🍽️ {selection.food}</p>}
            {selection.activity && <p>🎉 {selection.activity}</p>}
          </div>
        </div>

        {/* Hàng emoji vui bổ sung */}
        <div className="mt-4 flex justify-center gap-2">
          {content.success.fallbackEmojis.map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ y: [0, -10, 0], rotate: [0, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.12 }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <PastelButton variant="ghost" onClick={onRestart}>
            {content.success.restartLabel}
          </PastelButton>
        </div>
      </GlassCard>
    </ScreenShell>
  );
}
