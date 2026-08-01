"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface ScrollMarqueeProps {
  items: string[];
  className?: string;
}

export default function ScrollMarquee({ items, className }: ScrollMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-20%"]);

  // Repeat enough times that the strip never runs out while sliding
  const row = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative overflow-hidden py-8 md:py-10 border-y border-white/[0.05] bg-[#0c0c0c] select-none ${className ?? ""}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        className="flex items-center whitespace-nowrap gap-10 will-change-transform"
        style={{ x }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0">
            <span
              className="font-serif text-4xl md:text-6xl font-bold text-transparent tracking-tight"
              style={{ WebkitTextStroke: "1px rgba(217,119,6,0.32)" }}
            >
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-600/40 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
