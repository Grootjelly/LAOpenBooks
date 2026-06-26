import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Apps | LA Open Books',
  description: 'Explore the digital tools and interactive web applications created by Bookendbook, including GonzoTyper and Izaduko.',
};

export default function AppsPage() {
  return (
    <main className="flex-1 bg-stone-50/50">
      {/* Header */}
      <section className="bg-gradient-to-b from-stone-100 to-white py-20 px-6 border-b border-stone-200/40">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-800 text-xs font-semibold tracking-wide mb-6">
            DIGITAL LAB
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Interactive <span className="text-gradient">Applications</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed">
            Alongside our physical books, we build web apps that bring interactive and tactile experiences to the browser.
          </p>
        </div>
      </section>

      {/* Apps Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* GonzoTyper */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden grid md:grid-cols-12 gap-0 group">
            {/* Image Column */}
            <div className="md:col-span-5 relative min-h-[300px] md:min-h-full bg-stone-900">
              <Image
                src="/images/apps/gonzotyper.png"
                alt="GonzoTyper retro writing application preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE & FREE
                </span>
              </div>
            </div>
            {/* Details Column */}
            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors mb-4">
                  GonzoTyper & The Gonzo Method
                </h2>
                <div className="space-y-4 text-stone-600 mb-8 leading-relaxed">
                  <p>
                    This application is inspired by the unorthodox training regimen of one of journalism's most searing voices: <strong className="text-stone-850">Hunter S. Thompson</strong>.
                  </p>
                  <p>
                    Long before he unleashed "Gonzo" journalism upon the world, Thompson was a student of the craft. While serving in the U.S. Air Force, he undertook a peculiar exercise: he would sit down at his typewriter and re-type, word for word, classics like F. Scott Fitzgerald's <em>The Great Gatsby</em> and Ernest Hemingway's <em>A Farewell to Arms</em>.
                  </p>
                  <blockquote className="border-l-4 border-amber-600 pl-4 py-1.5 my-4 italic bg-amber-50/30 text-stone-700 rounded-r-lg">
                    "I just wanted to feel the music," he reportedly said. He wasn't just copying words; he was absorbing the rhythm, the cadence, the very architecture of masterful prose. He wanted to learn how it felt to write a perfect sentence.
                  </blockquote>
                  <p>
                    <strong>GonzoTyper</strong> is a digital homage to that very principle. It's a tool designed for writers, thinkers, and anyone curious to connect with a text on a deeper level. By re-typing the works of the greats, you're not just practicing your keyboard skills—you're engaging in a form of literary osmosis, internalizing the flow and structure of language from the inside out.
                  </p>
                </div>
              </div>

              <a
                href="https://gonzotyper.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-amber-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg self-start"
              >
                Launch GonzoTyper App
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Izaduko */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden grid md:grid-cols-12 gap-0 group">
            {/* Image Column */}
            <div className="md:col-span-5 relative min-h-[300px] md:min-h-full bg-stone-900">
              <Image
                src="/images/apps/izaduko.png"
                alt="Izaduko sudoku relaxation application preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-bold shadow-md">
                  COMING SOON
                </span>
              </div>
            </div>
            {/* Details Column */}
            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors mb-4">
                  Izaduko
                </h2>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  A calming, minimalist Sudoku game built to provide an environment of relaxation. Free of loud flashing indicators, countdown timers, or penalty systems, Izaduko focuses on zen aesthetics, gentle ambient feedback, and organic problem-solving.
                </p>
                
                <h3 className="font-semibold text-stone-800 mb-3 text-sm uppercase tracking-wider">Planned Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600 text-sm mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600">✓</span> Zen pastel & organic color themes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600">✓</span> Soft tactile transitions & animations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600">✓</span> Dynamic difficulty generator
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600">✓</span> Relaxing backing audio tracks
                  </li>
                </ul>
              </div>

              <button
                disabled
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-100 text-stone-400 font-semibold rounded-xl border border-stone-200 cursor-not-allowed self-start"
              >
                Launch Soon (izaduko.vercel.app)
              </button>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-700 font-semibold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
