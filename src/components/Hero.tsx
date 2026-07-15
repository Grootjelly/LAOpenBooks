"use client";

import { motion, useReducedMotion } from 'framer-motion';
import PopButton from '@/components/PopButton';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  
  const yVal = shouldReduceMotion ? 0 : 20;

  const fadeInVariants = {
    hidden: { opacity: 0, y: yVal },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: customDelay,
      }
    })
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen bg-black">
        {/* Hero GIF background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/hero-banner.gif"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-banner.mp4" type="video/mp4" />
          {/* Fallback to GIF if the user uploads a GIF instead */}
          <img src="/hero-banner.gif" alt="Hero background" className="absolute inset-0 w-full h-full object-cover" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/45" />
        {/* Optional decorative accents (kept subtle) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36 z-10 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div 
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 text-white text-xs font-medium tracking-wide mb-8 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-[gentle-pulse_2s_ease-in-out_infinite]" />
              INDEPENDENT PUBLISHER · LOS ANGELES
            </motion.div>

            {/* Heading */}
            <motion.h1 
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={0.25}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] tracking-tight mb-6 drop-shadow-lg font-serif"
            >
              An open book <br />
              <span className="text-amber-400 drop-shadow-md">is an open mind.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="text-xl md:text-2xl text-stone-200 leading-relaxed mb-10 max-w-2xl drop-shadow"
            >
              Discover the Bookendbook catalog — illustrated word search and activity books for curious minds: history, culture, and the world, one puzzle at a time.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={0.55}
              className="flex flex-wrap gap-4 mb-4"
            >
              <PopButton
                href="/books"
                className="inline-flex items-center gap-2"
              >
                Browse All Books
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </PopButton>
              <PopButton
                href="/about"
                variant="secondary"
                className="inline-flex items-center gap-2"
              >
                Our Story
              </PopButton>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
