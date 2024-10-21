"use client";

import React, { useState, useEffect, useRef } from "react";

const themes = [
  { name: "dark", color: "#000000" },
  { name: "light", color: "#ffffff" },
  { name: "solarized-dark", color: "#00212b" },
];

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const menuRef = useRef(null);
  let lastScrollY = 0;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateMetaThemeColor(savedTheme);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    updateMetaThemeColor(theme);
    setIsOpen(false);
  };

  const updateMetaThemeColor = (theme) => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        themes.find((t) => t.name === theme).color
      );
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="theme-selector" ref={menuRef}>
      <div className="theme-selector-menu">
        {themes.map((theme) => (
          <button
            key={theme.name}
            className={`theme-option ${
              currentTheme === theme.name ? "active" : ""
            }`}
            style={{ backgroundColor: theme.color }}
            onClick={() => changeTheme(theme.name)}
            aria-label={`Select ${theme.name} theme`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
