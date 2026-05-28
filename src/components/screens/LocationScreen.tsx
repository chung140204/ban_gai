"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "@/config/content";
import { assets } from "@/config/assets";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { PastelButton } from "@/components/ui/PastelButton";
import { ScreenBear } from "@/components/ui/ScreenBear";
import { cn } from "@/lib/cn";

interface LocationResult {
  location: string;
  food?: string;
  activity?: string;
}

function pickRandom<T>(arr: readonly T[], exclude?: T): T {
  const pool = exclude ? arr.filter((x) => x !== exclude) : [...arr];
  return pool[Math.floor(Math.random() * pool.length)];
}

function SpinChip({
  value,
  spinning,
  onSpin,
  label,
}: {
  value: string | undefined;
  spinning: boolean;
  onSpin: () => void;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onSpin}
        className="flex items-center gap-2 rounded-full border border-dashed border-rose-300 bg-white/60 px-5 py-2.5 text-sm font-bold text-rose-500 shadow-sm transition hover:bg-pink-50 active:scale-95"
      >
        <motion.span
          animate={spinning ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          🎲
        </motion.span>
        {label}
      </button>

      <AnimatePresence mode="wait">
        {value && (
          <motion.div
            key={value}
            initial={{ scale: 0.6, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="rounded-2xl border border-white/70 bg-gradient-to-br from-pink-100/80 to-rose-100/80 px-4 py-2 text-center text-sm font-bold text-rose-500 shadow-sm"
          >
            {value}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LocationScreen({
  onPick,
  onSkip,
}: {
  onPick: (result: LocationResult) => void;
  onSkip: () => void;
}) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [food, setFood] = useState<string | undefined>(undefined);
  const [activity, setActivity] = useState<string | undefined>(undefined);
  const [spinningFood, setSpinningFood] = useState(false);
  const [spinningActivity, setSpinningActivity] = useState(false);
  const spinFoodRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spinActRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = selectedPreset
    ? (content.location.presets.find((p) => p.id === selectedPreset)?.emoji ?? "") +
      " " +
      (content.location.presets.find((p) => p.id === selectedPreset)?.label ?? "")
    : customText.trim();

  const ready = location.length > 0;

  const handleSpinFood = useCallback(() => {
    if (spinFoodRef.current) clearTimeout(spinFoodRef.current);
    setSpinningFood(true);
    let count = 0;
    const flash = () => {
      setFood(pickRandom(content.location.foods as readonly string[], food));
      count++;
      if (count < 6) {
        spinFoodRef.current = setTimeout(flash, 80 + count * 30);
      } else {
        setSpinningFood(false);
      }
    };
    flash();
  }, [food]);

  const handleSpinActivity = useCallback(() => {
    if (spinActRef.current) clearTimeout(spinActRef.current);
    setSpinningActivity(true);
    let count = 0;
    const flash = () => {
      setActivity(pickRandom(content.location.activities as readonly string[], activity));
      count++;
      if (count < 6) {
        spinActRef.current = setTimeout(flash, 80 + count * 30);
      } else {
        setSpinningActivity(false);
      }
    };
    flash();
  }, [activity]);

  const handleContinue = () => onPick({ location, food, activity });

  return (
    <ScreenShell className="justify-start">
      <GlassCard className="max-w-lg">
        <div className="mb-3 flex justify-center">
          <ScreenBear src={assets.bears.location} fallback="🐻" alt="gấu vui" />
        </div>

        <h2 className="font-display text-2xl font-extrabold text-rose-500">
          {content.location.title}
        </h2>
        <p className="mt-1 text-sm text-rose-400/80">{content.location.subtitle}</p>

        {/* Chọn địa điểm preset */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {content.location.presets.map((p) => (
            <motion.button
              key={p.id}
              type="button"
              whileTap={{ scale: 0.93 }}
              onClick={() => { setSelectedPreset(p.id); setCustomText(""); }}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-2xl border p-2.5 text-xs font-bold transition-colors",
                selectedPreset === p.id
                  ? "border-transparent bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-md shadow-pink-400/40"
                  : "border-white/70 bg-white/60 text-rose-400 hover:bg-pink-50",
              )}
            >
              <span className="text-xl">{p.emoji}</span>
              <span>{p.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Custom input */}
        <div className="mt-3">
          <input
            type="text"
            value={customText}
            onChange={(e) => { setCustomText(e.target.value); setSelectedPreset(null); }}
            placeholder={content.location.customPlaceholder}
            className="w-full rounded-2xl border border-white/60 bg-white/60 px-4 py-3 text-sm font-medium text-rose-500 placeholder-rose-300/60 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200/50"
          />
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-rose-200/50" />
          <span className="text-xs font-semibold text-rose-400/70">Gợi ý thêm cho vui nha 🎉</span>
          <div className="h-px flex-1 bg-rose-200/50" />
        </div>

        {/* Random food + activity */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-sm font-bold text-rose-500">{content.location.foodTitle}</p>
            <SpinChip
              value={food}
              spinning={spinningFood}
              onSpin={handleSpinFood}
              label={content.location.foodSpin}
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-rose-500">{content.location.activityTitle}</p>
            <SpinChip
              value={activity}
              spinning={spinningActivity}
              onSpin={handleSpinActivity}
              label={content.location.activitySpin}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <PastelButton variant="ghost" onClick={onSkip}>
            {content.location.skipLabel}
          </PastelButton>
          <PastelButton variant="yes" onClick={handleContinue} disabled={!ready}>
            {content.location.continueLabel}
          </PastelButton>
        </div>
      </GlassCard>
    </ScreenShell>
  );
}
