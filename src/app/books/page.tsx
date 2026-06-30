import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllBooks, getAllGenres, searchBooks } from '@/lib/books';
import BookGrid from '@/components/BookGrid';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'All Books | LA Open Books',
  description: 'Browse the complete Bookendbook catalog — coloring books, history, poetry, and more.',
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || '';
  const genre = params.genre || '';
  const genres = getAllGenres();

  let books = getAllBooks();
  if (query) {
    books = searchBooks(query);
  }
  if (genre) {
    books = books.filter(book => book.genres.includes(genre));
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] py-20 px-6 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-amber-500">Books</span>
          </h1>
          <p className="text-xl text-stone-400 max-w-xl">
            Explore the full Bookendbook catalog.
          </p>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-8" />
        </div>
      </section>

      {/* Catalog */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<div className="h-14" />}>
            <SearchBar genres={genres} />
          </Suspense>

          {books.length > 0 ? (
            <BookGrid books={books} />
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-500 text-lg">No books found matching your search.</p>
              <p className="text-stone-400 text-sm mt-2">Try a different search term or clear filters.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
