'use client';

import { Moon, Sun, Monitor, Palette } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  // Set mounted state after component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder during SSR and initial client render
  if (!mounted) {
    return (
      <button
        className="fixed top-5 right-5 p-2 rounded-full bg-background text-foreground border border-foreground/20"
        aria-label="Loading theme toggle"
      >
        <Sun size={20} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 p-2 rounded-full bg-background text-foreground border border-foreground/20"
      aria-label="Toggle theme"
    >
      {/* Cycle through Dark (Sun icon) -> Light (Palette icon) -> Solarized (Moon icon) */} 
      {theme === 'dark' ? <Sun size={20} /> : theme === 'light' ? <Palette size={20} /> : <Moon size={20} />}
    </button>
  );
} 