"use client";

import { useEffect } from "react";

export default function ThemeHandler() {
  useEffect(() => {
    const setTheme = (e) => {
      document.documentElement.setAttribute(
        "data-theme",
        e.matches ? "dark" : "light",
      );
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery);
    mediaQuery.addEventListener("change", setTheme);
    return () => mediaQuery.removeEventListener("change", setTheme);
  }, []);

  return null;
}
