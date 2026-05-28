"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Nhạc nền lãng mạn sinh bằng Web Audio API — không cần file mp3.
 * Progression: C → Am → F → G (lặp vô hạn), phong cách piano lofi nhẹ nhàng.
 */

const BPM = 72;
const BEAT = 60 / BPM;         // ~0.833s
const BAR  = BEAT * 4;         // 1 bar = 4 beats
const LOOK_AHEAD = 0.15;       // schedule ahead (s)

// Chord progression — [bass, chord tones...]
const PROGRESSION: number[][] = [
  [130.81, 261.63, 329.63, 392.00, 523.25], // C2  C4 E4 G4 C5
  [110.00, 220.00, 261.63, 329.63, 440.00], // A2  A3 C4 E4 A4
  [87.31,  174.61, 220.00, 261.63, 349.23], // F2  F3 A3 C4 F4
  [98.00,  196.00, 246.94, 293.66, 392.00], // G2  G3 B3 D4 G4
];
const LOOP_DUR = BAR * PROGRESSION.length;

function tone(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  t: number,
  dur: number,
  vol: number,
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

  // Bass: vỗ nhẹ beat 1 và beat 3
  tone(ctx, dest, bass,        barStart,            BEAT * 0.6, 0.55, "sine");
  tone(ctx, dest, bass,        barStart + BEAT * 2, BEAT * 0.5, 0.40, "sine");

  // Arpeggio chord: mỗi beat 1 note upper
  upper.forEach((freq, i) => {
    const t = barStart + i * BEAT;
    tone(ctx, dest, freq, t, BEAT * 0.55, 0.38, "triangle");
    // Thêm tiếng ping nhẹ octave trên vào beat chẵn
    if (i % 2 === 0) {
      tone(ctx, dest, freq * 2, t + BEAT * 0.5, BEAT * 0.25, 0.15, "sine");
    }
  });
}

export function useBackgroundMusic(_src: string, masterVolume = 1.0) {
  const ctxRef    = useRef<AudioContext | null>(null);
  const gainRef   = useRef<GainNode | null>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextRef   = useRef<number>(0);

  const [isPlaying,  setIsPlaying]  = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const scheduleLoop = useCallback((ctx: AudioContext, dest: AudioNode) => {
    const now = ctx.currentTime;
    if (nextRef.current < now + LOOK_AHEAD) {
      nextRef.current = now + 0.05;
    }
    const loopStart = nextRef.current;
    PROGRESSION.forEach((chord, i) =>
      scheduleBar(ctx, dest, chord, loopStart + i * BAR),
    );
    nextRef.current += LOOP_DUR;

    const waitMs = Math.max(100, (nextRef.current - ctx.currentTime - 0.8) * 1000);
    timerRef.current = setTimeout(() => scheduleLoop(ctx, dest), waitMs);
  }, []);

  const start = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const ctx        = new AudioContext();
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -12;
      compressor.knee.value      = 6;
      compressor.ratio.value     = 4;
      compressor.attack.value    = 0.003;
      compressor.release.value   = 0.25;
      compressor.connect(ctx.destination);

      const gain = ctx.createGain();
      gain.gain.value = masterVolume;
      gain.connect(compressor);
      ctxRef.current  = ctx;
      gainRef.current = gain;

      const run = () => { scheduleLoop(ctx, gain); setIsPlaying(true); setHasStarted(true); };
      if (ctx.state === "suspended") ctx.resume().then(run).catch(() => setHasStarted(true));
      else run();
    } catch { setHasStarted(true); }
  }, [masterVolume, scheduleLoop]);

  const toggle = useCallback(() => {
    const gain = gainRef.current;
    const ctx  = ctxRef.current;
    if (!gain || !ctx) return;
    if (isPlaying) {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      setIsPlaying(false);
    } else {
      gain.gain.setTargetAtTime(masterVolume, ctx.currentTime, 0.25);
      setIsPlaying(true);
    }
  }, [isPlaying, masterVolume]);

  useEffect(() => () => { clearTimer(); ctxRef.current?.close(); }, []);

  return { isPlaying, hasStarted, start, toggle };
}
