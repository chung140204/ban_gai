"use client";

/**
 * Singleton AudioContext + iOS unlock.
 *
 * iOS Safari yêu cầu:
 *  1. new AudioContext() gọi ĐỒNG BỘ trong gesture handler
 *  2. Phát 1 silent buffer ngay lập tức để thực sự mở khóa
 *  3. KHÔNG dùng async/await — phá vỡ gesture chain trên iOS
 */

let ctx: AudioContext | null = null;

export function unlockAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!ctx) ctx = new AudioContext();

  // resume() đồng bộ (fire and forget) — không await
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  // Silent buffer trick — cách DUY NHẤT đáng tin để unlock iOS WebAudio
  try {
    const buf = ctx.createBuffer(1, 1, ctx.sampleRate);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch {}

  return ctx;
}

export function getAudioContext(): AudioContext | null {
  return ctx;
}
