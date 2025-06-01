'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex items-center justify-center p-2 rounded-full duration-200" style={{ background: 'var(--background)' }}>
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center p-2 rounded-full duration-200"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
} 