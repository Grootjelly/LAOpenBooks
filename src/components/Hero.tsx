import Link from 'next/link';
import { getAllBooks } from '@/lib/books';
import BookGrid from '@/components/BookGrid';
import AnimatedCatalog from '@/components/AnimatedCatalog';
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
            poster="/hero-banner.gif"
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
              An open book <br />
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

      {/* Animated Spotlight Catalog */}
      <AnimatedCatalog books={allBooks} />

    </>
  );
}
