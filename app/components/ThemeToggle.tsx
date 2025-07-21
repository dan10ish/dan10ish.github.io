'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      const updateThemeColor = (currentTheme: string) => {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', currentTheme === 'dark' ? '#171717' : '#ffffff');
        }
      };

      const currentTheme = resolvedTheme || theme || 'light';
      updateThemeColor(currentTheme);
    }
  }, [theme, resolvedTheme]);

  if (!mounted) {
    return null;
  }

  const currentTheme = resolvedTheme || theme || 'light';
  const isDark = currentTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='fixed bottom-3 right-3 p-2 rounded-full cursor-pointer z-50'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className={`w-4 h-4 rounded-full transition-all duration-100 hover:scale-110 hover:shadow-lg flex items-center justify-center ${
        isDark 
          ? 'bg-[#ffffff] border-gray-300 hover:bg-gray-100' 
          : 'bg-[#171717] border-gray-600 hover:bg-gray-900'
      }`}>
      </span>
    </button>
  );
} 