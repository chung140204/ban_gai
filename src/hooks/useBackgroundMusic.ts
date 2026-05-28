"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ensureAudioReady, getAudioContext } from "@/lib/audioCtx";

const BPM = 72;
const BEAT = 60 / BPM;
const BAR  = BEAT * 4;
const LOOK_AHEAD = 0.15;

const PROGRESSION: number[][] = [
  [130.81, 261.63, 329.63, 392.00, 523.25],
  [110.00, 220.00, 261.63, 329.63, 440.00],
  [87.31,  174.61, 220.00, 261.63, 349.23],
  [98.00,  196.00, 246.94, 293.66, 392.00],
];
const LOOP_DUR = BAR * PROGRESSION.length;

function tone(
  ctx: AudioContext, dest: AudioNode,
  freq: number, t: number, dur: number, vol: number,
  type: OscillatorType = "triangle",
) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(dest);
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol, t + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function scheduleBar(ctx: AudioContext, dest: AudioNode, chord: number[], barStart: number) {
  const [bass, ...upper] = chord;
  tone(ctx, dest, bass, barStart,            BEAT * 0.6, 0.55, "sine");
  tone(ctx, dest, bass, barStart + BEAT * 2, BEAT * 0.5, 0.40, "sine");
  upper.forEach((freq, i) => {
    const t = barStart + i * BEAT;
    tone(ctx, dest, freq, t, BEAT * 0.55, 0.38, "triangle");
    if (i % 2 === 0) tone(ctx, dest, freq * 2, t + BEAT * 0.5, BEAT * 0.25, 0.15, "sine");
  });
}

export function useBackgroundMusic(_src: string, masterVolume = 1.0) {
  const gainRef      = useRef<GainNode | null>(null);
  const compRef      = useRef<AudioNode | null>(null);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextRef      = useRef<number>(0);
  const playingRef   = useRef(false);

  const [isPlaying,  setIsPlaying]  = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const scheduleLoop = useCallback((ctx: AudioContext, dest: AudioNode) => {
    // iOS: nếu context bị suspend (mất focus), tự resume rồi reschedule
    if (ctx.state === "suspended") {
      void ctx.resume().then(() => {
        if (playingRef.current) scheduleLoop(ctx, dest);
      });
      return;
    }

    const now = ctx.currentTime;
    if (nextRef.current < now + LOOK_AHEAD) nextRef.current = now + 0.05;

    const loopStart = nextRef.current;
    PROGRESSION.forEach((chord, i) => scheduleBar(ctx, dest, chord, loopStart + i * BAR));
    nextRef.current += LOOP_DUR;

    const waitMs = Math.max(100, (nextRef.current - ctx.currentTime - 0.8) * 1000);
    timerRef.current = setTimeout(() => {
      if (playingRef.current) scheduleLoop(ctx, dest);
    }, waitMs);
  }, []);

  const start = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      // Dùng shared context — đã unlock bởi gesture này
      const ctx = await ensureAudioReady();
      if (!ctx) { setHasStarted(true); return; }

      if (!compRef.current) {
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -12;
        comp.knee.value      = 6;
        comp.ratio.value     = 4;
        comp.attack.value    = 0.003;
        comp.release.value   = 0.25;
        comp.connect(ctx.destination);
        compRef.current = comp;

        const gain = ctx.createGain();
        gain.gain.value = masterVolume;
        gain.connect(comp);
        gainRef.current = gain;
      }

      playingRef.current = true;
      scheduleLoop(ctx, gainRef.current!);
      setIsPlaying(true);
      setHasStarted(true);
    } catch {
      setHasStarted(true);
    }
  }, [masterVolume, scheduleLoop]);

  const toggle = useCallback(async () => {
    const gain = gainRef.current;
    const ctx  = getAudioContext();
    if (!gain || !ctx) return;

    if (isPlaying) {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      playingRef.current = false;
      setIsPlaying(false);
    } else {
      // iOS: resume lại nếu bị suspend khi tắt tiếng
      if (ctx.state === "suspended") await ctx.resume();
      gain.gain.setTargetAtTime(masterVolume, ctx.currentTime, 0.25);
      playingRef.current = true;
      // Restart scheduling nếu timer đã dừng
      scheduleLoop(ctx, gain);
      setIsPlaying(true);
    }
  }, [isPlaying, masterVolume, scheduleLoop]);

  // Tự resume khi tab/app được active lại (iOS suspend khi mất focus)
  useEffect(() => {
    const handleVisible = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended" && playingRef.current) {
        void ctx.resume();
      }
    };
    document.addEventListener("visibilitychange", handleVisible);
    return () => document.removeEventListener("visibilitychange", handleVisible);
  }, []);

  useEffect(() => () => { clearTimer(); }, []);

  return { isPlaying, hasStarted, start, toggle };
}
