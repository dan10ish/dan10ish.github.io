"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { ContrastIcon, ContrastIconHandle } from "./ContrastIcon";

const THEMES = ["gray", "green", "onyx", "solarized"];

export function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const iconRef = useRef<ContrastIconHandle>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // We use "gray" as a safe fallback during SSR to match the default theme,
  // preventing any layout shifts from swapping placeholder DOM elements to buttons.
  const currentTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "gray";
  
  const cycleTheme = () => {
    const currentIndex = THEMES.indexOf(currentTheme as string);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
    iconRef.current?.setThemeState(THEMES[nextIndex]);
  };

  return (
    <button
      className="fixed bottom-6 right-6 p-2 rounded-full text-secondary hover:text-foreground z-50 cursor-pointer focus:outline-none"
      onClick={cycleTheme}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <ContrastIcon 
        ref={iconRef} 
        size={24} 
        currentTheme={currentTheme as string} 
      />
    </button>
  );
}
