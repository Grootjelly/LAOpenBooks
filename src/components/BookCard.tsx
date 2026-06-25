import Link from 'next/link';
import { Book } from '@/lib/books';

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className="group block"
    >
      <div className="relative aspect-[5/7] rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        {/* Gradient placeholder since we don't have actual images yet */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-stone-700 to-stone-900 flex items-end p-6">
          <div className="z-10">
            <h3 className="text-white font-bold text-xl leading-tight">{book.title}</h3>
            {book.subtitle && (
              <p className="text-amber-200/80 text-sm mt-1 line-clamp-2">{book.subtitle}</p>
            )}
          </div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-stone-500">{book.author}</p>
        <div className="flex flex-wrap gap-1.5">
          {book.genres.slice(0, 2).map(genre => (
            <span
              key={genre}
              className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/50"
            >
              {genre}
            </span>
          ))}
        </div>
        {book.editions > 1 && (
          <p className="text-xs text-stone-400">{book.editions} editions available</p>
        )}
      </div>
    </Link>
  );
}
