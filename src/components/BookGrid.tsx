"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Book } from '@/lib/books';
import BookCard from './BookCard';

export default function BookGrid({ books, heading }: { books: Book[]; heading?: string }) {
  return (
    <section>
      {heading && (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{heading}</h2>
      )}
      <motion.div 
        layout 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {books.map((book, index) => (
            <motion.div
              key={book.slug}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <BookCard book={book} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
