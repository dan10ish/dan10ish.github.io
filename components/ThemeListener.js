"use client";

import { useEffect } from "react";

export default function ThemeListener() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateTheme = (e) => {
      const theme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.querySelector('meta[name="theme-color"]').content = 
        theme === "dark" ? "#1c1c1c" : "#ffffff";
    };

    mediaQuery.addEventListener("change", updateTheme);
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  return null;
} 