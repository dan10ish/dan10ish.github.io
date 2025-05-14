'use client';

import { useEffect } from 'react';

const LIGHT_THEME_COLOR = '#F7F7F7'; 
const DARK_THEME_COLOR = '#121212';

export function ThemeColorUpdater() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateThemeColor = (matches: boolean) => {
      let color = matches ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');

      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute('content', color);
    };

    updateThemeColor(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      updateThemeColor(e.matches);
    };

    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return null;
} 