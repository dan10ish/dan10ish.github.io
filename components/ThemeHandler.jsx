"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Monitor, Moon, Palette, Sun } from "lucide-react";

const themes = {
  system: {
    icon: <Monitor size={18} />,
    label: "System",
    colors: ["#fafafa", "#18181b"],
  },
  light: {
    icon: <Sun size={18} />,
    label: "Light",
    colors: ["#ffffff"],
    bg: "#ffffff",
  },
  dark: {
    icon: <Moon size={18} />,
    label: "Dark",
    colors: ["#09090b"],
    bg: "#09090b",
  },
  solarized: {
    icon: <Palette size={18} />,
    label: "Solarized",
    colors: ["#00212b"],
    bg: "#00212b",
  },
};

export function ThemeButton() {
  const [theme, setTheme] = useState("system");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const updateTheme = useCallback((newTheme) => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const effectiveTheme =
      newTheme === "system" ? (prefersDark ? "dark" : "light") : newTheme;
    sessionStorage.setItem("theme", newTheme);

    document.documentElement.setAttribute("data-theme", effectiveTheme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = themes[effectiveTheme]?.bg || themes.light.bg;
    }
  }, []);

  useEffect(() => {
    const sessionTheme = sessionStorage.getItem("theme");
    if (sessionTheme) {
      setTheme(sessionTheme);
      updateTheme(sessionTheme);
    }

    const handleScroll = () => setIsOpen(false);
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = () => theme === "system" && updateTheme("system");

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [theme, updateTheme]);

  const handleThemeChange = useCallback(
    (newTheme) => {
      setTheme(newTheme);
      updateTheme(newTheme);
      setIsOpen(false);
    },
    [updateTheme],
  );

  return (
    <div className="theme-selector" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-button"
        aria-label="Website theme button"
      >
        <span className="theme-button-content">
          {themes[theme]?.icon}
          <span className="theme-button-label">{themes[theme]?.label}</span>
        </span>
      </button>
      {isOpen && (
        <div className="theme-popover">
          {Object.entries(themes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              className={`theme-option ${theme === key ? "active" : ""}`}
              aria-label="Website theme button"
            >
              <span className="theme-option-icon">{value.icon}</span>
              <span className="theme-option-label">{value.label}</span>
              <span className="theme-option-colors">
                {value.colors.map((color, i) => (
                  <span
                    key={i}
                    className="theme-color-preview"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
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
          metaTheme.content = themes[effectiveTheme]?.bg || themes.light.bg;
        }
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return null;
}
