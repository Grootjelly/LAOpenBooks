"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import PopButton from './PopButton';
import InstagramTooltip from './InstagramTooltip';

export default function GetInTouch() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax translation for the background image
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  // Zoom scale animation on scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
  // Fade range to ensure text remains readable and image glows into view
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.15, 0.35, 0.35, 0.15]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-28 px-6 bg-[#070707] overflow-hidden border-t border-white/[0.06] z-10"
    >
      {/* Halftone BG Image Container with Scroll Animations */}
      <motion.div 
        style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
      >
        <Image 
          src="/images/get-in-touch-bg.png" 
          alt="Hands and book halftone artwork background" 
          fill 
          priority
          className="object-cover object-center"
        />
        {/* Soft edge-blending gradients to merge with background color */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-transparent to-[#070707]" />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative max-w-3xl mx-auto text-center z-10">
        <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4 animate-pulse">Get In Touch</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Want to say hello?
        </h2>
        
        {/* Slogan + Brief Concept */}
        <p className="text-lg text-stone-300 mb-10 max-w-xl mx-auto leading-relaxed font-light">
          An open book is an open mind. Whether you want to collaborate on a new publishing project, share feedback on our digital creations, or simply connect — we&apos;d love to hear from you.
        </p>

        <PopButton
          href="/contact"
          className="inline-flex items-center gap-2 shadow-lg shadow-amber-500/10"
        >
          Send a Message
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </PopButton>

        {/* Social Media Tooltips/Links */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-xs text-stone-500 uppercase tracking-widest">Connect with us</p>
          <div className="flex justify-center items-center gap-6">
            <InstagramTooltip />
            {/* Placeholder for future links */}
          </div>
        </div>
      </div>
    </section>
  );
}
