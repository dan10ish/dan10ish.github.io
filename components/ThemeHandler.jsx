"use client";

import { useEffect } from "react";

export default function ThemeHandler() {
  useEffect(() => {
    const setTheme = (isDark) => {
      const root = document.documentElement;
      const themeColor = isDark ? "#09090b" : "#ffffff";
      root.setAttribute("data-theme", isDark ? "dark" : "light");
      const metaThemeColor = document.querySelector("meta[name='theme-color']");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", themeColor);
      }
      root.style.backgroundColor = themeColor;
      root.style.color = isDark ? "#fafafa" : "#18181b";
    };

    const handleThemeChange = (e) => setTheme(e.matches);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return null;
}
