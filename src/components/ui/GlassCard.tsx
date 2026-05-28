import { cn } from "@/lib/cn";

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-3xl border border-white/60 bg-white/40 p-5 text-center shadow-2xl shadow-pink-300/30 backdrop-blur-xl sm:rounded-[2rem] sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}
