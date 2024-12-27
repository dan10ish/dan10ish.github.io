"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function updateThemeMetaTag(isDark) {
  const themeColor = isDark ? "#09090b" : "#ffffff";
  const textColor = isDark ? "#fafafa" : "#18181b";

  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light",
  );
  document.documentElement.style.setProperty("--color-bg", themeColor);
  document.documentElement.style.setProperty("--color-text", textColor);
  document.documentElement.style.backgroundColor = themeColor;
  document.documentElement.style.color = textColor;

  const metaTags = document.getElementsByTagName("meta");
  for (let i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute("name") === "theme-color") {
      metaTags[i].setAttribute("content", themeColor);
    }
  }
}

export function ThemeButton() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    const isDarkTheme = currentTheme === "dark";

    setIsDark(isDarkTheme);
    updateThemeMetaTag(isDarkTheme);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const theme = newIsDark ? "dark" : "light";

    updateThemeMetaTag(newIsDark);
    localStorage.setItem("theme", theme);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="theme-button"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default function ThemeHandler() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const theme = savedTheme || (systemPrefersDark ? "dark" : "light");
    const isDark = theme === "dark";

    updateThemeMetaTag(isDark);

    if (!savedTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        const newIsDark = e.matches;
        updateThemeMetaTag(newIsDark);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return null;
}
