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
      className={`fixed bottom-6 right-6 w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg z-50 flex items-center justify-center ${
        theme === 'dark' 
          ? 'bg-[#f8f8f8] border-gray-300 hover:bg-gray-100' 
          : 'bg-[#171717] border-gray-600 hover:bg-gray-900'
      }`}
      aria-label="Toggle theme"
    >
      <span className={`text-lg select-none ${theme === 'dark' ? 'text-gray-800' : 'text-gray-200'}`}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
} 