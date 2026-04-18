'use client';

import { useEffect, useState } from 'react';
import { Moon, Palette, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="inline-flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Toggle theme"
    >
      {mounted ? getThemeIcon() : <span className="size-5" aria-hidden />}
    </button>
  );
}
