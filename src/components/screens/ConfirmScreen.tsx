"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { DateSelection } from "@/lib/types";
import { content } from "@/config/content";
import { assets } from "@/config/assets";
import { formatHour, formatVietnameseDate } from "@/lib/formatDate";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { PastelButton } from "@/components/ui/PastelButton";
import { ScreenBear } from "@/components/ui/ScreenBear";

async function sendTelegramNotify(selection: DateSelection) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: formatVietnameseDate(selection.date),
        slot: `${selection.slot.emoji} ${selection.slot.label}`,
        hour: selection.hour,
        time: formatHour(selection.hour),
      }),
    });
  } catch {
    // Không crash nếu gửi thất bại
  }
}

export function ConfirmScreen({
  selection,
  onConfirm,
  onChange,
}: {
  selection: DateSelection;
  onConfirm: () => void;
  onChange: () => void;
}) {
  const { date, slot, hour } = selection;
  const [sending, setSending] = useState(false);

  const handleConfirm = useCallback(async () => {
    setSending(true);
    await sendTelegramNotify(selection);
    setSending(false);
    onConfirm();
  }, [selection, onConfirm]);

  return (
    <ScreenShell>
      <GlassCard>
        <div className="mb-2 flex justify-center">
          <ScreenBear src={assets.bears.confirm} fallback="🐻" alt="gấu confirm" />
        </div>

        <motion.div
          className="mb-1 text-3xl"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          📌
        </motion.div>

        <h2 className="font-display text-2xl font-extrabold text-rose-500">
          {content.confirm.title}
        </h2>

        <div className="mt-4 rounded-3xl border border-white/60 bg-white/55 p-5 shadow-inner">
          <p className="text-sm text-rose-400/80">{content.confirm.intro}</p>
          <p className="mt-1 font-display text-xl font-extrabold text-rose-500">
            {formatVietnameseDate(date)}
          </p>
          <p className="mt-2 text-sm text-rose-400/80">{content.confirm.atWord}</p>
          <p className="mt-1 font-display text-lg font-bold text-rose-500">
            {slot.emoji} {slot.label} · {formatHour(hour)}
          </p>
        </div>

        <p className="mt-3 text-sm text-rose-400/90">{content.confirm.closing}</p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PastelButton variant="ghost" onClick={onChange} disabled={sending}>
            {content.confirm.changeLabel}
          </PastelButton>
          <PastelButton variant="yes" onClick={handleConfirm} disabled={sending}>
            {sending ? "Đang gửi... 💌" : content.confirm.confirmLabel}
          </PastelButton>
        </div>
      </GlassCard>
    </ScreenShell>
  );
}
