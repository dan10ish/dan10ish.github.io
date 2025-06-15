'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronUp } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(true);
  const pathname = usePathname();

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useLayoutEffect(() => {
    const checkIfNotFound = () => {
      const isNotFound = document.querySelector('main')?.classList.contains('fixed') && 
                        document.querySelector('h1')?.textContent === '404';
      setIsNotFoundPage(isNotFound || false);
    };

    checkIfNotFound();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const isHomepage = pathname === '/';

  return (
    <div className="fixed bottom-4 right-5 flex flex-col items-center space-y-4 z-50">
      {isVisible && !isNotFoundPage && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center p-2 rounded-full bg-background duration-200 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
      {!isHomepage && !isNotFoundPage && (
        <Link 
          href="/"
          className="flex items-center justify-center p-2 rounded-full bg-background duration-200"
          aria-label="Go to homepage"
        >
          <Home size={20} />
        </Link>
      )}
      <div className="flex items-center justify-center p-2 rounded-full bg-background duration-200">
        <ThemeToggle />
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
} 