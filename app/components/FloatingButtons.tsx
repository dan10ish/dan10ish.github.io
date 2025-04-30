'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, ChevronUp } from 'lucide-react';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-4 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center p-2 rounded-full bg-background border border-foreground/10 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
      <Link 
        href="/"
        className="flex items-center justify-center p-2 rounded-full bg-background border border-foreground/10 shadow-sm hover:shadow-md transition-shadow duration-200"
        aria-label="Go to homepage"
      >
        <Home size={20} />
      </Link>
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