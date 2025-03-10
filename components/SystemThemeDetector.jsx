"use client";

import { useEffect } from "react";
import { useSystemTheme } from "@/lib/themeDetector";

export default function SystemThemeDetector() {
  useEffect(() => {
    const cleanup = useSystemTheme();

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }
    };
  }, []);

  return null;
}
