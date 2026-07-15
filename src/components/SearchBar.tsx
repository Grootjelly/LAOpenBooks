'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

export default function SearchBar({ genres }: { genres: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentQuery = searchParams.get('q') || '';
  const currentGenre = searchParams.get('genre') || '';

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="space-y-6 mb-12">
      {/* Search Input */}
      <div className="relative max-w-xl">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search books by title, keyword..."
          defaultValue={currentQuery}
          onChange={e => updateParams('q', e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/[0.08] bg-[#0c0c0c] text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm"
        />
        {isPending && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Genre Filter Tags */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold font-mono">Filter by Genre</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParams('genre', '')}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer select-none",
              currentGenre === ''
                ? "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/10"
                : "bg-white/[0.03] text-stone-400 border-white/[0.06] hover:border-white/10 hover:text-white"
            )}
          >
            All Genres
          </button>
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => updateParams('genre', genre)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer select-none",
                currentGenre === genre
                  ? "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/10"
                  : "bg-white/[0.03] text-stone-400 border-white/[0.06] hover:border-white/10 hover:text-white"
              )}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
