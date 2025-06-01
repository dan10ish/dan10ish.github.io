'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronUp } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const isHomepage = pathname === '/';

  return (
    <>
      <div className="fixed top-7 right-5 z-50">
        <ThemeToggle />
      </div>
      
      <div className="fixed bottom-4 right-5 flex flex-col items-center space-y-4 z-50">
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center p-2 rounded-full bg-background duration-200 animate-fade-in"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>
        )}
        {!isHomepage && (
          <Link 
            href="/"
            className="flex items-center justify-center p-2 rounded-full bg-background duration-200"
            aria-label="Go to homepage"
          >
            <Home size={20} />
          </Link>
        )}
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
    </>
  );
} 