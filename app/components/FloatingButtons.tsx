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
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCurrentTheme = () => {
    let currentTheme = resolvedTheme;
    if (!currentTheme && theme === 'system') {
      currentTheme = systemTheme;
    }
    return currentTheme;
  };

  const cycleTheme = () => {
    const current = getCurrentTheme();
    if (current === 'light') setTheme('dark');
    else if (current === 'dark') setTheme('solarized');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    const current = getCurrentTheme();
    if (current === 'light') return <Moon size={20} />;
    if (current === 'dark') return <Palette size={20} />;
    if (current === 'solarized') return <Sun size={20} />;
    return <Moon size={20} />;
  };

  useEffect(() => {
    const checkIfNotFound = () => {
      const isNotFound =
        pathname === '/404' ||
        (document.querySelector('main')?.classList.contains('fixed') &&
          document.querySelector('h1')?.textContent === '404');
      setIsNotFoundPage(isNotFound || false);
    };
    checkIfNotFound();
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const isHomepage = pathname === '/';

  return (
    <div className="fixed bottom-3 right-3 md:bottom-6 md:right-5 flex flex-col items-center gap-3 z-50">
      {isVisible && !isNotFoundPage && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
      {!isHomepage && !isNotFoundPage && (
        <Link
          href="/"
          className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Go to homepage"
        >
          <Home size={20} />
        </Link>
      )}
      <button
        onClick={cycleTheme}
        className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Toggle theme"
      >
        {mounted ? getThemeIcon() : <div className="size-5" />}
      </button>
    </div>
  );
}
