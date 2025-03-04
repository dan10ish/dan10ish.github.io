"use client";

import { useState, useEffect, memo } from "react";
import { Moon, Sun } from "lucide-react";

const updateThemeColors = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", theme === "dark" ? "#1c1c1c" : "#ffffff");
  }
};

export const ThemeButton = memo(() => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(savedTheme);
    updateThemeColors(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    updateThemeColors(newTheme);
    localStorage.setItem("theme", newTheme);
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
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(savedTheme);
    updateThemeColors(savedTheme);

    const handleThemeChange = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      if (!localStorage.getItem("theme")) {
        setTheme(newTheme);
        updateThemeColors(newTheme);
      }
    };

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeMediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return null;
}
