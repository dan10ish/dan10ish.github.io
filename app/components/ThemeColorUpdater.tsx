'use client';

import { useEffect } from 'react';

const THEME_COLOR = '#bbb';

export function ThemeColorUpdater() {
  useEffect(() => {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', THEME_COLOR);
  }, []);

  return null;
} 