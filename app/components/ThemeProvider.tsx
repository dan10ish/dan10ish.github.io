'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
      themeColor={{
        light: '#F7F7F7',
        dark: '#121212'
      }}
    >
      {children}
    </NextThemesProvider>
  );
} 