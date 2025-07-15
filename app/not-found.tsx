import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import data from './data.json';

export default function NotFound() {
  const socialLinks = data.contact.filter(contact => contact.name !== 'AANSARIDAN@GMAIL.COM');

  return (
    <main className="font-mono h-[100dvh] overflow-hidden relative bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300">
      <div className="absolute inset-0 flex items-center justify-center -translate-y-12">
        <div className="text-center space-y-2">
          <div className="text-6xl font-bold">404</div>
          <div className="text-sm">Page not found</div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 pb-16 text-center space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-700 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-300 text-sm rounded-md"
        >
          Homepage
          <ArrowUpRight size={14} />
        </Link>
        
        <div className="flex flex-wrap justify-center gap-1 sm:gap-4 text-sm px-4">
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
    </main>
  );
} 