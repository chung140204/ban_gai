"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DateSelection, TimeSlot } from "@/lib/types";
import { content } from "@/config/content";
import { assets } from "@/config/assets";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScreenBear } from "@/components/ui/ScreenBear";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { PastelButton } from "@/components/ui/PastelButton";
import { PastelCalendar } from "@/components/ui/PastelCalendar";
import { TimeSlotPicker } from "@/components/ui/TimeSlotPicker";

export function DateTimeScreen({
  onPick,
}: {
  onPick: (selection: DateSelection) => void;
}) {
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<TimeSlot | null>(null);
  const [hour, setHour] = useState<number | null>(null);

  // Khi đổi khung giờ, reset giờ đã chọn
  const handleSelectSlot = (s: TimeSlot) => {
    setSlot(s);
    setHour(null);
  };

  const ready = date !== null && slot !== null && hour !== null;

  const hint =
    !date
      ? content.datetime.pickDatePrompt
      : !slot
        ? "Chọn khung giờ bên trên nha 👆"
        : "Chọn giờ cụ thể bên trên nha ⏰";

  return (
    <ScreenShell className="justify-start">
      <GlassCard className="max-w-lg">
        <div className="mb-3 flex justify-center">
          <ScreenBear src={assets.bears.datetime} fallback="🐻" alt="gấu vui" />
        </div>

        <h2 className="font-display text-2xl font-extrabold leading-snug text-rose-500">
          {content.datetime.title}
        </h2>
        <p className="mt-2 text-sm text-rose-400/80">
          {content.datetime.subtitle}
        </p>

        <div className="mt-5 text-left">
          <PastelCalendar selected={date} onSelect={setDate} />
          <p className="mt-2 text-center text-xs font-medium text-rose-400/70">
            {content.datetime.weekendHint}
          </p>
        </div>

        <div className="mt-6 text-left">
          <h3 className="mb-3 text-center font-display text-lg font-bold text-rose-500">
            {content.datetime.timeTitle}
          </h3>
          <TimeSlotPicker
            slots={content.datetime.timeSlots}
            selectedSlotId={slot?.id ?? null}
            selectedHour={hour}
            onSelectSlot={handleSelectSlot}
            onSelectHour={setHour}
          />
        </div>

        <div className="mt-7 flex min-h-[60px] items-center justify-center">
          <AnimatePresence mode="wait">
            {ready ? (
              <motion.div
                key="continue"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <PastelButton
                  variant="primary"
                  onClick={() => onPick({ date: date!, slot: slot!, hour: hour! })}
                >
                  {content.datetime.continueLabel}
                </PastelButton>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-rose-400/70"
              >
                {hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </ScreenShell>
  );
}
