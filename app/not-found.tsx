"use client";
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="font-sans h-[100dvh] flex flex-col items-center justify-center bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300 overflow-hidden">
      <div className="flex flex-col items-center space-y-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">404</div>
          <div className="text-sm font-light uppercase">Page not found</div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2 bg-[rgb(var(--secondary))] hover:scale-110 !text-sm rounded-md uppercase"
        >
          Homepage
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </main>
  );
} 