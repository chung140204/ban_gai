"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isWeekend,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const WEEK_OPTS = { weekStartsOn: 1 as const };

export function PastelCalendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (day: Date) => void;
}) {
  const today = startOfDay(new Date());
  const [month, setMonth] = useState(() => startOfMonth(today));

  const gridStart = startOfWeek(startOfMonth(month), WEEK_OPTS);
  const gridEnd = endOfWeek(endOfMonth(month), WEEK_OPTS);
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const canGoPrev = isBefore(startOfMonth(today), month);

  const monthLabel = format(month, "MMMM yyyy", { locale: vi });

  return (
    <div className="rounded-3xl border border-white/60 bg-white/50 p-4 shadow-lg shadow-pink-200/40 backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Tháng trước"
          disabled={!canGoPrev}
          onClick={() => setMonth((m) => addMonths(m, -1))}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-rose-400 shadow-sm transition disabled:opacity-30"
        >
          ◀
        </button>
        <span className="font-display text-lg font-bold capitalize text-rose-500">
          {monthLabel}
        </span>
        <button
          type="button"
          aria-label="Tháng sau"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-rose-400 shadow-sm transition"
        >
          ▶
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-rose-400/70">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const inMonth = isSameMonth(day, month);
          const past = isBefore(day, today);
          const disabled = past;
          const isSelected = selected && isSameDay(day, selected);
          const weekend = isWeekend(day);

          return (
            <motion.button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              whileTap={disabled ? undefined : { scale: 0.85 }}
              onClick={() => onSelect(day)}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-2xl text-sm font-semibold transition-colors",
                !inMonth && "opacity-40",
                disabled && "cursor-not-allowed text-rose-300/40",
                !disabled && !isSelected && weekend && "bg-pink-100/80 text-rose-500",
                !disabled && !isSelected && !weekend && "bg-white/60 text-rose-400 hover:bg-pink-50",
                isSelected &&
                  "scale-105 bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-md shadow-pink-400/50 ring-2 ring-white",
              )}
            >
              {format(day, "d")}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
