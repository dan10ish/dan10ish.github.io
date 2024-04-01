import { React } from "react";
import "./index.css";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Writings from "./components/Writings.jsx";
import Code from "./components/Project/Code.jsx";
import Design from "./components/Project/Design.jsx";

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
      <main>
        <Link to="/">
          <div className="header">Danish</div>
        </Link>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/code" element={<Code />} />
          <Route path="/design" element={<Design />} />
        </Routes>
      </main>
    </>
  );
}
