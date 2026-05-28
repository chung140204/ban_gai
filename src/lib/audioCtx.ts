"use client";

/**
 * Singleton AudioContext dùng chung cho nhạc nền và SFX.
 * iOS yêu cầu resume() được gọi trong gesture handler —
 * dùng chung 1 context để chỉ cần unlock 1 lần duy nhất.
 */

let sharedCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) sharedCtx = new AudioContext();
  return sharedCtx;
}

/** Gọi trong gesture handler để unlock cho iOS */
export async function ensureAudioReady(): Promise<AudioContext | null> {
  const ctx = getAudioContext();
  if (!ctx) return null;
  if (ctx.state === "suspended") await ctx.resume();
  return ctx;
}
