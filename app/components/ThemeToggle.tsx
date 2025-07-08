'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 w-4 h-4 rounded-full border border-gray-500 bg-gray-300" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`fixed bottom-6 right-6 w-4 h-4 rounded-full border border-gray-500 transition-colors ${
        isDark ? 'bg-white' : 'bg-black'
      }`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    />
  );
} 