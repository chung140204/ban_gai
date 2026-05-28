"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface RunawayButtonProps {
  labels: string[];
  dodgesUntilImpossible: number;
  onDodge: (count: number) => void;
  className?: string;
}

/**
 * Nút "Không" chạy trốn: né con trỏ/ngón tay, đổi chữ ngẫu nhiên,
 * và nhỏ dần + mờ dần tới mức gần như không thể bấm.
 */
export function RunawayButton({
  labels,
  dodgesUntilImpossible,
  onDodge,
  className,
}: RunawayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  // Dùng ref để đọc count hiện tại mà không cần closure cũ
  const dodgesRef = useRef(0);
  const [moved, setMoved] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);
  const [labelIndex, setLabelIndex] = useState(0);

  const dodge = useCallback(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    const w = el?.offsetWidth ?? 150;
    const h = el?.offsetHeight ?? 50;
    // Tính safe area để không né vào vùng notch / home bar trên iPhone
    const safeTop = 60;
    const safeBottom = 80;
    const pad = 16;
    const maxX = Math.max(pad, window.innerWidth - w - pad);
    const maxY = Math.max(safeTop, window.innerHeight - h - safeBottom);
    setPos({
      x: pad + Math.random() * (maxX - pad),
      y: safeTop + Math.random() * (maxY - safeTop),
    });
    setMoved(true);

    // Tính next bên ngoài setState để không gọi callback cha bên trong updater
    const next = dodgesRef.current + 1;
    dodgesRef.current = next;
    setDodges(next);
    onDodge(next); // gọi ở đây — trong event handler, không trong render

    setLabelIndex((i) => {
      if (labels.length <= 1) return i;
      let n = i;
      while (n === i) n = Math.floor(Math.random() * labels.length);
      return n;
    });
  }, [labels.length, onDodge]);

  const escape = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dodge();
    },
    [dodge],
  );

  // Chạy thoải mái GRACE_DODGES lần đầu — sau đó mới bắt đầu thu nhỏ + mờ dần
  const GRACE_DODGES = 3;
  const fadeRatio = Math.max(
    0,
    Math.min(1, (dodges - GRACE_DODGES) / Math.max(1, dodgesUntilImpossible - GRACE_DODGES)),
  );
  const scale = 1 - fadeRatio * 0.62;
  const opacity = 1 - fadeRatio * 0.88;

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseEnter={escape}
      onPointerDown={escape}
      onClick={escape}
      animate={moved ? { top: pos.y, left: pos.x, scale, opacity } : { scale, opacity }}
      transition={{ type: "spring", stiffness: 500, damping: 26 }}
      style={moved ? { position: "fixed" } : undefined}
      className={cn(
        "z-50 inline-flex min-h-[48px] select-none items-center justify-center rounded-full bg-white/85 px-6 py-3 text-base font-bold text-rose-400 shadow-md shadow-pink-200/60",
        className,
      )}
    >
      {labels[labelIndex] ?? labels[0]}
    </motion.button>
  );
}
