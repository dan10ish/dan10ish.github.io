"use client";

const THEME_COLORS = {
  light: "#ffffff",
  dark: "#1c1c1c"
};

/**
 * Updates the document theme and meta tags based on the detected theme
 * @param {string} theme - 'light' or 'dark'
 */
const updateTheme = (theme) => {
  if (typeof document === "undefined") return;
  
  document.documentElement.setAttribute("data-theme", theme);
  
  document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.remove());
  
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = THEME_COLORS[theme] || THEME_COLORS.light;
  document.head.appendChild(meta);
};

export function useSystemTheme() {
  if (typeof window === "undefined") return null;
  
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  
  updateTheme(getSystemTheme());
  
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  
  const handleSystemThemeChange = (e) => {
    const newTheme = e.matches ? "dark" : "light";
    updateTheme(newTheme);
  };
  
  darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
  
  return () => {
    darkModeMediaQuery.removeEventListener("change", handleSystemThemeChange);
  };
}

export const themeInitScript = `
  (function() {
    try {
      const themeColors = {
        light: "#ffffff",
        dark: "#1c1c1c"
      };
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
      
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.content = themeColors[systemTheme] || themeColors.light;
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = themeColors[systemTheme] || themeColors.light;
        document.head.appendChild(meta);
      }
    } catch(e) {}
  })()
`; 