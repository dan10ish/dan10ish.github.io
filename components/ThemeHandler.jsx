"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const THEME_COLORS = {
  light: {
    background: "#ffffff",
    meta: "#ffffff",
  },
  dark: {
    background: "#1c1c1c",
    meta: "#1c1c1c",
  },
};

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function setTheme(theme, persist = true) {
  const root = document.documentElement;
  const effectiveTheme = theme === "system" ? getSystemTheme() : theme;

  root.setAttribute("data-theme", effectiveTheme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.content = THEME_COLORS[effectiveTheme].meta;
  }

  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }
}

export function ThemeButton() {
  const [currentTheme, setCurrentTheme] = useState("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setCurrentTheme(stored);
      setTheme(stored);
    } else {
      setTheme("system");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (currentTheme === "system") {
        setTheme("system", false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [currentTheme]);

  const toggleTheme = () => {
    const newTheme =
      currentTheme === "system"
        ? getSystemTheme() === "dark"
          ? "light"
          : "dark"
        : currentTheme === "dark"
        ? "light"
        : "dark";

    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  const isDark =
    currentTheme === "dark" ||
    (currentTheme === "system" && getSystemTheme() === "dark");

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-button"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 17 }}
    >
      <span className="theme-button-content">
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </span>
    </motion.button>
  );
}

export default function ThemeHandler() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "system";
    setTheme(theme);
  }, []);

  return null;
}
