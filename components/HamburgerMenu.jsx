"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ThemeSelector from "./ThemeSelector";

const Navigation = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      scrollToSection(section);
    }
  }, [searchParams]);

  const scrollToSection = (section) => {
    const target = document.getElementById(section);
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavigation = (section) => {
    setIsOpen(false);
    if (pathname !== "/") {
      router.push(`/?section=${section}`);
    } else {
      scrollToSection(section);
    }
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`menu-toggle ${!visible ? "hidden" : ""}`}
        style={{
          opacity: mounted ? 1 : 0,
          pointerEvents: mounted ? "auto" : "none",
        }}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <svg className="icon" viewBox="0 0 24 24">
          <path
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <div
        ref={menuRef}
        className={`menu-content ${isOpen && mounted ? "open" : ""}`}
        style={{
          pointerEvents: mounted && isOpen ? "auto" : "none",
          display: mounted ? "block" : "none",
        }}
        aria-hidden={!isOpen}
      >
        <ul>
          <li>
            <Link
              href="/"
              tabIndex={!isOpen ? -1 : 0}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <button
              tabIndex={!isOpen ? -1 : 0}
              onClick={() => handleNavigation("projects")}
            >
              Projects
            </button>
          </li>
          <li>
            <button
              tabIndex={!isOpen ? -1 : 0}
              onClick={() => handleNavigation("blog")}
            >
              Posts
            </button>
          </li>
          <li>
            <Link
              href="/pics"
              tabIndex={!isOpen ? -1 : 0}
              onClick={() => setIsOpen(false)}
            >
              Pictures
            </Link>
          </li>
        </ul>
        <ThemeSelector />
      </div>
      {children}
    </>
  );
};

export default Navigation;
