'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }

    const themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (themeColorMeta) {
      themeColorMeta.content = theme === 'dark' ? '#171717' : '#f8f8f8';
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`fixed bottom-5 right-5 w-5 h-5 rounded-full transition-all duration-100 hover:scale-110 hover:shadow-lg z-50 flex items-center justify-center ring-2 ring-gray-300 ${
        theme === 'dark' 
          ? 'bg-[#f8f8f8] border-gray-300 hover:bg-gray-100' 
          : 'bg-[#171717] border-gray-600 hover:bg-gray-900'
      }`}
      aria-label="Toggle theme"
    />
  );
} 