"use client";

import { useState, useEffect, memo, useCallback, useRef } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_COLORS = {
  light: "#ffffff",
  dark: "#1c1c1c"
};

let currentTheme = null;

const updateThemeColors = (theme) => {
  if (!theme) return;
  
  currentTheme = theme;
  
  document.documentElement.setAttribute("data-theme", theme);
  
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);
  }
  
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    console.error("Failed to save theme to localStorage:", e);
  }
};

const getThemePreference = () => {
  try {
    return localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch (e) {
    return "light";
  }
};

const setupGlobalListeners = () => {
  const forceUpdateThemeColor = () => {
    if (currentTheme) {
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute("content", THEME_COLORS[currentTheme] || THEME_COLORS.light);
      }
    }
  };
  
  window.addEventListener("scroll", forceUpdateThemeColor, { passive: true });
  window.addEventListener("popstate", forceUpdateThemeColor);
  window.addEventListener("pageshow", forceUpdateThemeColor);
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      forceUpdateThemeColor();
    }
  });
  
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          forceUpdateThemeColor();
        }
      });
    });
    
    observer.observe(document.body);
  }
  
  document.addEventListener("DOMContentLoaded", forceUpdateThemeColor);
};

export const ThemeButton = memo(() => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const listenerSetupRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = getThemePreference();
    setTheme(savedTheme);
    updateThemeColors(savedTheme);
    
    if (!listenerSetupRef.current) {
      setupGlobalListeners();
      listenerSetupRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      updateThemeColors(theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    updateThemeColors(newTheme);
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
  const listenerSetupRef = useRef(false);

  useEffect(() => {
    const savedTheme = getThemePreference();
    updateThemeColors(savedTheme);
    
    const handleSystemThemeChange = (e) => {
      const userSetTheme = localStorage.getItem("theme");
      if (!userSetTheme) {
        const newTheme = e.matches ? "dark" : "light";
        updateThemeColors(newTheme);
      }
    };

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
    
    if (!listenerSetupRef.current) {
      setupGlobalListeners();
      listenerSetupRef.current = true;
    }

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return null;
}
