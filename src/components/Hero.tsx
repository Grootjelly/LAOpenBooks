import Link from 'next/link';
import { getFeaturedBooks } from '@/lib/books';
import BookGrid from '@/components/BookGrid';

export default function Hero() {
  const featuredBooks = getFeaturedBooks();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-800 text-xs font-medium tracking-wide mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-[gentle-pulse_2s_ease-in-out_infinite]" />
              INDEPENDENT PUBLISHER · LOS ANGELES
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-[1.1] tracking-tight mb-6">
              Stories that{' '}
              <span className="text-gradient">educate</span>,{' '}
              <span className="text-gradient">inspire</span> &{' '}
              <span className="text-gradient">entertain</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-stone-500 leading-relaxed mb-10 max-w-lg">
              Discover the Bookendbook catalog — coloring books, poetry, history, and more from an independent LA publisher.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-amber-700/20 hover:shadow-xl hover:shadow-amber-700/25 hover:-translate-y-0.5"
              >
                Browse All Books
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-stone-50 text-stone-700 font-medium rounded-xl transition-all duration-200 border border-stone-200 hover:border-stone-300 shadow-sm"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-700 text-sm font-medium tracking-wide uppercase mb-2">Featured</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                Popular Titles
              </h2>
            </div>
            <Link
              href="/books"
              className="hidden sm:inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <BookGrid books={featuredBooks} />

          <div className="text-center mt-12 sm:hidden">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium transition-colors"
            >
              View all books
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Want to get in touch?
          </h2>
          <p className="text-lg text-stone-500 mb-8 max-w-md mx-auto">
            Whether you have questions, feedback, or just want to say hello — we&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Send a Message
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
