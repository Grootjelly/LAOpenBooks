"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const lines = [
  { text: "Every idea begins as a whisper.", delay: 0.6 },
  {
    text: "Some become businesses.\nSome become books.\nSome change lives.",
    delay: 2.8,
    multiline: true,
  },
  { text: "Which one is yours?", delay: 5.4, amber: true },
];

function BreathLine({
  text,
  delay,
  multiline,
  amber,
  reduced,
}: {
  text: string;
  delay: number;
  multiline?: boolean;
  amber?: boolean;
  reduced?: boolean;
}) {
  const parts = multiline ? text.split("\n") : [text];

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", y: 10 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{
        duration: reduced ? 0.4 : 1.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: reduced ? delay * 0.3 : delay,
      }}
      className="text-center"
    >
      {parts.map((part, i) => (
        <p
          key={i}
          className={`font-serif leading-relaxed ${
            amber
              ? "text-amber-300 text-2xl md:text-4xl lg:text-5xl tracking-wide"
              : multiline
              ? "text-stone-300 text-lg md:text-2xl lg:text-3xl"
              : "text-white/90 text-2xl md:text-4xl lg:text-5xl"
          }`}
        >
          {amber ? (
            <>
              {part}
              <motion.span
                className="block mx-auto mt-3 h-px bg-amber-400/60"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{
                  delay: reduced ? delay * 0.3 + 0.3 : delay + 1.2,
                  duration: reduced ? 0.5 : 1.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ display: "block" }}
              />
            </>
          ) : (
            part
          )}
        </p>
      ))}
    </motion.div>
  );
}

export default function Scene1Hero() {
  const reduced = useReducedMotion() ?? false;
  const [scrollHint, setScrollHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Show scroll hint after all lines have appeared
  useEffect(() => {
    const timer = setTimeout(
      () => setScrollHint(true),
      reduced ? 2000 : 7500
    );
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#060606] overflow-hidden px-6"
    >
      {/* Ambient breathing glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={reduced ? {} : {
          background: [
            "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(245,158,11,0.03) 0%, transparent 70%)",
            "radial-gradient(ellipse 640px 440px at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)",
            "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(245,158,11,0.03) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Text stack */}
      <div className="relative z-10 flex flex-col items-center gap-10 max-w-3xl w-full">
        {lines.map((line) => (
          <BreathLine
            key={line.text}
            text={line.text}
            delay={line.delay}
            multiline={line.multiline}
            amber={line.amber}
            reduced={reduced}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollHint ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <span className="text-stone-500 text-[10px] tracking-[0.3em] uppercase font-sans">
          scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-stone-600 to-transparent"
          animate={reduced ? {} : { scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
