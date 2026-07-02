"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Book } from '@/lib/books';

export default function AnimatedCatalog({ books }: { books: Book[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale the books from smaller (0.8) to full size (1)
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  
  // Parallax movement for the books to slide up slightly
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  
  // Take exactly 3 books to match the Intiri template layout
  const displayBooks = books.slice(0, 3);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-24">
        
        {/* Massive Background Text */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 0.15]) }}
        >
          <h2 className="text-[15vw] font-black text-transparent whitespace-nowrap select-none"
              style={{ WebkitTextStroke: '2px rgba(255,255,255,1)' }}>
            THE CATALOG
          </h2>
        </motion.div>

        {/* Regular Header */}
        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center mb-12 md:mb-20">
           <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4">The Catalog</p>
           <h2 className="text-6xl md:text-[8rem] lg:text-[12rem] leading-none font-bold text-white mb-8 tracking-tighter">Popular Titles</h2>
           <Link href="/books" className="text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors uppercase tracking-wider">
              View all titles &rarr;
           </Link>
        </div>

        {/* Animated Books Grid */}
        <motion.div 
          className="relative z-20 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          style={{ scale, y }}
        >
          {displayBooks.map((book, idx) => (
            <Link href={`/books/${book.slug}`} key={book.slug} className="group flex flex-col items-center">
              <div className="w-full aspect-[9/13] relative rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 group-hover:border-amber-500/50 transition-colors duration-500">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                   <span className="px-6 py-3 rounded-full bg-amber-500 text-black font-semibold tracking-wider uppercase text-xs">
                     View Details
                   </span>
                </div>
              </div>
              {/* Minimalist text below matching Intiri template style */}
              <div className="mt-6 text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-1">{book.title}</h3>
                <p className="text-stone-400 text-sm uppercase tracking-wider">{book.author}</p>
              </div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
