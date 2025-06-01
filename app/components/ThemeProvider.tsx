'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

function ThemeStorageCleaner() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('theme');
      sessionStorage.removeItem('theme');
    }
  }, []);

  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      themes={['light', 'dark', 'solarized', 'system']}
      enableSystem
      disableTransitionOnChange
      themeColor={{
        light: '#F7F7F7',
        dark: '#121212',
        solarized: '#002b36'
      }}
    >
      <ThemeStorageCleaner />
      {children}
    </NextThemesProvider>
  );
} 