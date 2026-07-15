"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Each stage of the transformation morphs on scroll
const stages = [
  {
    id: "notebook",
    label: "Your idea",
    sublabel: "An open page. A thought.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="15" y="10" width="50" height="62" rx="2" stroke="currentColor" strokeWidth="2" />
        <line x1="25" y1="28" x2="55" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="25" y1="38" x2="55" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="25" y1="48" x2="45" y2="48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 18 Q40 14 48 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "blueprint",
    label: "A plan emerges",
    sublabel: "Structure. Intention.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="8" y="8" width="64" height="64" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <line x1="8" y1="40" x2="72" y2="40" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="40" y1="8" x2="40" y2="72" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <rect x="22" y="22" width="36" height="36" stroke="currentColor" strokeWidth="2" />
        <circle cx="40" cy="40" r="6" stroke="currentColor" strokeWidth="2" />
        <line x1="22" y1="30" x2="18" y2="26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="58" y1="30" x2="62" y2="26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <text x="40" y="68" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.6">40 × 40 px</text>
      </svg>
    ),
  },
  {
    id: "logo",
    label: "Identity takes shape",
    sublabel: "Your mark on the world.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,12 68,58 12,58" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="40,22 60,54 20,54" fill="currentColor" opacity="0.08" />
        <circle cx="40" cy="44" r="5" fill="currentColor" opacity="0.9" />
        <line x1="40" y1="12" x2="40" y2="39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "domain",
    label: "A place in the world",
    sublabel: "yourstory.com",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="10" y="18" width="60" height="44" rx="3" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="24" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="28" cy="24" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="36" cy="24" r="2.5" fill="currentColor" opacity="0.7" />
        <rect x="20" y="38" width="40" height="4" rx="1" fill="currentColor" opacity="0.12" />
        <rect x="20" y="46" width="28" height="3" rx="1" fill="currentColor" opacity="0.08" />
        <rect x="20" y="53" width="34" height="3" rx="1" fill="currentColor" opacity="0.08" />
      </svg>
    ),
  },
  {
    id: "community",
    label: "Others find you",
    sublabel: "Readers. Believers. Advocates.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="52" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="62" cy="52" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="58" r="6" stroke="currentColor" strokeWidth="1.5" />
        <line x1="33" y1="37" x2="23" y2="47" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="47" y1="37" x2="57" y2="47" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="40" y1="40" x2="40" y2="52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "legacy",
    label: "A shelf of finished books",
    sublabel: "Something that outlives the moment.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="12" y="18" width="12" height="46" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="26" y="24" width="10" height="40" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="38" y="14" width="14" height="50" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="54" y="22" width="10" height="42" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="64" x2="66" y2="64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="42" y1="14" x2="42" y2="64" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      </svg>
    ),
  },
];

export default function Scene3Transform() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Each stage occupies ~1/6 of the scroll range with overlap
  const stageCount = stages.length;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060606]"
      style={{ minHeight: `${stageCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Section label */}
        <p className="text-stone-600 text-[10px] tracking-[0.4em] uppercase font-mono mb-12">
          from idea to legacy
        </p>

        {/* Stage display */}
        <div className="relative w-full max-w-md flex flex-col items-center">
          {stages.map((stage, i) => {
            const start = i / stageCount;
            const end = (i + 1) / stageCount;
            const mid = (start + end) / 2;

            const opacity = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.05), start + 0.05, mid, end - 0.05, end + 0.05],
              [0, 1, 1, 1, 0]
            );
            const y = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.05), start + 0.1, end - 0.1, end + 0.05],
              [reduced ? 0 : 30, 0, 0, reduced ? 0 : -30]
            );
            const scale = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.05), start + 0.08, mid, end - 0.08, end + 0.05],
              [0.9, 1, 1, 1, 0.9]
            );

            return (
              <motion.div
                key={stage.id}
                className="absolute inset-0 flex flex-col items-center"
                style={{ opacity, y, scale }}
              >
                {/* Illustration */}
                <div className="w-28 h-28 text-stone-300 mb-8">
                  {stage.icon}
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-2 mb-8">
                  {stages.map((_, di) => (
                    <div
                      key={di}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        di === i ? "bg-amber-500" : "bg-stone-700"
                      }`}
                    />
                  ))}
                </div>

                {/* Copy */}
                <h3 className="font-serif text-3xl md:text-4xl text-white text-center mb-3">
                  {stage.label}
                </h3>
                <p className="text-stone-400 text-sm tracking-wide text-center font-sans">
                  {stage.sublabel}
                </p>

                {/* Stage counter */}
                <p className="mt-8 text-stone-700 text-[10px] tracking-[0.3em] uppercase font-mono">
                  {String(i + 1).padStart(2, "0")} / {String(stageCount).padStart(2, "0")}
                </p>
              </motion.div>
            );
          })}

          {/* Spacer so absolute-positioned children have a height reference */}
          <div className="w-full" style={{ height: "320px" }} />
        </div>
      </div>
    </section>
  );
}
