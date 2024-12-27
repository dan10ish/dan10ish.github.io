"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Palette } from "lucide-react";

function updateThemeMetaTag(theme) {
  let themeColor, textColor;

  switch (theme) {
    case "dark":
      themeColor = "#09090b";
      textColor = "#fafafa";
      break;
    case "solarized":
      themeColor = "#002b36";
      textColor = "#C8D2D2";
      break;
    default:
      themeColor = "#ffffff";
      textColor = "#18181b";
  }

  document.documentElement.setAttribute("data-theme", theme);

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

  console.log(
    `Theme applied: ${theme}, Color: ${themeColor}, Text: ${textColor}`,
  );
}

export function ThemeButton() {
  const [themeState, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);

  const themeIcons = {
    light: <Sun size={20} />,
    dark: <Moon size={20} />,
    solarized: <Palette size={20} />,
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "light";

    const initialTheme =
      savedTheme === "light"
        ? "light"
        : savedTheme === "solarized"
          ? "solarized"
          : "dark";

    setThemeState(initialTheme);
    updateThemeMetaTag(initialTheme);
  }, []);

  const cycleTheme = () => {
    const themeOrder = ["light", "dark", "solarized"];
    const currentIndex = themeOrder.indexOf(themeState);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

    setThemeState(nextTheme);
    updateThemeMetaTag(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={cycleTheme}
      className="theme-button"
      aria-label="Toggle theme"
    >
      {themeIcons[themeState]}
    </button>
  );
}

export default function ThemeHandler() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    const theme =
      savedTheme === "light"
        ? "light"
        : savedTheme === "solarized"
          ? "solarized"
          : "dark";

    updateThemeMetaTag(theme);

    if (!savedTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        const newTheme = e.matches ? "dark" : "light";
        updateThemeMetaTag(newTheme);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return null;
}
