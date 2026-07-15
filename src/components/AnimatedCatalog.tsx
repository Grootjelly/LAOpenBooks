"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '@/lib/books';

export default function AnimatedCatalog({ books }: { books: Book[] }) {
  const router = useRouter();

  // Handle smooth View Transition API navigation
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  };

  // Filter only featured books to highlight, or display all books. Let's display all books so the marquee is rich.
  // We duplicate the books array to ensure it loops seamlessly without any white space.
  const marqueeBooks = [...books, ...books, ...books];

  return (
    <section className="relative py-24 bg-[#050505] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute w-[500px] h-[300px] rounded-full bg-amber-500/5 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center mb-16">
        <span className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Curated Series</span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Featured Publications</h2>
        <p className="text-stone-400 text-sm max-w-md">
          Explore our interactive word search and puzzle guides designed to entertain and educate.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Left/Right gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex w-max gap-8 group/marquee animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
          {marqueeBooks.map((book, idx) => {
            const href = `/books/${book.slug}`;
            return (
              <a
                key={`${book.slug}-${idx}`}
                href={href}
                onClick={(e) => handleNav(e, href)}
                className="group flex flex-col items-center shrink-0 w-[140px] md:w-[180px] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 group-hover/marquee:opacity-40 hover:!opacity-100"
              >
                {/* 3D-like Card cover */}
                <div className="w-full aspect-[5/7] relative rounded-xl overflow-hidden border border-white/10 group-hover:border-amber-500/40 transition-colors duration-300 bg-neutral-900 shadow-xl">
                  {book.coverImage ? (
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                      style={{ viewTransitionName: `book-cover-${book.slug}` } as React.CSSProperties}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-br from-amber-950/20 via-neutral-950 to-amber-950/10">
                      <div className="border border-dashed border-white/5 rounded-lg absolute inset-1 pointer-events-none" />
                      <span className="text-[8px] tracking-widest text-amber-500/80 font-semibold uppercase mt-2">Coming Soon</span>
                      <span className="font-serif text-[10px] md:text-xs font-bold text-amber-100 leading-snug line-clamp-3">{book.title}</span>
                      <span className="text-[8px] uppercase tracking-wider font-semibold text-stone-400 pb-2">Cultures & Food</span>
                    </div>
                  )}
                  {/* Subtle Spine overlay */}
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 to-transparent pointer-events-none" />
                  {/* Soft glare line */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
                
                {/* Book Title */}
                <h3 className="mt-4 text-xs font-semibold text-stone-300 group-hover:text-amber-400 transition-colors duration-200 text-center truncate w-full">
                  {book.title}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
