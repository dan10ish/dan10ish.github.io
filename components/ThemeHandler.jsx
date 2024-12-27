"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Palette } from "lucide-react";

const themes = {
  light: { bg: "#ffffff", text: "#18181b" },
  dark: { bg: "#09090b", text: "#fafafa" },
  solarized: { bg: "#002b36", text: "#C8D2D2" },
};

function updateTheme(theme) {
  const { bg, text } = themes[theme];
  document.documentElement.setAttribute("data-theme", theme);
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", bg);
  } else {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = bg;
    document.head.appendChild(meta);
  }
}

export function ThemeButton() {
  const [theme, setTheme] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    updateTheme(initialTheme);
  }, []);

  const cycleTheme = () => {
    const themeOrder = ["light", "dark", "solarized"];
    const nextTheme =
      themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    setTheme(nextTheme);
    updateTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  if (!mounted) return null;

  const icons = {
    light: <Sun size={20} />,
    dark: <Moon size={20} />,
    solarized: <Palette size={20} />,
  };

  return (
    <button
      onClick={cycleTheme}
      className="theme-button"
      aria-label="Toggle theme"
    >
      {icons[theme]}
    </button>
  );
}

export default function ThemeHandler() {
  useEffect(() => {
    const init = () => {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const theme = savedTheme || (prefersDark ? "dark" : "light");
      updateTheme(theme);
    };

    init();

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", init);
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", init);
    };
  }, []);

  return null;
}
