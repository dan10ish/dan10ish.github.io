'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function ThemeColorMeta() {
  const { resolvedTheme, systemTheme } = useTheme();

  useEffect(() => {
    const currentTheme = resolvedTheme || systemTheme;
    const themeColors: Record<string, string> = {
      light: '#F7F7F7',
      dark: '#121212',
      solarized: '#002b36',
    };

    const color = themeColors[currentTheme || 'light'];
    
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', color);
  }, [resolvedTheme, systemTheme]);

  return null;
} 