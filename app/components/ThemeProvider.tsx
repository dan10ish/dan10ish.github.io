'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      themes={['light', 'dark', 'solarized']}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
} 