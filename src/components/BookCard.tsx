'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/books';
import { useEffect, useRef } from 'react';

export default function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  // Intersection Observer → trigger reveal-up animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${index * 0.08}s`;
          el.classList.add('book-reveal');
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  // Mouse-move 3D tilt
  useEffect(() => {
    const wrap = cardRef.current;
    const cover = coverRef.current;
    if (!wrap || !cover) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      cover.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 10}deg) scale(1.04)`;
    };

    const onLeave = () => {
      cover.style.transform = '';
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="book-card-wrap group opacity-0">
      <Link href={`/books/${book.slug}`} className="block">

        {/* Cover with 3D + glow */}
        <div className="relative book-glow-ring">
          <div
            ref={coverRef}
            className="book-cover-3d relative aspect-[5/7] rounded-xl overflow-hidden"
          >
            <Image
              src={book.coverImage}
              alt={`Book cover of ${book.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={book.featured}
            />

            {/* Spine shadow */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

            {/* Shine sweep */}
            <div className="book-shine" />

            {/* Hover overlay with quick-view prompt */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
              <div className="p-4 w-full">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </span>
              </div>
            </div>

            {/* Featured badge */}
            {book.featured && (
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold tracking-wider uppercase shadow-lg">
                Featured
              </div>
            )}
          </div>
        </div>

        {/* Info panel */}
        <div className="book-info-panel mt-4 space-y-1.5 px-0.5">
          <h3 className="font-semibold text-stone-100 group-hover:text-amber-400 transition-colors duration-200 leading-snug">
            {book.title}
          </h3>
          <p className="text-xs text-stone-500 font-medium">{book.author}</p>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {book.genres.slice(0, 2).map(genre => (
              <span
                key={genre}
                className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-400 border border-amber-800/40 font-medium tracking-wide"
              >
                {genre}
              </span>
            ))}
          </div>
          {book.editions > 1 && (
            <p className="text-[10px] text-stone-600 pt-0.5">{book.editions} editions</p>
          )}
        </div>
      </Link>
    </div>
  );
}
