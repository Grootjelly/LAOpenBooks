"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "framer-motion";

// A flowing cursive-style ink path across the notebook canvas
// Designed to look like a thought being written across four lines
const INK_PATH = [
  // Line 1 — a sweeping opening stroke
  "M 68,118 C 110,102 165,130 230,115 C 285,103 335,128 400,113 C 455,101 510,122 565,110 C 610,100 648,118 688,108",
  // Line 2 — continues the thought, more hesitant
  "M 78,168 C 125,154 190,175 260,162 C 320,151 375,172 440,160 C 500,150 548,168 600,158 C 638,150 665,165 695,156",
  // Line 3 — growing confidence
  "M 72,218 C 130,205 205,225 280,212 C 345,200 410,220 480,208 C 535,198 580,215 625,204 C 660,196 684,212 706,203",
  // Line 4 — the trailing off
  "M 82,268 C 148,257 215,272 290,262 C 355,253 415,268 470,259 C 515,253 548,265 580,258",
].join(" ");

// Nib cursor SVG markup
const NIB_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5 4.5L14 11M14 11L9 20L4 4L20 9L14 11Z" stroke="#1C1A17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="14" cy="11" r="1" fill="#1C1A17"/>
</svg>`;

export default function Scene2Notebook() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const notebookRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  // Mouse cursor tracking
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useSpring(0, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    const el = notebookRef.current;
    if (!el || reduced) return;

    const onMove = (e: MouseEvent) => handleMouseMove(e);
    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [handleMouseMove, reduced]);

  // Scroll-linked drawing — ties the ink draw to scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  // pathLength drives stroke-dashoffset via Framer Motion's SVG optimisation
  const inkPathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  // Notebook page rise on entry
  const pageY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);
  const pageOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[220vh] bg-[#060606]"
      style={{ cursor: isHovering && !reduced ? "none" : "auto" }}
    >
      {/* Custom ink-nib cursor — only visible on hover */}
      {!reduced && (
        <motion.div
          className="fixed z-[100] pointer-events-none"
          style={{ x: cursorX, y: cursorY, opacity: isHovering ? 1 : 0 }}
          transition={{ opacity: { duration: 0.2 } }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5 4.5L14 11M14 11L9 20L4 4L20 9L14 11Z"
              stroke="#F5F4EF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="14" cy="11" r="1.2" fill="#F5F4EF" />
          </svg>
        </motion.div>
      )}

      {/* Sticky canvas — notebook stays centered while section scrolls */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-16">
        {/* Section label */}
        <motion.p
          className="text-stone-600 text-[10px] tracking-[0.4em] uppercase font-mono mb-8"
          style={{ opacity: pageOpacity }}
        >
          your first mark
        </motion.p>

        {/* The notebook page */}
        <motion.div
          ref={notebookRef}
          className="relative w-full max-w-2xl"
          style={{ y: reduced ? 0 : pageY, opacity: reduced ? 1 : pageOpacity }}
        >
          {/* Paper */}
          <div
            className="relative w-full rounded-[2px] overflow-hidden"
            style={{
              background: "#F5F4EF",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.5), 0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.06)",
              minHeight: "380px",
            }}
          >
            {/* Subtle paper grain via CSS */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundRepeat: "repeat",
                backgroundSize: "128px",
              }}
            />

            {/* Horizontal lines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 49px, #c4bdb2 49px, #c4bdb2 50px)",
                backgroundSize: "100% 50px",
                backgroundPositionY: "70px",
                opacity: 0.35,
              }}
            />

            {/* Left red margin */}
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{ left: "72px", background: "rgba(200, 80, 80, 0.25)" }}
            />

            {/* Top crease line */}
            <div className="absolute top-[68px] left-0 right-0 h-px bg-[#c4bdb2]/20" />

            {/* The ink drawing — SVG path driven by scroll */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 760 380"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Ink drop / starting blot */}
              <motion.circle
                cx="68"
                cy="118"
                r="3"
                fill="#1C1A17"
                initial={{ scale: 0, opacity: 0 }}
                style={{
                  scale: reduced ? 1 : useTransform(scrollYProgress, [0.03, 0.1], [0, 1]),
                  opacity: reduced ? 1 : useTransform(scrollYProgress, [0.03, 0.08], [0, 0.85]),
                }}
              />

              {/* Main ink path */}
              {reduced ? (
                <path
                  d={INK_PATH}
                  fill="none"
                  stroke="#1C1A17"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
              ) : (
                <motion.path
                  d={INK_PATH}
                  fill="none"
                  stroke="#1C1A17"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  style={{ pathLength: inkPathLength, opacity: 0.85 }}
                />
              )}
            </svg>

            {/* Content spacer */}
            <div className="relative z-10 p-8 pl-[88px] min-h-[380px]" />
          </div>

          {/* Page shadow lift */}
          <div
            className="absolute -bottom-6 left-6 right-6 h-10 rounded-full"
            style={{
              background: "rgba(0,0,0,0.35)",
              filter: "blur(16px)",
            }}
          />

          {/* Page hint copy */}
          <motion.p
            className="mt-8 text-center text-stone-600 text-xs tracking-[0.25em] font-sans uppercase"
            style={{
              opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
            }}
          >
            keep scrolling
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
