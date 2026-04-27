import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { WanderingEyes } from '@/components/loading-ui/wandering-eyes';

const ctaClassName =
  'inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm text-card-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground';

export default function NotFound() {
  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-12 sm:py-16">
      <div className="grid w-full max-w-lg grid-cols-1 items-center gap-12 sm:max-w-2xl sm:grid-cols-[minmax(0,13.5rem)_1fr] sm:gap-x-12 sm:gap-y-8">
        <div className="flex justify-center sm:justify-end">
          <div className="w-[min(13.5rem,100%)] text-foreground">
            <WanderingEyes
              className="w-full text-foreground"
              screenReaderText="Page not found"
              eyeScale={0.58}
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <p className="text-4xl font-bold tracking-tight text-foreground tabular-nums sm:text-5xl">
            404
          </p>
          <p className="mt-2 max-w-sm text-base leading-relaxed text-muted-foreground">
            Page not found
          </p>
          <Link
            href="/"
            className={`${ctaClassName} mt-6 sm:w-auto sm:self-start`}
            aria-label="Go back to home page"
          >
            <ArrowLeft size={16} className="shrink-0 opacity-80" />
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
