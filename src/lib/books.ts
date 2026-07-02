import booksData from '@/data/books.json';

export interface BookFormat {
  type: string;
  amazonUrl: string;
}

export interface Book {
  slug: string;
  title: string;
  subtitle: string | null;
  author: string;
  description: string;
  coverImage: string;
  gallery?: string[];
  genres: string[];
  formats: BookFormat[];
  editions: number;
  pageCount: number | null;
  isbn: string | null;
  publishedDate: string | null;
  featured: boolean;
}

export function getAllBooks(): Book[] {
  return booksData as Book[];
}

export function getFeaturedBooks(): Book[] {
  return getAllBooks().filter(book => book.featured);
}

export function getBookBySlug(slug: string): Book | undefined {
  return getAllBooks().find(book => book.slug === slug);
}

export function getAllGenres(): string[] {
  const genres = new Set<string>();
  getAllBooks().forEach(book => book.genres.forEach(g => genres.add(g)));
  return Array.from(genres).sort();
}

export function getBooksByGenre(genre: string): Book[] {
  return getAllBooks().filter(book => book.genres.includes(genre));
}

export function searchBooks(query: string): Book[] {
  const q = query.toLowerCase();
  return getAllBooks().filter(book =>
    book.title.toLowerCase().includes(q) ||
    (book.subtitle && book.subtitle.toLowerCase().includes(q)) ||
    book.description.toLowerCase().includes(q) ||
    book.genres.some(g => g.toLowerCase().includes(q))
  );
}
