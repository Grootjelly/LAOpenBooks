"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function Scene2Dissolve() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Ghost dictionary UI dissolving
  const dictUiOpacity = useTransform(scrollYProgress, [0, 0.35], [0.9, 0]);
  const dictUiScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.08]);
  const dictUiBlur = useTransform(scrollYProgress, [0, 0.35], ["blur(0px)", "blur(14px)"]);

  // 2. Physical book emergence
  const bookOpacity = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);
  const bookScale = useTransform(scrollYProgress, [0.25, 0.7], [0.85, 1]);
  const bookRotateX = useTransform(scrollYProgress, [0.25, 0.7], [20, 0]);
  const bookRotateY = useTransform(scrollYProgress, [0.25, 0.7], [-15, 0]);
  const bookY = useTransform(scrollYProgress, [0.25, 0.6], [60, 0]);

  // 3. Typography statements emergence
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 0.85], [30, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[300vh] bg-[#060606] text-[#F5F0EB]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
        
        {/* Background Radial Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent blur-[140px]" />
        </div>

        {/* ── PHASE 1: GHOST DICTIONARY DISSOLVING ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8 z-10"
          style={{
            opacity: reduced ? 0 : dictUiOpacity,
            scale: reduced ? 1 : dictUiScale,
            filter: reduced ? "none" : dictUiBlur,
          }}
        >
          <div className="w-full max-w-2xl border border-white/10 rounded-sm p-8 bg-black/40 backdrop-blur-sm text-stone-600 font-mono text-xs space-y-4 select-none">
            <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] tracking-widest uppercase">
              <span>Lexicon Interface</span>
              <span>Deconstructing...</span>
            </div>
            <div className="font-serif text-3xl text-stone-500">book /bʊk/ n.</div>
            <p className="text-stone-600 italic">“An idea made tangible...”</p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
            <p className="text-[11px] text-stone-700 font-sans tracking-wide">
              No further definitions required. The artifact has arrived.
            </p>
          </div>
        </motion.div>

        {/* ── PHASE 2: THE PHYSICAL OBJECT MATERIALIZES ── */}
        <div className="relative z-20 flex flex-col items-center max-w-4xl w-full text-center py-4">
          
          {/* Section Subtitle */}
          <motion.div
            className="mb-4 md:mb-6 font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-amber-500/90"
            style={{ opacity: reduced ? 1 : textOpacity, y: reduced ? 0 : textY }}
          >
            The Dissolution of Definitions
          </motion.div>

          {/* 3D Physical Book Graphic */}
          <motion.div
            className="relative mb-6 md:mb-8 select-none"
            style={{
              opacity: reduced ? 1 : bookOpacity,
              scale: reduced ? 1 : bookScale,
              rotateX: reduced ? 0 : bookRotateX,
              rotateY: reduced ? 0 : bookRotateY,
              y: reduced ? 0 : bookY,
              perspective: 1000,
            }}
          >
            {/* Ambient Book Aura */}
            <div className="absolute -inset-8 bg-amber-500/15 blur-3xl rounded-full -z-10 pointer-events-none" />

            {/* Book Object Container */}
            <div className="relative w-44 h-64 sm:w-52 sm:h-76 md:w-56 md:h-80 rounded-r-md rounded-l-sm bg-gradient-to-tr from-[#161514] via-[#24221f] to-[#121110] border-t border-r border-b border-amber-500/30 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.1)] flex flex-col justify-between p-5 md:p-6 text-left transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Spine edge highlight */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/80 via-white/5 to-transparent border-r border-black/40 rounded-l-sm" />
              
              {/* Foil Stamp Top Header */}
              <div className="pl-3">
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-amber-400/70">
                  LA Open Books
                </p>
                <div className="w-6 h-px bg-amber-500/40 my-2" />
              </div>

              {/* Book Title & Monogram */}
              <div className="pl-3 space-y-1.5">
                <h3 className="font-serif text-xl sm:text-2xl text-[#f5f0eb] tracking-wide font-normal leading-tight">
                  The Tangible<br />
                  <span className="italic text-amber-300 font-light">Artifact</span>
                </h3>
                <p className="text-[10px] text-stone-400 font-sans tracking-wider uppercase pt-1">
                  First Edition · Folio
                </p>
              </div>

              {/* Bottom Colophon Mark */}
              <div className="pl-3 flex items-center justify-between border-t border-white/[0.08] pt-2 text-[9px] font-mono text-stone-500">
                <span>EST. LOS ANGELES</span>
                <div className="w-1.5 h-1.5 rounded-full border border-amber-400/80 bg-amber-500/30" />
              </div>

              {/* Subtle Page Edge Deckle on the right */}
              <div className="absolute right-0 top-1 bottom-1 w-1 bg-gradient-to-b from-[#e8e4db] via-[#dcd7cb] to-[#cec8b9] rounded-r-xs opacity-70 shadow-inner" />
            </div>

            {/* Cast Shadow */}
            <div className="absolute -bottom-6 left-4 right-4 h-5 bg-black/80 blur-lg rounded-full -z-10" />
          </motion.div>

          {/* ── Core Manifesto Statements ── */}
          <motion.div
            className="space-y-3 md:space-y-4 max-w-2xl px-4"
            style={{ opacity: reduced ? 1 : textOpacity, y: reduced ? 0 : textY }}
          >
            <h2 className="font-serif text-xl sm:text-2xl md:text-4xl text-stone-200 font-light leading-snug">
              The dictionary defines things using words.
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl md:text-4xl text-amber-300 font-normal leading-snug">
              We take those words off the screen and put them into the world.
            </p>

            <div className="pt-2">
              <p className="font-sans text-xs sm:text-sm md:text-base text-stone-400 tracking-wide max-w-xl mx-auto leading-relaxed border-t border-white/10 pt-4">
                We turn ideas into books, and books into something worth remembering.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
