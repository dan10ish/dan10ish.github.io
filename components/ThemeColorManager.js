"use client";

import { useEffect } from "react";

export default function ThemeColorManager() {
  useEffect(() => {
    const updateThemeColor = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark-mode");
      const themeColor = isDarkMode ? "#001219" : "#ffffff";
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", themeColor);
    };

    updateThemeColor();

    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
