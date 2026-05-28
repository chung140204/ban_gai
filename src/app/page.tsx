"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { DateSelection, Step } from "@/lib/types";
import { assets } from "@/config/assets";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { IntroScreen } from "@/components/screens/IntroScreen";
import { AskScreen } from "@/components/screens/AskScreen";
import { DateTimeScreen } from "@/components/screens/DateTimeScreen";
import { LocationScreen } from "@/components/screens/LocationScreen";
import { ConfirmScreen } from "@/components/screens/ConfirmScreen";
import { SuccessScreen } from "@/components/screens/SuccessScreen";

export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [selection, setSelection] = useState<DateSelection | null>(null);
  const music = useBackgroundMusic(assets.audio.bgMusic);

  const handleStart = useCallback(() => {
    music.start();
    setStep("ask");
  }, [music]);

  const handlePickDateTime = useCallback((picked: DateSelection) => {
    setSelection(picked);
    setStep("location");
  }, []);

  const handlePickLocation = useCallback(
    (result: { location: string; food?: string; activity?: string }) => {
      setSelection((prev) => prev ? { ...prev, ...result } : prev);
      setStep("confirm");
    },
    [],
  );

  const handleRestart = useCallback(() => {
    setSelection(null);
    setStep("intro");
  }, []);

  return (
    <main className="relative min-h-[100dvh] w-full">
      <FloatingHearts count={step === "success" ? 28 : 16} />

      {music.hasStarted && (
        <MusicToggle isPlaying={music.isPlaying} onToggle={music.toggle} />
      )}

      <AnimatePresence mode="wait">
        {step === "intro" && <IntroScreen key="intro" onStart={handleStart} />}

        {step === "ask" && (
          <AskScreen key="ask" onYes={() => setStep("datetime")} />
        )}

        {step === "datetime" && (
          <DateTimeScreen key="datetime" onPick={handlePickDateTime} />
        )}

        {step === "location" && selection && (
          <LocationScreen
            key="location"
            onPick={handlePickLocation}
            onSkip={() => setStep("confirm")}
          />
        )}

        {step === "confirm" && selection && (
          <ConfirmScreen
            key="confirm"
            selection={selection}
            onConfirm={() => setStep("success")}
            onChange={() => setStep("location")}
          />
        )}

        {step === "success" && selection && (
          <SuccessScreen
            key="success"
            selection={selection}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
