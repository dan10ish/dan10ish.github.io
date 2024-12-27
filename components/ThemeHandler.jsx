"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

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
    setIsDark(currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const theme = newIsDark ? "dark" : "light";
    const themeColor = newIsDark ? "#09090b" : "#ffffff";
    const textColor = newIsDark ? "#fafafa" : "#18181b";

    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--color-bg", themeColor);
    document.documentElement.style.setProperty("--color-text", textColor);
    document.documentElement.style.backgroundColor = themeColor;
    document.documentElement.style.color = textColor;

    const metas = document.getElementsByTagName("meta");
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === "theme-color") {
        metas[i].setAttribute("content", themeColor);
      }
    }

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
    const themeColor = isDark ? "#09090b" : "#ffffff";
    const textColor = isDark ? "#fafafa" : "#18181b";

    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--color-bg", themeColor);
    document.documentElement.style.setProperty("--color-text", textColor);
    document.documentElement.style.backgroundColor = themeColor;
    document.documentElement.style.color = textColor;

    const metas = document.getElementsByTagName("meta");
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === "theme-color") {
        metas[i].setAttribute("content", themeColor);
      }
    }

    if (!savedTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        const newIsDark = e.matches;
        const themeColor = newIsDark ? "#09090b" : "#ffffff";
        const textColor = newIsDark ? "#fafafa" : "#18181b";
        const theme = newIsDark ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.setProperty("--color-bg", themeColor);
        document.documentElement.style.setProperty("--color-text", textColor);
        document.documentElement.style.backgroundColor = themeColor;
        document.documentElement.style.color = textColor;

        const metas = document.getElementsByTagName("meta");
        for (let i = 0; i < metas.length; i++) {
          if (metas[i].getAttribute("name") === "theme-color") {
            metas[i].setAttribute("content", themeColor);
          }
        }
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return null;
}
