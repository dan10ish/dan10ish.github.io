'use client';

import { Moon, Sun, Monitor, Palette } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonClasses = "flex items-center justify-center w-9 h-9 rounded-full bg-background border border-secondary transition-colors hover:bg-secondary/50";

  if (!mounted) {
    // Render a placeholder or null during SSR/hydration mismatch
    return (
        <div className={`${buttonClasses} opacity-0 pointer-events-none`}>
            <Sun className="w-4 h-4 text-foreground" /> 
        </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses} // Use shared classes, remove fixed positioning
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-foreground" /> : theme === 'light' ? <Palette className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
    </button>
  );
} 