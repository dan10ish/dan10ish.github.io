import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-base font-bold">404</h1>
      <p className="mb-4 text-base text-muted-foreground">Page not found</p>
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
