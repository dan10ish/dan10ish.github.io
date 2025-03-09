"use client";

import { useState, useEffect, memo } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_COLORS = {
  light: "#ffffff",
  dark: "#1c1c1c"
};

export const ThemeButton = memo(() => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  const updateTheme = (newTheme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", THEME_COLORS[newTheme] || THEME_COLORS.light);
    }
    
    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {
      console.error("Failed to save theme:", e);
    }
  };

  useEffect(() => {
    setMounted(true);
    
    const storedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const currentTheme = storedTheme || systemTheme;
    
    setTheme(currentTheme);
    updateTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    updateTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {mounted ? (
        theme === "light" ? <Moon size={20} /> : <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
});

ThemeButton.displayName = "ThemeButton";

export default function ThemeHandler() {
  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      const userTheme = localStorage.getItem("theme");
      if (!userTheme) {
        const newTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
          metaTheme.setAttribute("content", THEME_COLORS[newTheme] || THEME_COLORS.light);
        }
      }
    };

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return null;
}
