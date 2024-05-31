import React, { useState, useEffect } from "react";
import "./index.css";
import Dark from "./Dark.jsx";
import { Routes, Route } from "react-router-dom";

import X from "./assets/X.svg";
import Instagram from "./assets/Instagram.svg";
import Github from "./assets/Github.svg";

import About from "./components/About.jsx";
import Project from "./components/Project.jsx";
import Pictures from "./components/Pictures.jsx";
import Code from "./components/project/Code.jsx";
import Design from "./components/project/Design.jsx";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = document.querySelector("body").getAttribute("data-theme");
    setIsDarkMode(theme === "dark");
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.querySelector("body").setAttribute("data-theme", "light");
      setIsDarkMode(false);
      updateMetaThemeColor("#ffffff"); // Set light mode meta theme color
    } else {
      document.querySelector("body").setAttribute("data-theme", "dark");
      setIsDarkMode(true);
      updateMetaThemeColor("#111111"); // Set dark mode meta theme color
    }
  };

  const updateMetaThemeColor = (color) => {
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", color);
    } else {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      metaThemeColor.setAttribute("content", color);
      document.head.appendChild(metaThemeColor);
    }
  };

  // Height bug fix
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();

  return (
    <>
      <div className="header">
        <a href="https://dan10ish.github.io">
          <div className="name">Danish Ansari</div>
        </a>
        <div className="social">
          <div className="social-title">@dan10ish -&gt; </div>
          <div className="social-icons">
            <a
              href="https://x.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={X} alt="" />
            </a>
            <a
              href="https://www.instagram.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="" />
            </a>
            <a
              href="https://github.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Github} alt="" />
            </a>
          </div>
        </div>
        <div className="dark-mode">
          <Dark toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<About isDarkMode={isDarkMode} />} />
        <Route path="/project" element={<Project />} />
        <Route path="/picture" element={<Pictures />} />
        <Route path="/code" element={<Code />} />
        <Route path="/design" element={<Design />} />
      </Routes>
    </>
  );
}
