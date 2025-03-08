"use client";

import { usePathname } from "next/navigation";

export default function GradientOverlay() {
  const pathname = usePathname();
  const hideGradientPaths = [
    "/photos",
    "/",
  ];

  return (
    <div
      className="gradient-overlay"
      style={{
        display: hideGradientPaths.includes(pathname) ? "none" : "block",
      }}
    />
  );
}
