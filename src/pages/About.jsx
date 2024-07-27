import React, { useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Blog = lazy(() => import("./Blog"));

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <div className="about">
        <div className="section-title">
          <div className="name">
            <h1>Danish</h1>
          </div>
          <div className="project-nav">
            <Link to="/projects">Projects</Link>
          </div>
        </div>
        <div className="writing-section" id="writing-section">
          <Suspense fallback={<div>Loading...</div>}>
            <Blog />
          </Suspense>
        </div>
        <div className="about-content">
          I’m a mechatronics engineer based in Mumbai, who explores the
          intersection of robotics, computer science and machine learning.
        </div>
      </div>

      <div className="about-footer">
        <Footer />
      </div>
    </>
  );
}
