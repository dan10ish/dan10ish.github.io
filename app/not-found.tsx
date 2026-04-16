import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center text-center py-16 sm:py-24">
      <h1 className="text-base font-bold mb-4">404</h1>
      <p className="text-base text-muted-foreground mb-4">Page not found</p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm transition-colors hover:bg-accent"
        aria-label="Go back to home page"
      >
        <ArrowLeft size={16} />
        <span>Back to home</span>
      </Link>
    </main>
  );
}
