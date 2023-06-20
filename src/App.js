import { React, useState, useEffect } from "react";
import "./index.css";
import Home from "./components/Home";
import Projects from "./components/Projects";
import { Routes, Route } from "react-router-dom";

export default function App() {
  //Custom Loader
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 11000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="control">
          <span class="loadStart">
            <span class="loadingdot">.</span>
            <span class="loadingdot">.</span>
            <span class="loadingdot">.</span>
          </span>
        </div>
      ) : (
        <main>
          <div className="terminal">
            {/* Header */}
            <header>
              <div className="heading">
                <div className="dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <div className="terminal-name">
                  <h1>¯\_(ツ)_/¯</h1>
                </div>
              </div>
            </header>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </main>
      )}
    </>
  );
}
