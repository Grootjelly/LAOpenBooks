"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import AnimatedCatalog from "@/components/AnimatedCatalog";
import BookCard from "@/components/BookCard";
import ScrollReveal from "@/components/ScrollReveal";
import { getAllBooks } from "@/lib/books";
import Link from "next/link";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOutIntro, setFadeOutIntro] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const fadeTimer = setTimeout(() => {
      setFadeOutIntro(true);
    }, 1800);

    const endTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const allBooks = getAllBooks();

  return (
    <main className="flex-grow min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      {/* 1. Branded Loading Intro Sequence */}
      {showIntro && (
        <div 
          className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            fadeOutIntro ? "opacity-0 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
          <div className="relative mb-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-amber-500/20 flex items-center justify-center mb-4 relative">
              <span className="w-8 h-8 rounded-full border border-amber-500/40 border-t-transparent animate-spin" style={{ animationDuration: "1.5s" }} />
              <span className="absolute text-amber-500 font-serif text-sm font-semibold select-none">L</span>
            </div>
            <h2 className="text-amber-100/90 text-sm font-sans tracking-[0.4em] uppercase select-none animate-pulse">
              Entering LAOP Experience
            </h2>
            <p className="text-[10px] text-stone-500 tracking-widest uppercase mt-2 font-mono">
              CURIOUS MINDS • EST. 2026
            </p>
          </div>
          <div className="w-36 h-px bg-white/[0.06] relative overflow-hidden rounded-full">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
              style={{
                width: fadeOutIntro ? "100%" : "0%",
                transition: "width 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              }}
            />
          </div>
        </div>
      )}

      {/* 2. Main Layout Flow */}
      <div 
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showIntro ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Hero Section */}
        <Hero />

        {/* Marquee Section */}
        <AnimatedCatalog books={allBooks} />

        {/* Featured Catalog Section */}
        <section className="py-24 px-6 border-t border-white/[0.06] bg-[#070707] relative">
          <div className="absolute top-0 right-[15%] w-[400px] h-[400px] bg-amber-500/[0.015] rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <span className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mb-3 block">Flagship Series</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Featured Collection</h2>
              <p className="text-stone-400 text-sm max-w-md mx-auto">
                Explore our main puzzle collections, handcrafted for history buffs, culture explorers, and science lovers.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {allBooks.map((book, idx) => (
                <ScrollReveal key={book.slug} delay={idx * 0.1}>
                  <BookCard book={book} index={idx} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story Teaser */}
        <section className="py-24 px-6 bg-[#0a0a0a] border-t border-white/[0.04] relative">
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] bg-orange-600/[0.01] rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <ScrollReveal className="space-y-6">
              <h3 className="text-2xl md:text-3.5xl font-serif font-bold text-white tracking-wide">
                Puzzles for Curious Minds
              </h3>
              <p className="text-stone-300 text-lg md:text-xl font-serif italic leading-relaxed max-w-2xl mx-auto">
                &ldquo;At Bookendbook, we believe that history, culture, and the world are best explored one puzzle at a time. We craft illustrated, hand-researched word search and activity books designed for readers who love to learn by doing.&rdquo;
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="pt-2">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-widest group"
              >
                Read Our Story
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </main>
  );
}
