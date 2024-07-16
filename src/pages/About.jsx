import { React, useEffect } from "react";
import Blog from "./Blog";

import { Link, useLocation } from "react-router-dom";

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll to top when navigating from another page
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
        <div className="about-content">
          <div>
            I am a <span className="about-special">Mechatronics</span> Engineer
            who enjoys working at the intersection of{" "}
            <span className="about-special">robotics</span>,{" "}
            <span className="about-special">machine learning</span>, and{" "}
            <span className="about-special">computer science</span>
          </div>
          <div>Currently based in Mumbai, IN</div>
          <div>
            The quickest way to reach me is via{" "}
            <a
              href="mailto:aaansaridan@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              email
            </a>
            , and you can view all my projects on my{" "}
            <a
              href="https://github.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </div>
          <div>
            On other social apps, you can find me by the username{" "}
            <span className="about-special-social">@dan10ish</span>. I am most
            active on{" "}
            <a
              href="https://x.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>{" "}
            and occasionally on{" "}
            <a
              href="https://instagram.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            .
          </div>
          <div>
            In my free time, I explore new{" "}
            <span className="about-special">technologies</span>, write{" "}
            <span className="about-special">code</span>, take{" "}
            <span className="about-special">pictures</span> or play{" "}
            <span className="about-special">football</span>.
          </div>
        </div>
      </div>
      <div className="writing-section" id="writing-section">
        <Blog />
      </div>
    </>
  );
}
