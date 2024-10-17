"use client";

import React, { useState, useEffect } from "react";

const themes = [
  { name: "dark", color: "#000000" },
  { name: "light", color: "#ffffff" },
  { name: "solarized-dark", color: "#00212b" },
];

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    <div className={`theme-selector ${visible ? "" : "hidden"}`}>
      <button
        className="theme-selector-toggle"
        onClick={toggleMenu}
        style={{
          backgroundColor: themes.find((t) => t.name === currentTheme).color,
        }}
        aria-label="Toggle theme selector"
      />
      <div className={`theme-selector-menu ${isOpen ? "open" : ""}`}>
        {themes.map((theme) => (
          <button
            key={theme.name}
            className="theme-option"
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
