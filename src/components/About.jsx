import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import fusion from "../assets/fusion.svg";
import matlab from "../assets/matlab.svg";
import react from "../assets/react.svg";
import tf from "../assets/tf.svg";
import three from "../assets/three.svg";
import unity from "../assets/unity.svg";
import dthree from "../assets/dark_Three.svg";
import dunity from "../assets/dark_Unity.svg";
import cpp from "../assets/CPP.svg";

import codepic from "../assets/pics/code.jpeg";

export default function About({ isDarkMode }) {
  const [visiblecode, setVisiblecode] = React.useState(false);

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
        <div className="menu">
          <Link to="/">
            <div className="menu-items box">About</div>
          </Link>
          <Link to="/project">
            <div className="menu-items">Projects</div>
          </Link>
          <Link to="/picture">
            <div className="menu-items">Photos</div>
          </Link>
        </div>
        <div className="about">
          <div className="about-one">
            My area of interest combine{" "}
            <span className="special">Robotics</span>,{" "}
            <span className="special">Machine Learning</span> and{" "}
            <span className="special">Computer Science</span>
          </div>
          <div className="about-two">🎓 Mechatronics, NMIMS ‘24</div>
          <div className="about-three">
            <div className="tech">Tech territory:</div>
            <div className="tech-icons">
              <img src={tf} alt="" />
              <img src={react} alt="" />
              <img src={isDarkMode ? dthree : three} alt="" />
              <img src={fusion} alt="" />
              <img src={matlab} alt="" />
              <img src={isDarkMode ? dunity : unity} alt="" />
              <img src={cpp} alt="" />
            </div>
          </div>
          <div className="about-four">
            In my free time I explore new{" "}
            <span className="special">technologies</span>, write{" "}
            <span className="code" onClick={() => setVisiblecode(true)}>
              code
            </span>{" "}
            , take <span className="special">pictures</span> or play{" "}
            <span className="special">football</span>
          </div>
          <div className="about-five">📍 Mumbai, IN</div>
        </div>
      </main>
      {visiblecode && (
        <div className="code-pic">
          <div className="buttonCode" onClick={() => setVisiblecode(false)}>
            X
          </div>
          <img src={codepic} alt="" />
        </div>
      )}
    </>
  );
}
