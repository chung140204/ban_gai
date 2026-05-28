"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import { assets } from "@/config/assets";
import { GlassCard } from "@/components/ui/GlassCard";
import { PastelButton } from "@/components/ui/PastelButton";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { ScreenBear } from "@/components/ui/ScreenBear";

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <ScreenShell>
      <GlassCard>
        <motion.div
          className="mb-4 inline-block rounded-full bg-white/70 px-4 py-1 text-sm font-semibold text-rose-500"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {content.intro.badge}
        </motion.div>

        <div className="mb-4 flex justify-center">
          <ScreenBear src={assets.bears.intro} fallback="🐻" alt="gấu shy" />
        </div>

        <h1 className="font-display text-3xl font-extrabold text-rose-500 sm:text-4xl">
          {content.intro.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-base text-rose-400/90">
          {content.intro.subtitle}
        </p>

        <div className="mt-7 flex justify-center">
          <PastelButton variant="primary" onClick={onStart}>
            {content.intro.cta}
          </PastelButton>
        </div>
      </GlassCard>
    </ScreenShell>
  );
}
