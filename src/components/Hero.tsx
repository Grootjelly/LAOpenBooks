import Link from 'next/link';
import { getAllBooks } from '@/lib/books';
import BookGrid from '@/components/BookGrid';
import BookCarousel from '@/components/BookCarousel';
import PopButton from '@/components/PopButton';

export default function Hero() {
  const allBooks = getAllBooks();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen">
          {/* Hero GIF background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-banner.mp4" type="video/mp4" />
            {/* Fallback to GIF if the user uploads a GIF instead */}
            <img src="/hero-banner.gif" alt="Hero background" className="absolute inset-0 w-full h-full object-cover" />
          </video>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Optional decorative accents (kept subtle) */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36 z-10">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 text-white text-xs font-medium tracking-wide mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-[gentle-pulse_2s_ease-in-out_infinite]" />
              INDEPENDENT PUBLISHER · LOS ANGELES
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
              An open book,<br />
              <span className="text-amber-400 drop-shadow-md">is an open mind.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-stone-200 leading-relaxed mb-10 max-w-lg drop-shadow">
              Discover the Bookendbook catalog — coloring books, poetry, history, and more from an independent LA publisher.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-4">
              <PopButton
                href="/books"
                className="inline-flex items-center gap-2"
              >
                Browse All Books
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </PopButton>
              <PopButton
                href="/about"
                variant="secondary"
                className="inline-flex items-center gap-2"
              >
                Our Story
              </PopButton>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight Carousel */}
      <section className="py-16 px-6 bg-[#0a0a0a]/90 backdrop-blur-sm border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-2">The Catalog</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Popular Titles</h2>
            </div>
            <Link
              href="/books"
              className="hidden sm:inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <BookCarousel books={allBooks} />
        </div>
      </section>

      {/* All Books Grid */}
      <section className="py-16 px-6 bg-[#0d0d0d]/85 backdrop-blur-md border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-2">Browse</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Full Collection</h2>
            </div>
          </div>
          <BookGrid books={allBooks} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#111]/90 backdrop-blur-sm border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to say hello?
          </h2>
          <p className="text-lg text-stone-400 mb-10 max-w-md mx-auto leading-relaxed">
            Whether you have questions, feedback, or just want to connect — we&apos;d love to hear from you.
          </p>
          <PopButton
            href="/contact"
            className="inline-flex items-center gap-2"
          >
            Send a Message
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </PopButton>
        </div>
      </section>
    </>
  );
}
