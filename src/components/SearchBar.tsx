'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

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
    <div className="flex flex-col sm:flex-row gap-4 mb-10">
      <div className="relative flex-1">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search books..."
          defaultValue={currentQuery}
          onChange={e => updateParams('q', e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
        />
      </div>
      <div className="relative">
        <select
          value={currentGenre}
          onChange={e => updateParams('genre', e.target.value)}
          className="w-full sm:w-48 px-4 pr-10 py-3 rounded-lg border border-stone-300 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none cursor-pointer"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      {isPending && (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
