'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      const updateThemeColor = (currentTheme: string) => {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', currentTheme === 'dark' ? '#111111' : '#f8f8f8');
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
      className="fixed bottom-5 right-5 p-2 rounded-full bg-[rgb(var(--surface))] text-foreground hover-shadow hover-scale hover-bg transition-all duration-200 z-60"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
} 