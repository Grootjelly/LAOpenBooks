"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface Definition {
  word: string;
  phonetic: string;
  pos: string;
  primary: string;
  secondary: string;
  origin: string;
}

const definitions: Definition[] = [
  {
    word: "idea",
    phonetic: "/aɪˈdɪə/",
    pos: "noun",
    primary: "Something that exists first only in the mind.",
    secondary: "An unformed impulse, conviction, or vision awaiting physical embodiment.",
    origin: "Greek idein, 'to see'. An invisible form seeking manifestation.",
  },
  {
    word: "manuscript",
    phonetic: "/ˈmænjʊskrɪpt/",
    pos: "noun",
    primary: "An idea given structure.",
    secondary: "Thought transcribed into language, cadence, chapters, and deliberate order.",
    origin: "Latin manu scriptus, 'written by hand'. The bridge between mind and artifact.",
  },
  {
    word: "book",
    phonetic: "/bʊk/",
    pos: "noun",
    primary: "An idea made tangible.",
    secondary: "A permanent physical object crafted to outlive the mind that conceived it.",
    origin: "Old English bōc. A vessel of paper, cloth, and ink resting in the world.",
  },
];

export default function Scene1Dictionary() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active definition based on scroll progress (0.0 to 1.0)
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.35) {
        setActiveWordIndex(0);
      } else if (latest < 0.7) {
        setActiveWordIndex(1);
      } else {
        setActiveWordIndex(2);
      }
    });
  }, [scrollYProgress]);

  // Subtle background scale & opacity shifts
  const bgGlowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.25, 0.18]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[320vh] bg-[#060606] text-[#F5F0EB]"
    >
      {/* Sticky presentation viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between p-6 md:p-12 overflow-hidden select-none">
        
        {/* Subtle Ambient Background Light */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: bgGlowOpacity }}
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-amber-600/20 to-amber-400/5 blur-[120px]" />
          <div className="absolute bottom-10 left-1/4 w-[360px] h-[360px] rounded-full bg-amber-900/10 blur-[100px]" />
        </motion.div>

        {/* Top Folio / Header */}
        <header className="relative z-10 w-full max-w-4xl flex items-center justify-between border-b border-white/[0.08] pb-4 pt-2 text-[11px] font-mono tracking-[0.25em] text-stone-500 uppercase">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 animate-pulse" />
            <span>LA Open Books</span>
            <span className="text-stone-700">/</span>
            <span className="text-stone-400">Lexicon</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>Entry 0{activeWordIndex + 1} of 03</span>
            <span className="text-stone-700">·</span>
            <span className="text-stone-400 font-sans tracking-widest text-[10px]">
              {activeWordIndex === 0 ? "THOUGHT" : activeWordIndex === 1 ? "STRUCTURE" : "OBJECT"}
            </span>
          </div>
        </header>

        {/* Center: The Dictionary Card */}
        <main className="relative z-10 w-full max-w-3xl flex-1 flex flex-col justify-center py-6">
          <div className="relative min-h-[360px] md:min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              {(() => {
                const item = definitions[activeWordIndex];
                return (
                  <motion.div
                    key={item.word}
                    initial={
                      reduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: 20, filter: "blur(10px)" }
                    }
                    animate={
                      reduced
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, filter: "blur(0px)" }
                    }
                    exit={
                      reduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: -20, filter: "blur(10px)" }
                    }
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-full flex flex-col justify-center"
                  >
                    {/* Word Title & Pronunciation */}
                    <div className="flex flex-wrap items-baseline gap-3 md:gap-5 mb-6">
                      <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tight text-white font-normal">
                        {item.word}
                      </h1>
                      <span className="font-mono text-stone-400 text-sm md:text-lg tracking-wider">
                        {item.phonetic}
                      </span>
                      <span className="font-serif italic text-amber-400/90 text-base md:text-xl font-normal">
                        {item.pos}.
                      </span>
                    </div>

                    {/* Primary Definition */}
                    <div className="space-y-4 max-w-2xl border-l border-amber-500/40 pl-6 my-2">
                      <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-100 font-light leading-snug">
                        <span className="font-mono text-xs text-amber-500/80 mr-3 align-middle">
                          1.
                        </span>
                        {item.primary}
                      </p>

                      <p className="font-sans text-stone-400 text-sm sm:text-base leading-relaxed pl-6">
                        {item.secondary}
                      </p>
                    </div>

                    {/* Etymology / Footnote */}
                    <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-stone-500 font-mono">
                      <span className="italic text-stone-400">
                        [{item.origin}]
                      </span>
                      <span className="tracking-widest uppercase text-[10px] text-stone-600">
                        Definition {activeWordIndex + 1} of 3
                      </span>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </main>

        {/* Bottom Bar & Scroll Indicator */}
        <footer className="relative z-10 w-full max-w-4xl flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs text-stone-500">
          {/* Progress Indicators */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-500 rounded-full ${
                  activeWordIndex === i
                    ? "w-8 bg-amber-400"
                    : "w-2 bg-stone-800"
                }`}
              />
            ))}
          </div>

          {/* Scroll Guide */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-stone-400">
              Scroll to give form
            </span>
            <div className="w-5 h-8 rounded-full border border-stone-700 flex items-start justify-center p-1">
              <motion.div
                className="w-1 h-2 rounded-full bg-amber-400"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </footer>

      </div>
    </section>
  );
}
