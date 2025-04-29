'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Monitor } from 'lucide-react';

type Theme = 'light' | 'dark' | 'solarized';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const defaultContextValue: ThemeContextType = {
  theme: 'dark',
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as Theme || 'dark';
    setTheme(currentTheme);
  }, []);


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

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
        color = '#01242E';
        break;
      default:
        color = '#1c1c1c';
    }

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'solarized' : 'dark';
    setTheme(newTheme);
  };

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