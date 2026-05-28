const PALETTE = ["#ff8fb8", "#ff5e9a", "#ffc6dd", "#fff5fa", "#efe1ff", "#ffd1e8"];

/** Bùng nổ confetti + tim khi nhận lời / ăn mừng. */
export async function celebrate() {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;

  const heart =
    typeof confetti.shapeFromText === "function"
      ? confetti.shapeFromText({ text: "❤️", scalar: 2.2 })
      : undefined;

  const base = {
    spread: 75,
    startVelocity: 45,
    ticks: 220,
    gravity: 0.9,
    origin: { x: 0.5, y: 0.62 },
    colors: PALETTE,
  };

  confetti({ ...base, particleCount: 70, scalar: 1.2 });
  if (heart) {
    confetti({ ...base, particleCount: 26, shapes: [heart], scalar: 2.2 });
  }

  setTimeout(() => {
    confetti({
      ...base,
      particleCount: 45,
      angle: 60,
      origin: { x: 0, y: 0.7 },
    });
    confetti({
      ...base,
      particleCount: 45,
      angle: 120,
      origin: { x: 1, y: 0.7 },
    });
  }, 220);
}

/** Mưa tim rơi nhẹ nhàng cho màn thành công. */
export async function heartRain(durationMs = 2600) {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;
  const heart =
    typeof confetti.shapeFromText === "function"
      ? confetti.shapeFromText({ text: "💕", scalar: 2 })
      : undefined;

  const end = Date.now() + durationMs;
  const frame = () => {
    confetti({
      particleCount: 2,
      startVelocity: 0,
      ticks: 260,
      gravity: 0.6,
      origin: { x: Math.random(), y: -0.1 },
      colors: PALETTE,
      shapes: heart ? [heart] : undefined,
      scalar: heart ? 1.8 : 1,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
