import { React, useState, useEffect } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import ProjectsCode from "./components/ProjectsCode.jsx";
import ProjectsDesign from "./components/ProjectsDesign.jsx";

export default function App() {
  //Custom Loader
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Fix Height Bug in IOS
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();

  return (
    <>
      {loading ? (
        <div className="control">
          <div class="wave">👋</div>
        </div>
      ) : (
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projectsCode" element={<ProjectsCode />} />
            <Route path="/projectsDesign" element={<ProjectsDesign />} />
          </Routes>
        </main>
      )}
    </>
  );
}
