'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const LIGHT_THEME_COLOR = '#f8f8f8';
const DARK_THEME_COLOR = '#0A0A0A';

export function ThemeColorUpdater() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateThemeColor = () => {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');

      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }

      const isDark = document.documentElement.classList.contains('dark');
      const themeColor = isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
      metaThemeColor.setAttribute('content', themeColor);
    };

    const timeoutId = setTimeout(updateThemeColor, 100);

    const observer = new MutationObserver(() => {
      updateThemeColor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [theme, resolvedTheme, mounted]);

  return null;
} 