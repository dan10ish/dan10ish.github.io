import { React, useEffect } from "react";
import Blog from "./Blog";

import Footer from "./Footer";

import { useLocation } from "react-router-dom";

import tf from "../assets/icons/TF.svg";
import react from "../assets/icons/React.svg";
import three from "../assets/icons/Three.svg";
import cpp from "../assets/icons/CPP.svg";
import unity from "../assets/icons/Unity.svg";
import matlab from "../assets/icons/matlab.svg";
import fusion from "../assets/icons/fusion.svg";

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
      <div className="writing-section" id="writing-section">
        <Blog />
      </div>
      <div className="about">
        <div className="section-title">
          <h1>About</h1>
          <div className="borderAfter"></div>
        </div>
        <div className="about-content">
          <p>
            Hi, I am <span className="about-special">Danish</span>.
          </p>
          <p>
            I am a <span className="about-special">Mechatronics</span> Engineer
            who enjoys working at the intersection of{" "}
            <span className="about-special">robotics</span>,{" "}
            <span className="about-special">machine learning</span>, and{" "}
            <span className="about-special">computer science</span>
          </p>
          <p>Currently based in Mumbai, IN</p>
          <p>
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
          </p>
          <p>
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
          </p>
          <p>
            In my free time, I explore new{" "}
            <span className="about-special">technologies</span>, write{" "}
            <span className="about-special">code</span>, take{" "}
            <span className="about-special">pictures</span> or play{" "}
            <span className="about-special">football</span>.
          </p>
        </div>
        <div className="section-title">
          <h1>Tech Territory</h1>
          <div className="borderAfter"></div>
        </div>
        <div className="skill-content">
          <div className="skill-img">
            <img src={tf} alt="" />
          </div>
          <div className="skill-img">
            <img src={react} alt="" />
          </div>
          <div className="skill-img">
            <img src={cpp} alt="" />
          </div>
          <div className="skill-img">
            <img src={three} alt="" />
          </div>
          <div className="skill-img">
            <img src={unity} alt="" />
          </div>
          <div className="skill-img">
            <img src={matlab} alt="" />
          </div>
          <div className="skill-img">
            <img src={fusion} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
