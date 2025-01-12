"use client";

import { usePathname } from "next/navigation";

export default function GradientOverlay() {
  const pathname = usePathname();
  const hideGradientPaths = ["/notes", "/books", "/photos", "/resources", "/robotics", "/ml", "/finance",];

  return (
    <div
      className="gradient-overlay"
      style={{
        display: hideGradientPaths.includes(pathname) ? "none" : "block",
      }}
    />
  );
}
