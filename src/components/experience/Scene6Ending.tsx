"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";

// SVG path for the closing sentence (hand-lettered style)
// Using stroke-dashoffset to draw on scroll
const SENTENCE_PATH = `M 60,90 C 100,75 155,100 210,88 C 260,78 310,98 370,85 C 420,74 468,94 520,82 C 560,73 595,90 630,80
M 70,130 C 115,118 170,138 230,126 C 280,116 325,134 380,122 C 428,112 468,130 510,120
M 80,170 C 128,158 184,176 245,165 C 298,155 344,172 400,162 C 445,154 482,170 520,160`;

// Signature path — a flowing cursive stroke
const SIGNATURE_PATH =
  "M 200,230 C 230,210 270,240 300,225 C 335,208 365,238 400,222 C 430,208 460,232 490,218 C 510,210 525,228 540,220 L 545,218";

export default function Scene6Ending() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Writing sentence: draws from 10%→60% of section scroll
  const sentenceLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  // Signature: draws from 65%→85%
  const signatureLength = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);

  // CTA reveals after signature is mostly drawn
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.82, 0.95], [reduced ? 0 : 20, 0]);

  // Page fills in from dark → cream as section enters
  const pageOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const darkOverlay = useTransform(scrollYProgress, [0.04, 0.14], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[280vh] bg-[#060606]"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Dark-to-paper transition overlay */}
        <motion.div
          className="absolute inset-0 bg-[#060606] pointer-events-none z-10"
          style={{ opacity: darkOverlay }}
        />

        {/* The paper page */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: pageOpacity,
            background: "linear-gradient(160deg, #F7F6F2 0%, #EFEDE7 100%)",
          }}
        >
          {/* Subtle paper grain */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "160px",
            }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-8"
          style={{ opacity: pageOpacity }}
        >
          {/* Section label */}
          <motion.p
            className="text-stone-400 text-[10px] tracking-[0.4em] uppercase font-mono mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            your chapter
          </motion.p>

          {/* SVG writing surface */}
          <div className="w-full">
            <svg
              viewBox="0 0 700 280"
              className="w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* The sentence — draws on scroll */}
              {reduced ? (
                <path
                  d={SENTENCE_PATH}
                  fill="none"
                  stroke="#1C1A17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
              ) : (
                <motion.path
                  d={SENTENCE_PATH}
                  fill="none"
                  stroke="#1C1A17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  style={{ pathLength: sentenceLength, opacity: 0.8 }}
                />
              )}

              {/* Signature line */}
              <line
                x1="180"
                y1="242"
                x2="560"
                y2="242"
                stroke="#C8C2B4"
                strokeWidth="0.75"
                strokeDasharray="4 4"
              />
              <text
                x="180"
                y="258"
                fill="#C8C2B4"
                fontSize="8"
                fontFamily="monospace"
                letterSpacing="2"
              >
                × ─────────────────────────────────────────────
              </text>

              {/* The signature path — draws after sentence */}
              {reduced ? (
                <path
                  d={SIGNATURE_PATH}
                  fill="none"
                  stroke="#1C1A17"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.75"
                />
              ) : (
                <motion.path
                  d={SIGNATURE_PATH}
                  fill="none"
                  stroke="#1C1A17"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  style={{ pathLength: signatureLength, opacity: 0.75 }}
                />
              )}
            </svg>

            {/* Readable text version (accessible) */}
            <p className="sr-only">
              The next chapter has always been yours to write.
            </p>
          </div>

          {/* The single CTA — appears only after the signature */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-4"
            style={{
              opacity: reduced ? 1 : ctaOpacity,
              y: reduced ? 0 : ctaY,
            }}
          >
            <Link
              href="/books"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#1C1A17] text-[#F5F4EF] font-serif text-base tracking-wide hover:bg-[#2c2925] transition-colors duration-500 rounded-sm shadow-lg"
            >
              <span>Begin Your Legacy</span>
              <svg
                className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              {/* Letterpress inset effect */}
              <span className="absolute inset-0 rounded-sm border border-[#F5F4EF]/10 pointer-events-none" />
            </Link>

            <p className="text-stone-500 text-xs tracking-widest font-mono">
              Explore the Bookendbook catalog →
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
