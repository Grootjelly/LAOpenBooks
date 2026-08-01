"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    num: "01",
    title: "Research",
    body: "Every book starts in the archives — real events, real people, real breakthroughs, rigorously fact-checked before a single puzzle is drawn.",
  },
  {
    num: "02",
    title: "Design",
    body: "Custom typography, illustration, and layout are built page by page in our Los Angeles studio, so each spread feels crafted rather than generated.",
  },
  {
    num: "03",
    title: "Play",
    body: "Finally, the puzzles. Word searches and activities engineered so you learn by doing — history, culture, and science, one search at a time.",
  },
];

export default function AboutTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.55"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScale = useSpring(rawScale, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative">
      <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-amber-500/80 mb-10">
        How a Bookendbook is made
      </p>

      <div className="relative pl-10 md:pl-14">
        {/* Track + scroll-drawn line */}
        <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-white/[0.08]" />
        <motion.div
          className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800"
          style={{ scaleY: reduced ? 1 : lineScale }}
        />

        <div className="space-y-14 md:space-y-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative"
              initial={reduced ? undefined : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              {/* Node dot */}
              <motion.span
                className="absolute -left-10 md:-left-14 top-1.5 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 border-amber-500 bg-[#0a0a0a]"
                initial={reduced ? undefined : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
              >
                <span className="absolute inset-[3px] rounded-full bg-amber-500/40" />
              </motion.span>

              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-amber-600/70 text-sm">{step.num}</span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-stone-400 leading-relaxed max-w-xl">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
