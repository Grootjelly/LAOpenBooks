'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/books';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      cover.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.03)`;
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

  // Smooth View Transition API navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = `/books/${book.slug}`;
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  };

  return (
    <div ref={cardRef} className="book-card-wrap group opacity-0">
      <Link 
        href={`/books/${book.slug}`} 
        onClick={handleNavigation}
        className="block"
      >
        {/* Cover with 3D + glow */}
        <div className="relative book-glow-ring">
          <div
            ref={coverRef}
            className="book-cover-3d relative aspect-[5/7] rounded-xl overflow-hidden bg-neutral-900 border border-white/[0.08] shadow-lg transition-transform duration-300"
            style={{ viewTransitionName: `book-cover-${book.slug}` } as React.CSSProperties}
          >
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={`Book cover of ${book.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={book.featured}
              />
            ) : (
              /* Coming Soon Placeholder layout */
              <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-br from-amber-950/20 via-neutral-950 to-amber-950/10 select-none">
                <div className="absolute inset-2 border border-dashed border-white/5 rounded-lg pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center pt-6">
                  <span className="text-[9px] tracking-widest font-sans uppercase font-bold text-amber-500/80 mb-2">Cultures & Food</span>
                  <div className="w-9 h-9 rounded-full bg-amber-500/5 flex items-center justify-center border border-amber-500/10 mb-4 text-amber-400">
                    🍳
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center px-1">
                  <h4 className="font-serif text-sm md:text-base font-bold text-amber-100 tracking-tight leading-snug line-clamp-3">
                    {book.title}
                  </h4>
                  {book.subtitle && (
                    <p className="text-[9px] text-stone-400 mt-1 line-clamp-2 italic">{book.subtitle}</p>
                  )}
                </div>

                <div className="relative z-10 pb-4 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-bold tracking-wider uppercase">
                    Coming Soon
                  </span>
                </div>
              </div>
            )}

            {/* Spine shadow */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

            {/* Shine sweep */}
            <div className="book-shine" />

            {/* Hover overlay with quick-view prompt */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
              <div className="p-4 w-full transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {book.coverImage ? "View Details" : "Read Preview"}
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
