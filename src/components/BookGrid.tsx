import { Book } from '@/lib/books';
import BookCard from './BookCard';

export default function BookGrid({ books, heading }: { books: Book[]; heading?: string }) {
  return (
    <section>
      {heading && (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{heading}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {books.map((book, index) => (
          <BookCard key={book.slug} book={book} index={index} />
        ))}
      </div>
    </section>
  );
}
