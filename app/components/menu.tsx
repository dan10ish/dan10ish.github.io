"use client";

import { useState, useEffect } from "react";
import { ChevronUp, Home, Moon, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function Menu() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-3 md:right-5 md:bottom-6 flex flex-col gap-2 z-50">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-2 text-secondary hover:text-foreground transition-colors cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {pathname.startsWith("/finds") && (
        <button
          onClick={() => router.push("/")}
          className="p-2 text-secondary hover:text-foreground transition-colors cursor-pointer"
          aria-label="Go home"
        >
          <Home size={24} />
        </button>
      )}

      <button
        onClick={toggleTheme}
        className="p-2 text-secondary hover:text-foreground transition-colors cursor-pointer"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "light" ? <Moon size={24} /> : <Sun size={24} />}
      </button>
    </div>
  );
}
