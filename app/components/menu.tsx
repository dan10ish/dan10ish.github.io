"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Home, Moon, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Menu() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check system preference initially
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark");
    }

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

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-2 text-secondary hover:text-foreground transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {pathname !== "/" && (
        <button
          onClick={() => router.push("/")}
          className="p-2 text-secondary hover:text-foreground transition-colors"
          aria-label="Go home"
        >
          <Home size={24} />
        </button>
      )}

      <button
        onClick={toggleTheme}
        className="p-2 text-secondary hover:text-foreground transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
      </button>
    </div>
  );
}
