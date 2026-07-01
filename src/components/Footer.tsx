"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

interface FooterProps {
  className?: string;
  images?: string[];
  title?: string[];
  subtitle?: string[];
  paragraphs?: string[][];
  navEmail?: string;
  footerText?: string;
}

const config = {
  marqueeScrollSpeed: 180,
  stripFollowEase: 0.05,
  stripEdgeInset: 175,
  contentRiseRate: 0.85,
  risenTopGap: 100,
  liftHeadStart: 125,
  wakeStrength: 2.5,
  wakeReach: 125,
  lineSettleEase: 0.09,
};

const DEFAULT_IMAGES = [
  "/images/books/coloring-anime.png",
  "/images/books/fantasy-creatures.png",
  "/images/books/whispers-in-the-shadows.png",
  "/images/books/engineering-inventions.png",
  "/images/books/bombs-and-nukes.png",
  "/images/books/powerful-women.png",
  "/images/books/believers.png",
  "/images/books/history-search.png"
];

const DEFAULT_TITLE = ["LAOpenBooks"];
const DEFAULT_SUBTITLE = ["INDEPENDENT PUBLISHER", "LOS ANGELES"];
const DEFAULT_PARAGRAPHS = [
  [
    "LAOpenBooks is an independent publisher",
    "specializing in coloring books, non-fiction,",
    "poetry, and digital applications.",
  ],
  [
    "We prioritize premium physical prints and engaging",
    "digital interactive web tools. Based in LA, we",
    "push the boundaries of traditional publishing by",
    "blending art, code, and storytelling into tactile",
    "and magical experiences."
  ]
];

export function Footer({
  className,
  images = DEFAULT_IMAGES,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  paragraphs = DEFAULT_PARAGRAPHS,
  navEmail = "oppyinmars@gmail.com",
  footerText = "© 2026 LAOpenBooks. All rights reserved. Made with ♥ in Los Angeles. We navigate in no-nonsense environments pushing the boundaries of publishing and web design.",
}: FooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeStripRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // State to hold cloned images to fill width
  const [clonedImages, setClonedImages] = useState<string[]>(images);

  useEffect(() => {
    if (!marqueeTrackRef.current || !marqueeStripRef.current || !containerRef.current || !contentWrapperRef.current) return;

    const marqueeTrack = marqueeTrackRef.current;

    // infinite horizontal marquee with GSAP
    const isMobile = window.innerWidth < 768;
    const itemWidth = isMobile ? 140 : 180;
    const gap = 16;
    const oneSetWidth = images.length * (itemWidth + gap);
    const setsNeeded = Math.ceil(window.innerWidth / oneSetWidth) + 2;
    
    const newImages = [];
    for (let i = 0; i < setsNeeded; i++) {
      newImages.push(...images);
    }
    setClonedImages(newImages);

    // Wait for React to render clones, then animate
    const ctx = gsap.context(() => {
      setTimeout(() => {
         gsap.to(marqueeTrack, {
           x: `-${oneSetWidth}px`,
           duration: oneSetWidth / config.marqueeScrollSpeed,
           ease: "none",
           repeat: -1,
           modifiers: {
             x: (x) => `${gsap.utils.wrap(-oneSetWidth, 0, parseFloat(x))}px`
           }
         });
      }, 100);
    }, marqueeTrack);

    return () => ctx.revert();
  }, [images]);

  // Wake effect logic
  useEffect(() => {
    if (!containerRef.current || !marqueeStripRef.current || !contentWrapperRef.current) return;

    const spotlightSection = containerRef.current;
    const marqueeStrip = marqueeStripRef.current;

    let stripHeight = marqueeStrip.offsetHeight;
    let sectionHeight = 0;
    let stripRestCenterY = 0;
    let contentTopAtRest = 0;

    let stripTargetY = 0;
    let stripCurrentY = 0;
    let stripPrevY = 0;
    let hasPointerMoved = false;

    let targets: { el: HTMLElement; restCenterY: number; currentY: number }[] = [];
    let rafId: number;

    const measureGeometry = () => {
      sectionHeight = spotlightSection.getBoundingClientRect().height;
      marqueeStrip.offsetTop;
      stripHeight = marqueeStrip.offsetHeight;
      
      stripRestCenterY = config.stripEdgeInset;
      
      const elements = Array.from(spotlightSection.querySelectorAll('.wake-target')) as HTMLElement[];
      
      let blockTop = Infinity;
      targets = elements.map(el => {
        let y = 0;
        let node: HTMLElement | null = el;
        while (node && node !== spotlightSection) {
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement;
        }
        const restCenterY = y + el.offsetHeight / 2;
        blockTop = Math.min(blockTop, restCenterY - el.offsetHeight / 2);
        
        return {
          el,
          restCenterY,
          currentY: 0
        };
      });

      contentTopAtRest = isFinite(blockTop) ? blockTop : sectionHeight * 0.4;
      
      if (!hasPointerMoved) {
        const restY = config.stripEdgeInset - stripHeight / 2;
        stripTargetY = restY;
        stripCurrentY = restY;
        stripPrevY = restY;
        gsap.set(marqueeStrip, { y: stripCurrentY });
      }
    };

    setTimeout(measureGeometry, 100);
    window.addEventListener('resize', measureGeometry);

    const handlePointerMove = (e: MouseEvent) => {
      hasPointerMoved = true;
      const rect = spotlightSection.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      stripTargetY = pointerY - stripHeight / 2;
    };

    const handlePointerLeave = () => {
      hasPointerMoved = false;
      stripTargetY = config.stripEdgeInset - stripHeight / 2;
    };

    spotlightSection.addEventListener('mousemove', handlePointerMove);
    spotlightSection.addEventListener('mouseleave', handlePointerLeave);

    const render = () => {
      stripCurrentY += (stripTargetY - stripCurrentY) * config.stripFollowEase;
      gsap.set(marqueeStrip, { y: stripCurrentY });

      const stripCenterY = stripCurrentY + stripHeight / 2;
      const stripVelocityY = stripCurrentY - stripPrevY;
      stripPrevY = stripCurrentY;

      const descentBelowRest = Math.max(0, stripCenterY - stripRestCenterY);
      const maxRise = Math.max(0, contentTopAtRest - config.risenTopGap);
      const contentRise = -Math.min(
        descentBelowRest * config.contentRiseRate,
        maxRise
      );

      targets.forEach(line => {
        const gapToStrip = line.restCenterY - stripCenterY;
        const reachedLine = stripCenterY + config.liftHeadStart >= line.restCenterY;
        
        const wakeInfluence = Math.exp(
          -(gapToStrip * gapToStrip) / (2 * config.wakeReach * config.wakeReach)
        );
        const wakeOffset = stripVelocityY * wakeInfluence * config.wakeStrength;
        
        const lineTarget = (reachedLine ? contentRise : 0) + wakeOffset;
        
        line.currentY += (lineTarget - line.currentY) * config.lineSettleEase;
        gsap.set(line.el, { y: line.currentY });
      });

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', measureGeometry);
      spotlightSection.removeEventListener('mousemove', handlePointerMove);
      spotlightSection.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      className={cn(
        instrumentSans.variable,
        instrumentSerif.variable,
        "spotlight relative w-full h-[100vh] min-h-[800px] overflow-hidden bg-[#0a0a0a] text-white font-sans border-t border-white/[0.06]",
        className
      )}
      style={{ fontFamily: "var(--font-instrument-sans), sans-serif" }}
    >

      {/* Marquee Strip */}
      <div 
        ref={marqueeStripRef} 
        className="spotlight-marquee absolute left-0 w-full z-20 h-[190px] md:h-[240px] pointer-events-none"
        style={{ top: 0 }} 
      >
        <div 
          ref={marqueeTrackRef} 
          className="spotlight-marquee-track flex gap-4 h-full items-center absolute top-0 left-0"
        >
          {clonedImages.map((img, idx) => (
            <div key={idx} className="w-[140px] h-[170px] md:w-[180px] md:h-[220px] shrink-0 rounded-[20px] overflow-hidden shadow-2xl bg-neutral-900 border border-white/[0.06]">
              <img
                src={img}
                alt="Book cover marquee item"
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div 
        ref={contentWrapperRef}
        className="spotlight-content-wrapper relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 z-30 pointer-events-none mix-blend-difference"
      >
        {/* Title */}
        <h1 
          className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-normal leading-[0.85] tracking-tighter mb-20 text-center flex flex-col items-center"
          style={{ fontFamily: "var(--font-instrument-serif), serif" }}
        >
          {title.map((line, idx) => (
            <div key={idx} className="wake-target inline-block relative">
              LAOpen<span className="text-amber-500">Books</span>
              <span className="absolute right-[-0.15em] top-[0.1em] w-[0.15em] h-[0.15em] bg-amber-500 rounded-full"></span>
            </div>
          ))}
        </h1>
        
        {/* Subtitle & Paragraphs row */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mt-8 px-4 md:px-8 gap-8 md:gap-4">
          
          {/* Subtitle / Header (Left side) */}
          <div className="flex-1 md:max-w-[280px] text-left md:text-left mt-1">
            <h3 className="text-xl md:text-2xl uppercase tracking-wider font-semibold leading-[1.2] text-amber-500">
              {subtitle.map((line, idx) => (
                <div key={idx} className="wake-target">{line}</div>
              ))}
            </h3>
          </div>

          {/* Paragraphs (Right side) */}
          <div className="flex-1 flex flex-col sm:flex-row gap-6 md:gap-12 text-[10px] md:text-xs leading-[1.6] text-stone-300">
            {paragraphs.map((para, pIdx) => (
              <div key={pIdx} className="flex-1 flex flex-col">
                {para.map((line, lIdx) => (
                  <div key={lIdx} className="wake-target whitespace-nowrap">
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-50 flex flex-col gap-6 md:gap-8 mix-blend-difference pointer-events-none">
        {/* Nav, Email, Social */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full pointer-events-auto text-[10px] md:text-xs font-semibold tracking-wider gap-6 md:gap-4">
          <a href={`mailto:${navEmail}`} className="hover:text-amber-500 transition-colors uppercase tracking-widest md:flex-1 text-center md:text-left">
            {navEmail}
          </a>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 uppercase text-stone-400 md:flex-1">
            <Link href="/books" className="hover:text-amber-500 transition-colors">Books</Link>
            <Link href="/apps" className="hover:text-amber-500 transition-colors">Apps</Link>
            <Link href="/about" className="hover:text-amber-500 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-[8px] md:text-[10px] text-white/50 text-center leading-[1.6] w-full max-w-2xl mx-auto">
          {footerText}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
