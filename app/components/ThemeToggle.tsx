'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  const currentTheme = resolvedTheme || theme || 'light';
  const isDark = currentTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-9 h-9 flex items-center justify-center text-foreground cursor-pointer p-1.5 m-0 bg-transparent border-0 outline-none theme-toggle-btn"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="theme-toggle-icon">
        {isDark ? <Sun size={19} /> : <Moon size={19} />}
      </span>
    </button>
  );
}
