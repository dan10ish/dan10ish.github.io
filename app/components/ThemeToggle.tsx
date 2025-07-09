'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateThemeColor = (currentTheme: string) => {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
      if (metaThemeColor) {
        metaThemeColor.content = currentTheme === 'dark' ? '#171717' : '#f8f8f8';
      }
    };

    const currentTheme = resolvedTheme || theme || 'light';
    updateThemeColor(currentTheme);
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) {
    return null;
  }

  const currentTheme = resolvedTheme || theme || 'light';

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className='fixed bottom-3 right-3 p-2 rounded-full cursor-pointer'
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <span className={`w-4 h-4 rounded-full transition-all duration-100 hover:scale-110 hover:shadow-lg z-50 flex items-center justify-center ${
        currentTheme === 'dark' 
          ? 'bg-[#f8f8f8] border-gray-300 hover:bg-gray-100' 
          : 'bg-[#171717] border-gray-600 hover:bg-gray-900'
      }`}>
      </span>
    </button>
  );
} 