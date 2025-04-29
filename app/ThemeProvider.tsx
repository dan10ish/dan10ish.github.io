'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Monitor } from 'lucide-react'; // Import Monitor icon if needed elsewhere, though toggle is in ThemeToggle

type Theme = 'light' | 'dark' | 'solarized'; // Add 'solarized'
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Default context value with noop function for SSR
const defaultContextValue: ThemeContextType = {
  theme: 'dark',
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark'); // Keep default as dark

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as Theme || 'dark';
    setTheme(currentTheme); // Initialize state from HTML attribute
  }, []);


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    // Update meta theme-color tag when theme changes
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    let color;
    switch (theme) {
      case 'light':
        color = '#F7F7F7';
        break;
      case 'dark':
        color = '#1c1c1c';
        break;
      case 'solarized':
        color = '#01242E'; // Solarized dark background
        break;
      default:
        color = '#1c1c1c'; // Default to dark
    }

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      // Create meta tag if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
  }, [theme]);

  const toggleTheme = () => {
    // Cycle through dark -> light -> solarized -> dark
    const newTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'solarized' : 'dark';
    setTheme(newTheme);
    // No need to set attribute here, useEffect handles it
  };

  // Create context value
  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 