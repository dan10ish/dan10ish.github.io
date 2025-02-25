"use client";

import { useState, useEffect, memo } from "react";
import { Moon, Sun } from "lucide-react";

export const ThemeButton = memo(() => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.querySelector('meta[name="theme-color"]').content = 
      newTheme === "dark" ? "#1c1c1c" : "#ffffff";
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
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.querySelector('meta[name="theme-color"]').content = 
      savedTheme === "dark" ? "#1c1c1c" : "#ffffff";

    const handleThemeChange = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      if (!localStorage.getItem("theme")) {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        document.querySelector('meta[name="theme-color"]').content = 
          newTheme === "dark" ? "#1c1c1c" : "#ffffff";
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
