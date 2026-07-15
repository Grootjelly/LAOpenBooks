import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBooks, getBookBySlug } from '@/lib/books';
import BookDetailCover from '@/components/BookDetailCover';
import ScrollReveal from '@/components/ScrollReveal';

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
      <section className="bg-gradient-to-b from-[#0f0f0f]/80 to-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="mb-12">
            <ol className="flex items-center text-sm text-stone-400 space-x-2">
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/books" className="hover:text-amber-500 transition-colors">Books</Link></li>
              <li>/</li>
              <li className="text-stone-300 font-medium">{book.title}</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-[320px_1fr] gap-12">
            {/* Interactive Cover Column */}
            <div>
              <BookDetailCover
                coverImage={book.coverImage}
                title={book.title}
                subtitle={book.subtitle}
                featured={book.featured}
                slug={book.slug}
              />
            </div>

            {/* Details Content Column */}
            <div className="space-y-6">
              <ScrollReveal delay={0.05}>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="text-xl text-stone-400 font-serif italic">{book.subtitle}</p>
                )}
                <p className="text-stone-400 mt-2">by <span className="font-medium text-stone-200">{book.author}</span></p>
              </ScrollReveal>

              {/* Genres */}
              <ScrollReveal delay={0.15}>
                <div className="flex flex-wrap gap-2">
                  {book.genres.map(genre => (
                    <span
                      key={genre}
                      className="text-xs px-3 py-1 rounded-full bg-amber-950/40 text-amber-400 border border-amber-900/30 font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={0.25}>
                <p className="text-lg text-stone-300 leading-relaxed max-w-3xl">
                  {book.description}
                </p>
              </ScrollReveal>

              {/* Meta information row */}
              <ScrollReveal delay={0.35} className="grid grid-cols-2 gap-4 py-6 border-t border-b border-white/[0.06] max-w-3xl">
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">Editions</p>
                  <p className="text-stone-200 font-medium mt-1">{book.editions}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">Formats</p>
                  <p className="text-stone-200 font-medium mt-1">
                    {book.formats.length > 0 
                      ? book.formats.map(f => f.type).join(', ') 
                      : 'Paperback (Coming Soon)'
                    }
                  </p>
                </div>
                {book.pageCount && (
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">Pages</p>
                    <p className="text-stone-200 font-medium mt-1">{book.pageCount}</p>
                  </div>
                )}
                {book.isbn && (
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">ISBN</p>
                    <p className="text-stone-200 font-medium mt-1">{book.isbn}</p>
                  </div>
                )}
              </ScrollReveal>

              {/* Buy buttons & Navigation back link */}
              <ScrollReveal delay={0.45} className="space-y-6 pt-2">
                <div className="flex flex-wrap gap-3">
                  {book.formats.map(format => (
                    <a
                      key={format.type}
                      href={format.amazonUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Buy {format.type} on Amazon
                    </a>
                  ))}
                  {book.formats.length === 0 && (
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-white/10 text-stone-400 font-medium rounded-lg select-none">
                      🔒 Pre-order Coming Soon
                    </span>
                  )}
                </div>

                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-500 transition-colors text-sm mt-4 group"
                >
                  <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all books
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Image Gallery */}
      {book.gallery && book.gallery.length >= 3 && (
        <section className="bg-[#0a0a0a] py-20 px-6 border-t border-white/[0.06]">
          <ScrollReveal className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-white mb-8">Inside the Book</h2>
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 md:gap-6">
              {/* Main large image */}
              <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-xl overflow-hidden bg-stone-900 border border-white/[0.06] shadow-xl">
                <Image
                  src={book.gallery[0]}
                  alt={`${book.title} interior preview 1`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              
              {/* Stacked smaller images */}
              <div className="grid grid-rows-2 gap-4 md:gap-6 md:h-[600px]">
                <div className="relative aspect-video md:aspect-auto rounded-xl overflow-hidden bg-stone-900 border border-white/[0.06] shadow-xl">
                  <Image
                    src={book.gallery[1]}
                    alt={`${book.title} interior preview 2`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="relative aspect-video md:aspect-auto rounded-xl overflow-hidden bg-stone-900 border border-white/[0.06] shadow-xl">
                  <Image
                    src={book.gallery[2]}
                    alt={`${book.title} interior preview 3`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}
    </main>
  );
}
