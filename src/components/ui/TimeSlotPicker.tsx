"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { TimeSlot } from "@/lib/types";
import { content } from "@/config/content";
import { cn } from "@/lib/cn";

interface TimeSlotPickerProps {
  slots: readonly TimeSlot[];
  selectedSlotId: string | null;
  selectedHour: number | null;
  onSelectSlot: (slot: TimeSlot) => void;
  onSelectHour: (hour: number) => void;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function TimeSlotPicker({
  slots,
  selectedSlotId,
  selectedHour,
  onSelectSlot,
  onSelectHour,
}: TimeSlotPickerProps) {
  const activeSlot = slots.find((s) => s.id === selectedSlotId) ?? null;

  return (
    <div className="space-y-4">
      {/* Chọn khung */}
      <div className="grid grid-cols-2 gap-3">
        {slots.map((slot) => {
          const active = selectedSlotId === slot.id;
          return (
            <motion.button
              key={slot.id}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectSlot(slot)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-2xl border p-3 transition-colors",
                active
                  ? "border-transparent bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-md shadow-pink-400/50"
                  : "border-white/70 bg-white/60 text-rose-400 hover:bg-pink-50",
              )}
            >
              <span className="text-2xl">{slot.emoji}</span>
              <span className="text-sm font-bold">{slot.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Chọn giờ cụ thể — xuất hiện khi đã chọn khung */}
      <AnimatePresence mode="wait">
        {activeSlot && (
          <motion.div
            key={activeSlot.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="mb-2 text-center text-sm font-semibold text-rose-400/80">
              {content.datetime.hourLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {activeSlot.hours.map((h) => {
                const active = selectedHour === h;
                return (
                  <motion.button
                    key={h}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onSelectHour(h)}
                    className={cn(
                      "min-w-[62px] rounded-full border px-3 py-2 text-sm font-bold transition-colors",
                      active
                        ? "border-transparent bg-gradient-to-br from-rose-400 to-fuchsia-500 text-white shadow-md shadow-pink-400/50"
                        : "border-white/70 bg-white/70 text-rose-400 hover:bg-pink-50",
                    )}
                  >
                    {pad(h)}:00
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
