"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import { assets } from "@/config/assets";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { RunawayButton } from "@/components/ui/RunawayButton";
import { ScreenBear } from "@/components/ui/ScreenBear";
import { useSfx } from "@/hooks/useSfx";
import { celebrate } from "@/lib/confetti";

export function AskScreen({ onYes }: { onYes: () => void }) {
  const [dodges, setDodges] = useState(0);
  const playSfx = useSfx();

  const yesScale = Math.min(
    content.ask.maxYesScale,
    1 + dodges * content.ask.yesGrowthPerDodge,
  );

  const handleDodge = useCallback(
    (count: number) => {
      setDodges(count);
      playSfx("pop", 0.5);
    },
    [playSfx],
  );

  const handleYes = useCallback(() => {
    playSfx("success", 0.6);
    void celebrate();
    setTimeout(onYes, 750);
  }, [onYes, playSfx]);

  return (
    <ScreenShell>
      <GlassCard className="overflow-visible">
        <div className="mb-3 flex justify-center">
          <ScreenBear src={assets.bears.ask} fallback="🥺" alt="gấu buồn" />
        </div>

        <h2 className="font-display text-2xl font-extrabold leading-snug text-rose-500 sm:text-3xl">
          {content.ask.question}
        </h2>
        <p className="mt-3 text-sm text-rose-400/80">{content.ask.subtitle}</p>

        <div className="relative mt-8 flex min-h-[140px] flex-col items-center justify-center gap-5">
          <motion.div
            animate={{ scale: yesScale }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            style={{ transformOrigin: "center" }}
          >
            <motion.button
              type="button"
              onClick={handleYes}
              whileTap={{ scale: 0.92 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
              className="select-none rounded-full bg-gradient-to-br from-pink-400 via-rose-400 to-fuchsia-500 px-9 py-4 text-xl font-extrabold text-white shadow-xl shadow-pink-500/50"
            >
              {content.ask.yesLabel}
            </motion.button>
          </motion.div>

          <RunawayButton
            labels={[...content.ask.noLabels]}
            dodgesUntilImpossible={content.ask.dodgesUntilImpossible}
            onDodge={handleDodge}
          />
        </div>
      </GlassCard>
    </ScreenShell>
  );
}
