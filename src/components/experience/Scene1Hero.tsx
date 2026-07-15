"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";

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
  const [isInSection, setIsInSection] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // ── Mouse tracking ────────────────────────────────────────────────
  const rawX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 500
  );
  const rawY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 400
  );

  // Large aura: very slow spring — dreamy drift
  const auraX = useSpring(rawX, { stiffness: 30, damping: 25, mass: 2 });
  const auraY = useSpring(rawY, { stiffness: 30, damping: 25, mass: 2 });

  // Small dot: fast spring — snappy but smooth
  const dotX = useSpring(rawX, { stiffness: 280, damping: 28 });
  const dotY = useSpring(rawY, { stiffness: 280, damping: 28 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    },
    [rawX, rawY]
  );

  useEffect(() => {
    if (reduced) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, reduced]);

  // ── Scroll hint timer ─────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(
      () => setScrollHint(true),
      reduced ? 2000 : 7500
    );
    return () => clearTimeout(timer);
  }, [reduced]);

  // ── Detect if mouse is inside this section ────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onEnter = () => setIsInSection(true);
    const onLeave = () => setIsInSection(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#060606] overflow-hidden px-6"
      style={{ cursor: isInSection && !reduced ? "none" : "auto" }}
    >
      {/* ── Large pulsing amber aura ──────────────────────────────── */}
      {!reduced ? (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            x: auraX,
            y: auraY,
            translateX: "-50%",
            translateY: "-50%",
            top: 0,
            left: 0,
          }}
        >
          {/* Outer slow pulse ring */}
          <motion.div
            className="rounded-full"
            animate={{
              width: ["340px", "400px", "340px"],
              height: ["340px", "400px", "340px"],
              opacity: [0.18, 0.28, 0.18],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(251,146,60,0.55) 0%, rgba(245,158,11,0.22) 35%, transparent 70%)",
              filter: "blur(60px)",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Inner bright core */}
          <motion.div
            className="rounded-full"
            animate={{
              width: ["120px", "160px", "120px"],
              height: ["120px", "160px", "120px"],
              opacity: [0.65, 0.9, 0.65],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: 0.5,
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(251,146,60,1) 0%, rgba(245,158,11,0.6) 50%, transparent 80%)",
              filter: "blur(28px)",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      ) : (
        /* Reduced motion — static centered glow */
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 500px 400px at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%)",
          }}
        />
      )}

      {/* ── Small amber dot cursor ────────────────────────────────── */}
      {!reduced && (
        <motion.div
          className="fixed pointer-events-none z-[200]"
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="rounded-full border border-amber-400/80"
            animate={{
              width: ["10px", "14px", "10px"],
              height: ["10px", "14px", "10px"],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(251,146,60,0.9) 0%, rgba(245,158,11,0.5) 60%, transparent 100%)",
              boxShadow: "0 0 8px rgba(251,146,60,0.6), 0 0 20px rgba(245,158,11,0.2)",
            }}
          />
        </motion.div>
      )}

      {/* ── Text stack ───────────────────────────────────────────── */}
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

      {/* ── Scroll indicator ─────────────────────────────────────── */}
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
