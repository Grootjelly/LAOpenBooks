'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/books';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function BookCarousel({ books }: { books: Book[] }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((idx: number) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setPrev(active);
    setActive(idx);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 600);
  }, [active, animating]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      go((active + 1) % books.length);
    }, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, paused, go, books.length]);

  const book = books[active];
  const prevBook = prev !== null ? books[prev] : null;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Cinematic Background ─────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Previous book bg (fades out) */}
        {prevBook && (
          <div className="absolute inset-0 transition-opacity duration-600 opacity-0">
            <Image
              src={prevBook.coverImage}
              alt=""
              fill
              className="object-cover scale-110 blur-2xl"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
        )}
        {/* Active book bg */}
        <div className="absolute inset-0 transition-opacity duration-600 opacity-100">
          <Image
            key={book.slug + '-bg'}
            src={book.coverImage}
            alt=""
            fill
            className="object-cover scale-110 blur-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      </div>

      {/* ── Spotlight Content ─────────────────────── */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 px-8 py-10 md:py-14 min-h-[480px]">

        {/* Book Cover — full cover, no crop */}
        <div className="flex-shrink-0 group">
          <Link href={`/books/${book.slug}`}>
            <div
              key={book.slug + '-cover'}
              className="relative w-52 md:w-64 lg:w-72 aspect-[5/7] rounded-2xl shadow-2xl ring-1 ring-white/10
                         transition-all duration-500 ease-out
                         group-hover:scale-[1.03] group-hover:ring-amber-500/50"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 60px rgba(217,119,6,0.15)' }}
            >
              <Image
                key={book.slug}
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-contain animate-[fade-in_0.5s_ease-out] rounded-2xl"
                priority
              />
              {/* Left spine edge shadow */}
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/40 to-transparent pointer-events-none rounded-l-2xl" />
              {/* Hover shine sweep */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-2xl" />
            </div>
          </Link>
        </div>

        {/* Info */}
        <div
          key={book.slug + '-info'}
          className="flex-1 text-left animate-[fade-in-up_0.5s_ease-out]"
        >
          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-5">
            {book.genres.slice(0, 3).map(g => (
              <span key={g} className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold tracking-widest uppercase">
                {g}
              </span>
            ))}
          </div>

          {/* Title — never truncated */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 tracking-tight break-words">
            {book.title}
          </h2>
          {book.subtitle && (
            <p className="text-sm md:text-base text-amber-400/80 font-medium mb-5 leading-snug">{book.subtitle}</p>
          )}

          {/* Description */}
          <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-lg mb-7 line-clamp-3">
            {book.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/books/${book.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all duration-200 shadow-lg shadow-amber-900/30 hover:-translate-y-0.5 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Book
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 border border-white/20 hover:border-white/40 text-sm backdrop-blur-sm"
            >
              All Books
            </Link>
          </div>

          {/* Editions tag */}
          {book.editions > 1 && (
            <p className="mt-4 text-xs text-stone-500">{book.editions} editions available</p>
          )}
        </div>

        {/* Navigation arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 z-20">
          <button
            onClick={() => go((active - 1 + books.length) % books.length)}
            className="w-9 h-9 rounded-full bg-black/50 hover:bg-amber-500/80 border border-white/10 hover:border-amber-400/40 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous book"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-3 z-20">
          <button
            onClick={() => go((active + 1) % books.length)}
            className="w-9 h-9 rounded-full bg-black/50 hover:bg-amber-500/80 border border-white/10 hover:border-amber-400/40 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            aria-label="Next book"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Progress bar ──────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex gap-1 px-8 pb-4">
        {books.map((b, i) => (
          <button
            key={b.slug}
            onClick={() => go(i)}
            className="relative flex-1 h-0.5 rounded-full bg-white/20 overflow-hidden"
            aria-label={`Go to ${b.title}`}
          >
            {i === active && (
              <span
                className="absolute inset-0 bg-amber-500 rounded-full origin-left"
                style={{
                  animation: paused ? 'none' : 'progress-fill 5s linear forwards',
                }}
              />
            )}
            {i < active && (
              <span className="absolute inset-0 bg-amber-500/60 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── Thumbnail strip ───────────────────────── */}
      <div className="relative z-10 flex gap-3 px-8 pb-8 pt-0 overflow-x-auto scrollbar-none">
        {books.map((b, i) => (
          <button
            key={b.slug}
            onClick={() => go(i)}
            className={`flex-shrink-0 relative w-16 aspect-[5/7] rounded-lg overflow-hidden ring-2 transition-all duration-300
              ${i === active
                ? 'ring-amber-500 scale-105 shadow-lg shadow-amber-900/40'
                : 'ring-white/10 hover:ring-white/30 opacity-60 hover:opacity-90'
              }`}
          >
            <Image src={b.coverImage} alt={b.title} fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}
