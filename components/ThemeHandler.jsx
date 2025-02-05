"use client";

import { useState, useEffect } from "react";
import { Monitor, Moon, Sun, Palette } from "lucide-react";
import { motion } from "framer-motion";

const themes = [
  {
    id: "system",
    icon: Monitor,
    label: "System",
  },
  {
    id: "light",
    icon: Sun,
    label: "Light",
  },
  {
    id: "dark",
    icon: Moon,
    label: "Dark",
  },
  {
    id: "solarized",
    icon: Palette,
    label: "Solarized",
  },
];

const themeColors = {
  light: "#ffffff",
  dark: "#1c1c1c",
  solarized: "#002b36",
};

export function ThemeButton() {
  const [themeIndex, setThemeIndex] = useState(0);

  const updateTheme = (theme) => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const effectiveTheme =
      theme === "system" ? (prefersDark ? "dark" : "light") : theme;
    sessionStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", effectiveTheme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = themeColors[effectiveTheme];
    }
  };

  useEffect(() => {
    const sessionTheme = sessionStorage.getItem("theme");
    if (sessionTheme) {
      const index = themes.findIndex((t) => t.id === sessionTheme);
      if (index !== -1) {
        setThemeIndex(index);
        updateTheme(sessionTheme);
      }
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = () => {
      if (themeIndex === 0) {
        updateTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [themeIndex]);

  const toggleTheme = () => {
    const nextIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(nextIndex);
    updateTheme(themes[nextIndex].id);
  };

  const CurrentIcon = themes[themeIndex].icon;

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-button"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 17 }}
    >
      <span className="theme-button-content">
        <CurrentIcon size={20} />
        <span className="theme-button-label">{themes[themeIndex].label}</span>
      </span>
    </motion.button>
  );
}

export default function ThemeHandler() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const sessionTheme = sessionStorage.getItem("theme");
      if (!sessionTheme || sessionTheme === "system") {
        const effectiveTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", effectiveTheme);
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
          metaTheme.content = themeColors[effectiveTheme];
        }
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return null;
}
