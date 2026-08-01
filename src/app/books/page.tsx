import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllBooks, getAllGenres, getFeaturedBooks, searchBooks } from '@/lib/books';
import BookGrid from '@/components/BookGrid';
import SearchBar from '@/components/SearchBar';
import PageHero from '@/components/PageHero';
import ScrollMarquee from '@/components/ScrollMarquee';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'All Books | LA Open Books',
  description: 'Browse the complete Bookendbook catalog — illustrated word search and activity books for curious minds.',
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

  const heroCovers = getFeaturedBooks()
    .filter(book => book.coverImage)
    .slice(0, 3)
    .map(book => ({ src: book.coverImage, alt: `Book cover of ${book.title}` }));

  return (
    <main className="flex-1">
      <PageHero
        eyebrow="The Bookendbook Catalog"
        title="Stories you can"
        accent="solve."
        subtitle="Illustrated word searches and activity books for curious minds — history, culture, and the world, one puzzle at a time."
        covers={heroCovers}
      />

      <ScrollMarquee items={genres} />

      {/* Catalog */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Suspense fallback={<div className="h-14" />}>
              <SearchBar genres={genres} />
            </Suspense>
          </ScrollReveal>

          {books.length > 0 ? (
            <BookGrid books={books} />
          ) : (
            <ScrollReveal className="text-center py-20">
              <p className="text-stone-500 text-lg">No books found matching your search.</p>
              <p className="text-stone-400 text-sm mt-2">Try a different search term or clear filters.</p>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}
