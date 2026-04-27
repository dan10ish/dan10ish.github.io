"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { WanderingEyes } from "@/components/loading-ui/wandering-eyes";

const primaryBtnClassName =
  "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground";

const secondaryBtnClassName =
  "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm text-card-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-12 sm:py-16">
      <div className="grid w-full max-w-lg grid-cols-1 items-center gap-12 sm:max-w-2xl sm:grid-cols-[minmax(0,13.5rem)_1fr] sm:gap-x-12 sm:gap-y-8">
        <div className="flex justify-center sm:justify-end">
          <div className="w-[min(13.5rem,100%)] text-foreground">
            <WanderingEyes
              className="w-full text-foreground"
              screenReaderText="Something went wrong"
              eyeScale={0.58}
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <p className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Something went wrong
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-5">
            An unexpected error occurred. You can try again or head back home.
          </p>
          <div className="mt-10 flex w-full flex-col gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:self-start">
            <button type="button" onClick={reset} className={`${primaryBtnClassName} w-full sm:w-auto`}>
              <RotateCcw size={16} className="shrink-0 opacity-80" />
              Try again
            </button>
            <Link
              href="/"
              className={`${secondaryBtnClassName} w-full sm:w-auto`}
              aria-label="Go back to home page"
            >
              <ArrowLeft size={16} className="shrink-0 opacity-80" />
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
