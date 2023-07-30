import { React, useState, useEffect } from "react";
import "./index.css";
import Darkmode from "./components/darkMode.jsx";
import pic from "./assets/pictures/danPic.jpeg";
import Landing from "./components/Landing.jsx";
import { Routes, Route } from "react-router-dom";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import { Link } from "react-router-dom";

export default function App() {
  //Custom Loader
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);

  // Fix Height Bug in IOS
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();

  // Get Time
  let date = new Date();
  let n = date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      {loading ? (
        <div className="control">
          <div className="load">
            <div className="loadText">Hey! just a sec,</div>
            <div class="wrapper">
              <div class="pie spinner"></div>
              <div class="pie filler"></div>
              <div class="mask"></div>
            </div>
          </div>
        </div>
      ) : (
        <main>
          {/* Header */}
          <div className="headerContent">
            <div className="pic">
              <Link to="/">
                <img src={pic} alt="" />
              </Link>
            </div>
            <div className="headerTitle">Danish Ansari</div>
            <Darkmode className="toggle" />
          </div>
          <div className="app">
            <div className="time">
              <span className="today">Today </span>
              {n}
            </div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </main>
      )}
    </>
  );
}
