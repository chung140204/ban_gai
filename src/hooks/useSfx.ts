"use client";

import { useCallback, useRef } from "react";

/**
 * Tạo âm thanh bằng Web Audio API — không cần file mp3.
 * Tự động khởi tạo AudioContext sau gesture đầu tiên của người dùng.
 */
export function useSfx() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    // Thoát khỏi trạng thái suspended (iOS yêu cầu gesture trước)
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  return useCallback(
    (type: "pop" | "success", volume = 0.55) => {
      const ctx = getCtx();
      if (!ctx) return;

      if (type === "pop") {
        // Tiếng "pop" bong bóng dễ thương
        const osc = ctx.createOscillator();
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
        // Tiếng chuông "thành công" — arpeggio C-E-G-C dễ thương
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
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
    },
    [getCtx],
  );
}
