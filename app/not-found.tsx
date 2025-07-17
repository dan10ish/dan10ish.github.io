import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import data from './data.json';

export default function NotFound() {
  const socialLinks = data.contact.filter(contact => contact.name !== 'AANSARIDAN@GMAIL.COM');

  return (
    <main className="font-sans h-[100dvh] flex flex-col items-center justify-center bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300 overflow-hidden">
      <div className="flex flex-col items-center space-y-12 -translate-y-6">
        <img src="/error-asset.gif" alt="Error asset" className="w-60 object-contain rounded-xl" />
        <div className="flex flex-col items-center space-y-2">
          <div className="text-2xl font-bold">404</div>
          <div className="text-sm uppercase">Page not found</div>
        </div>
        <div className="flex flex-col items-center space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2 bg-[#eeeeee] dark:bg-[#222222] hover:scale-110 hover:text-blue-600 dark:hover:text-blue-300 text-sm rounded-md uppercase"
        >
          Homepage
          <ArrowUpRight size={14} />
        </Link>
        <div className="flex flex-wrap justify-center gap-1 sm:gap-4 text-sm px-4 uppercase">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-300 group inline-flex items-center gap-1 transition-colors"
            >
              {link.name}
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 