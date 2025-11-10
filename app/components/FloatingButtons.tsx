'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronUp, Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

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

  const cycleTheme = () => {
    let currentTheme = resolvedTheme;
    if (!currentTheme && theme === 'system') {
      currentTheme = systemTheme;
    }
    
    if (currentTheme === 'light') {
      setTheme('dark');
    } else if (currentTheme === 'dark') {
      setTheme('solarized');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    let currentTheme = resolvedTheme;
    if (!currentTheme && theme === 'system') {
      currentTheme = systemTheme;
    }
    
    if (currentTheme === 'light') {
      return <Moon size={20} />;
    } else if (currentTheme === 'dark') {
      return <Palette size={20} />;
    } else if (currentTheme === 'solarized') {
      return <Sun size={20} />;
    } else {
      return <Moon size={20} />;
    }
  };

  useEffect(() => {
    const checkIfNotFound = () => {
      const isNotFound = pathname === '/404' || 
                        (document.querySelector('main')?.classList.contains('fixed') && 
                         document.querySelector('h1')?.textContent === '404');
      setIsNotFoundPage(isNotFound || false);
    };

    checkIfNotFound();
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const isHomepage = pathname === '/';

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center !space-y-3 z-50">
        {isVisible && !isNotFoundPage && (
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center !p-2 sm:!p-3 !rounded-full !bg-background/80 !backdrop-blur-md !border !shadow-lg !duration-200 animate-fade-in hover:!bg-background/90 hover:!scale-105 active:!scale-95"
            style={{ borderColor: 'var(--glass-border)' }}
            aria-label="Scroll to top"
          >
          <ChevronUp size={20} className="hover:!text-[var(--link-blue)] !transition-colors" />
          </button>
        )}
        {!isHomepage && !isNotFoundPage && (
          <Link 
            href="/"
            className="flex items-center justify-center !p-2 sm:!p-3 !rounded-full !bg-background/80 !backdrop-blur-md !border !shadow-lg !duration-200 hover:!bg-background/90 hover:!scale-105 active:!scale-95"
            style={{ borderColor: 'var(--glass-border)' }}
            aria-label="Go to homepage"
          >
          <Home size={20} className="hover:!text-[var(--link-blue)] !transition-colors" />
          </Link>
        )}
      <button
        onClick={cycleTheme}
        className="flex items-center justify-center !p-2 sm:!p-3 !rounded-full !bg-background/80 !backdrop-blur-md !border !shadow-lg !duration-200 hover:!bg-background/90 hover:!scale-105 active:!scale-95"
        style={{ borderColor: 'var(--glass-border)' }}
        aria-label="Toggle theme"
      >
        {mounted ? (
          <span className="hover:!text-[var(--link-blue)] !transition-colors">
            {getThemeIcon()}
          </span>
        ) : (
          <div className="w-5 h-5" />
        )}
      </button>
    </div>
  );
} 