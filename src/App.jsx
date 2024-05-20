import React from "react";
import "./index.css";

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
      </div>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/picture" element={<Pictures />} />
        <Route path="/code" element={<Code />} />
        <Route path="/design" element={<Design />} />
      </Routes>
    </>
  );
}
