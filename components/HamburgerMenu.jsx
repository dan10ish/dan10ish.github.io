"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ThemeSelector from "./ThemeSelector";

const Navigation = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let lastScrollY = 0;

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      <button onClick={toggleMenu} className="menu-toggle">
        <svg className="icon" viewBox="0 0 24 24">
          <path
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <div ref={menuRef} className={`menu-content ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link
              href="/"
              className="return-home"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <button onClick={() => handleNavigation("projects")}>
              Projects
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("blog")}>Posts</button>
          </li>
          <li>
            <Link
              href="/pics"
              onClick={() => setIsOpen(false)}
              className="return-home"
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
