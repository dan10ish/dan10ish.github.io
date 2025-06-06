'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex items-center justify-center p-2 rounded-full duration-200">
        <div className="w-5 h-5" />
      </button>
    );
  }

  const cycleTheme = () => {
    let currentTheme = resolvedTheme;
    if (!currentTheme && theme === 'system') {
      currentTheme = systemTheme;
    }
    
    if (currentTheme === 'light') {
      setTheme('dark');
    } else if (currentTheme === 'dark') {
      setTheme('solarized');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    let currentTheme = resolvedTheme;
    if (!currentTheme && theme === 'system') {
      currentTheme = systemTheme;
    }
    
    if (currentTheme === 'light') {
      return <Moon size={20} />;
    } else if (currentTheme === 'dark') {
      return <Palette size={20} />;
    } else if (currentTheme === 'solarized') {
      return <Sun size={20} />;
    } else {
      return <Moon size={20} />;
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center justify-center p-2 rounded-full duration-200"
      aria-label="Toggle theme"
    >
      {getIcon()}
    </button>
  );
} 