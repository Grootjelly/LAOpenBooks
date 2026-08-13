"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Scene5Resolution() {
  return (
    <section className="relative bg-[#060606] text-[#F5F0EB] py-32 md:py-48 px-6 overflow-hidden">
      
      {/* Background Ambient Radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-t from-amber-600/10 via-amber-900/5 to-transparent blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-12">
        
        {/* Studio Monogram / Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center shadow-lg shadow-amber-950/40"
        >
          <span className="font-serif text-2xl text-amber-300 font-bold tracking-tighter">
            LA
          </span>
        </motion.div>

        {/* The Final Resonance */}
        <div className="space-y-6 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs tracking-[0.35em] uppercase text-amber-500/90"
          >
            The Resolution
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight"
          >
            Some ideas shouldn&apos;t remain ideas.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-amber-300 font-light leading-snug"
          >
            LA Open Books helps turn them into books.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-sm sm:text-base text-stone-400 max-w-xl mx-auto pt-4 leading-relaxed"
          >
            For people who have something in their head that deserves to exist outside of it.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-6 w-full max-w-md justify-center"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-sans text-sm font-semibold tracking-wide rounded-sm transition-all duration-300 shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 group"
          >
            <span>Begin Your Book</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <Link
            href="/books"
            className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-white/40 text-stone-300 hover:text-white font-sans text-sm font-medium tracking-wide rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Explore The Catalog</span>
          </Link>
        </motion.div>

        {/* Studio Colophon & Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-16 border-t border-white/[0.08] w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between text-stone-600 text-xs font-mono gap-4"
        >
          <span>LA OPEN BOOKS · PUBLISHING STUDIO</span>
          <span>LOS ANGELES, CALIFORNIA</span>
        </motion.div>

      </div>
    </section>
  );
}
