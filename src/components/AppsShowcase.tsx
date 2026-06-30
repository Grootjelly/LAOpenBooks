import Image from 'next/image';
import PopButton from '@/components/PopButton';

interface AppItem {
  name: string;
  description: string;
  theme: string;
  previewUrl: string;
  appUrl?: string;
  status: 'live' | 'coming-soon';
  longDescription?: string;
}

const apps: AppItem[] = [
  {
    name: "GonzoTyper",
    description: "Inspired by the unorthodox training regimen of Hunter S. Thompson. Long before unleashing Gonzo journalism, Thompson re-typed classics like F. Scott Fitzgerald's The Great Gatsby and Ernest Hemingway's A Farewell to Arms word-for-word. 'I just wanted to feel the music,' he said—absorbing the rhythm, the cadence, and the very architecture of masterful prose.",
    theme: "amber",
    previewUrl: "/images/apps/gonzotyper.png",
    appUrl: "https://gonzotyper.netlify.app",
    status: "live"
  },
  {
    name: "Izaduko",
    description: "A calming and minimalist Sudoku game designed to help you unwind. Focus on smooth animations, zen color themes, and peaceful puzzle-solving without the stress.",
    theme: "indigo",
    previewUrl: "/images/apps/izaduko.png",
    status: "coming-soon"
  }
];

export default function AppsShowcase() {
  return (
    <section className="relative py-24 bg-[#0a0a0a]/90 backdrop-blur-sm overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Interactive Ecosystem
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Explore Our Digital <span className="text-amber-400">Creations</span>
          </h2>
          <p className="text-lg text-stone-400">
            From vintage typing experiences to relaxing numerical puzzles, we design web applications that are as beautiful to use as they are functional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {apps.map((app) => (
            <div
              key={app.name}
              className="group relative flex flex-col bg-[#111] rounded-2xl border border-white/10 shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Screenshot Preview Container */}
              <div className="relative aspect-[16/10] w-full bg-stone-900 overflow-hidden border-b border-white/10">
                <Image
                  src={app.previewUrl}
                  alt={`Screenshot preview of ${app.name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03] opacity-90"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent opacity-80" />
                
                {/* App Badge */}
                <div className="absolute top-4 right-4">
                  {app.status === 'live' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-black text-xs font-bold shadow-sm backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                      LIVE NOW
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-stone-400 text-xs font-bold border border-white/10 shadow-sm backdrop-blur-sm">
                      COMING SOON
                    </span>
                  )}
                </div>
              </div>

              {/* App Meta Details */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {app.name}
                    </h3>
                  </div>
                  
                  <p className="text-stone-450 mb-8 leading-relaxed text-sm">
                    {app.description}
                  </p>
                </div>

                <div>
                  {app.status === 'live' && app.appUrl ? (
                    <PopButton
                      href={app.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      Open GonzoTyper
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </PopButton>
                  ) : (
                    <PopButton
                      disabled
                      variant="secondary"
                      className="w-full flex items-center justify-center cursor-not-allowed opacity-50"
                    >
                      Follow Progress
                    </PopButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
