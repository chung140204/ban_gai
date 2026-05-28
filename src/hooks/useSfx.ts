"use client";

import { useCallback } from "react";
import { ensureAudioReady } from "@/lib/audioCtx";

/**
 * Phát hiệu ứng âm thanh bằng Web Audio API.
 * Dùng chung AudioContext với nhạc nền — iOS chỉ cần unlock 1 lần.
 */
export function useSfx() {
  return useCallback(async (type: "pop" | "success", volume = 0.55) => {
    const ctx = await ensureAudioReady();
    if (!ctx) return;

    if (type === "pop") {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.11);
    } else {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const t = ctx.currentTime + i * 0.11;
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(volume * 0.7, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    }
  }, []);
}
