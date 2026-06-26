import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBooks, getBookBySlug } from '@/lib/books';

export async function generateStaticParams() {
  return getAllBooks().map(book => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: 'Book Not Found' };
  return {
    title: `${book.title} | LA Open Books`,
    description: book.description,
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  return (
    <main className="flex-1">
      <section className="bg-gradient-to-b from-stone-100 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center text-sm text-stone-500 space-x-2">
              <li><Link href="/" className="hover:text-amber-700 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/books" className="hover:text-amber-700 transition-colors">Books</Link></li>
              <li>/</li>
              <li className="text-stone-900 font-medium">{book.title}</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-[320px_1fr] gap-12">
            {/* Cover */}
            <div className="relative aspect-[5/7] rounded-2xl overflow-hidden shadow-xl bg-stone-100">
              <Image
                src={book.coverImage}
                alt={`Book cover of ${book.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
              {/* Subtle edge shadow/spine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="text-xl text-stone-500">{book.subtitle}</p>
                )}
                <p className="text-stone-600 mt-2">by <span className="font-medium text-stone-800">{book.author}</span></p>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {book.genres.map(genre => (
                  <span
                    key={genre}
                    className="text-sm px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/50 font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-lg text-stone-600 leading-relaxed">
                {book.description}
              </p>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-stone-200">
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">Editions</p>
                  <p className="text-stone-900 font-medium mt-1">{book.editions}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">Formats</p>
                  <p className="text-stone-900 font-medium mt-1">{book.formats.map(f => f.type).join(', ')}</p>
                </div>
                {book.pageCount && (
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">Pages</p>
                    <p className="text-stone-900 font-medium mt-1">{book.pageCount}</p>
                  </div>
                )}
                {book.isbn && (
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">ISBN</p>
                    <p className="text-stone-900 font-medium mt-1">{book.isbn}</p>
                  </div>
                )}
              </div>

              {/* Buy buttons */}
              <div className="flex flex-wrap gap-3">
                {book.formats.map(format => (
                  <a
                    key={format.type}
                    href={format.amazonUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Buy {format.type} on Amazon
                  </a>
                ))}
              </div>

              {/* Back link */}
              <Link
                href="/books"
                className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors text-sm mt-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to all books
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
