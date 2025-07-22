"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="font-sans h-[100dvh] flex flex-col items-center justify-center bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300 overflow-hidden">
      <div className="flex flex-col items-center space-y-16">
        <div className="flex flex-col items-center space-y-3">
          <div className="text-4xl font-bold">404</div>
          <div className="text-md font-medium uppercase">Page not found</div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 px-4 py-2 bg-[rgb(var(--secondary))] hover:ring-1 hover:ring-gray-500 hover:!text-[rgb(var(--foreground))] hover:scale-105 !text-sm rounded-lg"
        >
          Homepage
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </main>
  );
}
