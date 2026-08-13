"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface Stage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  body: string;
  graphic: React.ReactNode;
}

const stages: Stage[] = [
  {
    id: "blank",
    step: "01 / 06",
    title: "The Blank Page",
    subtitle: "The void of raw potential",
    body: "Every enduring work begins in the quiet exhilaration of an empty sheet. Nothing exists yet, except the conviction that it should.",
    graphic: (
      <div className="relative w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84 bg-[#F5F4EF] rounded-sm shadow-2xl p-6 flex flex-col justify-between border border-[#E5E0D5]">
        <div className="flex justify-between items-center opacity-30 text-[9px] font-mono text-stone-800">
          <span>PAGE 01</span>
          <span>[BLANK]</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-600/40 mx-auto" />
        <div className="text-center font-serif text-[11px] text-stone-400 italic">
          awaiting the first mark
        </div>
      </div>
    ),
  },
  {
    id: "word",
    step: "02 / 06",
    title: "The Word",
    subtitle: "A single mark committed to paper",
    body: "An intangible thought crosses the boundary into the physical realm. The first stroke of ink pins a fleeting idea to reality.",
    graphic: (
      <div className="relative w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84 bg-[#F5F4EF] rounded-sm shadow-2xl p-6 flex flex-col justify-between border border-[#E5E0D5]">
        <div className="flex justify-between items-center opacity-40 text-[9px] font-mono text-stone-800">
          <span>BEGINNING</span>
          <span>FOLIO 01</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="font-serif text-3xl sm:text-4xl text-[#1a1917] italic font-semibold border-b-2 border-amber-500/80 pb-1">
            Origin.
          </span>
        </div>
        <div className="text-[10px] font-mono text-stone-500 text-center">
          stroke length: 12mm · ink: carbon
        </div>
      </div>
    ),
  },
  {
    id: "sentence",
    step: "03 / 06",
    title: "The Sentence",
    subtitle: "Cadence, rhythm, and intention",
    body: "One thought connects to the next. The voice sharpens, the argument forms, and language builds a bridge between two minds.",
    graphic: (
      <div className="relative w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84 bg-[#F5F4EF] rounded-sm shadow-2xl p-6 flex flex-col justify-between border border-[#E5E0D5] text-[#1a1917]">
        <div className="opacity-40 text-[9px] font-mono">CHAPTER ONE · DRAFT</div>
        <div className="space-y-3 font-serif text-sm sm:text-base leading-relaxed text-stone-800">
          <p className="indent-4">
            “It begins with a quiet realization: some things cannot remain only in the mind.”
          </p>
          <div className="h-0.5 w-12 bg-amber-500/60" />
          <p className="text-xs text-stone-500 font-sans italic">
            The syntax takes root.
          </p>
        </div>
        <div className="opacity-30 text-[9px] font-mono text-right">32 WORDS</div>
      </div>
    ),
  },
  {
    id: "manuscript",
    step: "04 / 06",
    title: "The Manuscript",
    subtitle: "Structure given to substance",
    body: "Hundreds of pages assembled into a unified architecture. Drafts questioned, refined, pruned, and sculpted into an authoritative whole.",
    graphic: (
      <div className="relative w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84">
        {/* Underlying stacked pages */}
        <div className="absolute inset-0 bg-[#E8E4DB] rounded-sm translate-x-3 translate-y-3 shadow-md border border-stone-400/40" />
        <div className="absolute inset-0 bg-[#EFECE3] rounded-sm translate-x-1.5 translate-y-1.5 shadow-md border border-stone-400/40" />
        {/* Top page */}
        <div className="relative w-full h-full bg-[#F5F4EF] rounded-sm shadow-2xl p-6 flex flex-col justify-between border border-[#E5E0D5] text-[#1a1917]">
          <div className="flex justify-between items-center text-[9px] font-mono text-stone-600">
            <span className="font-bold text-amber-700">TYPESCRIPT · REVISED</span>
            <span>240 PP</span>
          </div>
          <div className="space-y-2 text-center py-4">
            <div className="w-10 h-0.5 bg-stone-300 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-stone-900">COMPLETE DRAFT</h4>
            <p className="font-mono text-[10px] text-stone-500">READY FOR THE PRESS</p>
          </div>
          <div className="border-t border-stone-300/80 pt-2 flex justify-between text-[9px] font-mono text-stone-500">
            <span>PROOFED</span>
            <span>APPROVED</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "book",
    step: "05 / 06",
    title: "The Bound Book",
    subtitle: "The artifact made permanent",
    body: "Cloth casing, embossed spine, archival paper, and calibrated weight. A physical entity that commands presence in the physical world.",
    graphic: (
      <div className="relative w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84 rounded-r-md rounded-l-xs bg-gradient-to-r from-[#181716] to-[#252320] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-amber-500/40 p-6 flex flex-col justify-between text-left">
        <div className="w-2 absolute left-0 top-0 bottom-0 bg-black/60 border-r border-white/5 rounded-l-xs" />
        <div className="pl-3">
          <p className="font-mono text-[9px] tracking-[0.25em] text-amber-400/80 uppercase">LA OPEN BOOKS</p>
          <div className="w-6 h-px bg-amber-500/50 my-2" />
        </div>
        <div className="pl-3 space-y-1">
          <h5 className="font-serif text-xl sm:text-2xl text-white font-normal leading-tight">
            The Finished Volume
          </h5>
          <p className="text-[10px] font-mono text-stone-400 uppercase">Clothbound · Hardcover</p>
        </div>
        <div className="pl-3 text-[9px] font-mono text-stone-500 border-t border-white/10 pt-2 flex justify-between">
          <span>ARCHIVAL PRINT</span>
          <span className="text-amber-400/80">★</span>
        </div>
      </div>
    ),
  },
  {
    id: "shelf",
    step: "06 / 06",
    title: "The Shelf",
    subtitle: "An object that outlives the moment",
    body: "Placed in private libraries, living rooms, and world archives. The idea is no longer captive in a single head — it belongs to posterity.",
    graphic: (
      <div className="relative w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84 flex items-end justify-center pb-4">
        {/* Book shelf line */}
        <div className="absolute bottom-2 left-0 right-0 h-2 bg-[#2a2723] rounded-xs shadow-lg border-t border-amber-500/30" />
        
        {/* Standing Books */}
        <div className="flex items-end gap-1.5 z-10">
          <div className="w-7 h-44 bg-[#1e1c19] rounded-t-xs border border-white/10 shadow-md" />
          <div className="w-8 h-52 bg-[#2d2924] rounded-t-xs border border-white/10 shadow-md" />
          
          {/* Main Hero Book */}
          <div className="w-10 h-60 bg-gradient-to-t from-amber-900/60 to-amber-600/80 rounded-t-xs border border-amber-400/60 shadow-xl flex flex-col justify-between items-center py-4 text-center">
            <span className="font-mono text-[7px] text-amber-200 uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
              YOUR TITLE
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          </div>

          <div className="w-7 h-48 bg-[#1a1917] rounded-t-xs border border-white/10 shadow-md" />
          <div className="w-9 h-56 bg-[#25221d] rounded-t-xs border border-white/10 shadow-md" />
        </div>
      </div>
    ),
  },
];

export default function Scene3Metamorphosis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const stageCount = stages.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#060606] text-[#F5F0EB]"
      style={{ minHeight: `${stageCount * 110}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between p-6 md:p-12 overflow-hidden">
        
        {/* Top Section Header */}
        <header className="relative z-10 w-full max-w-4xl flex items-center justify-between border-b border-white/[0.08] pb-4 pt-2 text-[11px] font-mono tracking-[0.25em] text-stone-500 uppercase">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
            <span>The Transformation</span>
            <span className="text-stone-700">/</span>
            <span className="text-stone-400">Thought → Object</span>
          </div>
          <span className="hidden sm:inline text-stone-400 font-sans tracking-widest text-[10px]">
            ONE UNBROKEN ARC
          </span>
        </header>

        {/* Center: Stage Stage Display */}
        <main className="relative z-10 w-full max-w-4xl flex-1 flex items-center justify-center my-4">
          <div className="relative w-full h-[460px] md:h-[480px] flex items-center justify-center">
            {stages.map((stage, idx) => {
              const start = idx / stageCount;
              const end = (idx + 1) / stageCount;
              const mid = (start + end) / 2;

              const opacity = useTransform(
                scrollYProgress,
                [
                  Math.max(0, start - 0.04),
                  start + 0.04,
                  mid,
                  end - 0.04,
                  Math.min(1, end + 0.04),
                ],
                [0, 1, 1, 1, 0]
              );

              const y = useTransform(
                scrollYProgress,
                [
                  Math.max(0, start - 0.04),
                  start + 0.06,
                  end - 0.06,
                  Math.min(1, end + 0.04),
                ],
                [reduced ? 0 : 30, 0, 0, reduced ? 0 : -30]
              );

              const scale = useTransform(
                scrollYProgress,
                [
                  Math.max(0, start - 0.04),
                  start + 0.06,
                  end - 0.06,
                  Math.min(1, end + 0.04),
                ],
                [0.94, 1, 1, 0.94]
              );

              return (
                <motion.div
                  key={stage.id}
                  className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4"
                  style={{
                    opacity: reduced ? 1 : opacity,
                    y: reduced ? 0 : y,
                    scale: reduced ? 1 : scale,
                  }}
                >
                  {/* Left / Center: The Visual Graphic */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {stage.graphic}
                  </div>

                  {/* Right / Content Info */}
                  <div className="max-w-md space-y-4 text-center md:text-left">
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-amber-500 font-semibold block">
                      {stage.step} · {stage.subtitle}
                    </span>

                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight">
                      {stage.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-stone-400 leading-relaxed font-light">
                      {stage.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </main>

        {/* Bottom Bar: Multi-step Progress Bar */}
        <footer className="relative z-10 w-full max-w-4xl flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs text-stone-500">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {stages.map((_, i) => {
              const start = i / stageCount;
              const end = (i + 1) / stageCount;
              const barFill = useTransform(scrollYProgress, [start, end], [0, 1]);

              return (
                <div
                  key={i}
                  className="relative w-8 sm:w-12 h-1 bg-stone-800 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-amber-400 origin-left"
                    style={{ scaleX: reduced ? 1 : barFill }}
                  />
                </div>
              );
            })}
          </div>

          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-400">
            Scroll to progress
          </span>
        </footer>

      </div>
    </section>
  );
}
