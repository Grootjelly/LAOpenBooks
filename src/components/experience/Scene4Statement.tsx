"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const chapters = [
  {
    number: "I",
    title: "DISCOVER",
    body: "Clarify your idea.",
    sub: "Before the words, before the cover — there is a question only you can answer. What is the thing that needs to exist?",
  },
  {
    number: "II",
    title: "CREATE",
    body: "Books. Identity. Voice.",
    sub: "Your idea takes form. A manuscript becomes a book. A name becomes an identity. A whisper becomes something the world can hold.",
  },
  {
    number: "III",
    title: "BUILD",
    body: "Website. Brand. Platform.",
    sub: "The book is real, but a book alone is a message in a bottle. Build the place your readers return to.",
  },
  {
    number: "IV",
    title: "GROW",
    body: "Marketing. Speaking. Community. AI.",
    sub: "Ideas compound. Readers become advocates. Advocates become a movement. Your legacy multiplies.",
  },
];

function StatementSection({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        className="text-stone-600 text-[10px] tracking-[0.4em] uppercase font-mono mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1 }}
      >
        a truth
      </motion.p>

      <div className="max-w-2xl space-y-8">
        <motion.h2
          className="font-serif text-3xl md:text-5xl text-white leading-relaxed"
          initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", y: 16 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Ideas don&apos;t become reality by accident.
        </motion.h2>

        <motion.div
          className="font-serif text-3xl md:text-5xl leading-relaxed"
          initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", y: 16 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
        >
          <span className="text-stone-300">They become reality through </span>
          <span className="relative inline-block">
            <span className="text-white italic">intention.</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-px bg-amber-400/70"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: reduced ? 0.5 : 1.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: reduced ? 0.3 : 1.8,
              }}
            />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function ChapterPanel({
  chapter,
  reduced,
}: {
  chapter: (typeof chapters)[0];
  reduced: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-amber-500/[0.015] blur-[80px]" />
      </div>

      <div className="relative max-w-xl w-full">
        {/* Chapter number */}
        <motion.p
          className="text-stone-700 text-[80px] md:text-[120px] font-serif font-bold leading-none select-none absolute -top-12 -left-4 md:-left-12 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          {chapter.number}
        </motion.p>

        {/* Content */}
        <div className="relative z-10 pt-8 border-t border-white/[0.06]">
          <motion.p
            className="text-amber-500 text-[10px] tracking-[0.4em] uppercase font-mono mb-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Chapter {chapter.number}
          </motion.p>

          <motion.h3
            className="font-serif text-4xl md:text-6xl text-white mb-4 tracking-tight"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {chapter.title}
          </motion.h3>

          <motion.p
            className="text-stone-300 text-xl md:text-2xl font-serif italic mb-6"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {chapter.body}
          </motion.p>

          <motion.p
            className="text-stone-500 text-sm md:text-base leading-relaxed max-w-md"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            {chapter.sub}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function Scene4Statement() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-[#060606]">
      {/* Scene 4 — The Statement */}
      <StatementSection reduced={reduced} />

      {/* Divider */}
      <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent mx-auto" />

      {/* Scene 5 — Four Chapters, one per viewport */}
      {chapters.map((chapter) => (
        <ChapterPanel key={chapter.title} chapter={chapter} reduced={reduced} />
      ))}
    </section>
  );
}
