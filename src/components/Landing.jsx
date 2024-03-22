import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import tf from "../assets/skills/tf.svg";
import react from "../assets/skills/react.svg";
import three from "../assets/skills/three.svg";
import fusion from "../assets/skills/fusion.svg";
import matlab from "../assets/skills/matlab.svg";
import unity from "../assets/skills/unity.svg";
import AnimatePage from "../AnimatePage";

export default function Landing() {
  return (
    <>
      <AnimatePage>
        <main>
          {/* Header */}
          <div className="header-content">
            <Link to="/">
              <div className="name">
                <span className="highlight">
                  <h1>Danish Ansari</h1>
                </span>
              </div>
            </Link>
            {/* Nav */}
            <div className="nav">
              <div className="nav-content">
                <Link to="/about">
                  <div className="button one">About</div>
                </Link>
                <Link to="/projects">
                  <div className="button two">Projects</div>
                </Link>
              </div>
            </div>
          </div>
          {/* Landing */}
          <div className="landing">
            <div className="l-one">
              <p>Student | Creative Enthusiast</p>
            </div>

            <div className="l-two">
              <p>
                I explore the intersection of{" "}
                <span className="aboutfancy">AI and Robotics</span>.
                <br />
                <br />
                I like to code, design and make creative stuff.
                <br />
                Currently studying Mechatronics at NMIMS.
              </p>
            </div>

            <div className="l-links">
              <p>I am on:</p>
              <ul>
                <li>
                  <a
                    href="https://github.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="l">Github</span> 💻
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="l">𝕏</span> 🐦
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="l">Instagram</span> 📷
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dan10ish/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="l">LinkedIn</span> 💼
                  </a>
                </li>
              </ul>
            </div>

            <div className="l-skills">
              <p>Familiar tech territory :</p>
              <div className="icons">
                <div className="icon">
                  <img src={tf} alt="" />
                </div>
                <div className="icon">
                  <img src={react} alt="" />
                </div>
                <div className="icon">
                  <img src={three} alt="" />
                </div>
                <div className="icon">
                  <img src={fusion} alt="" />
                </div>
                <div className="icon">
                  <img src={matlab} alt="" />
                </div>
                <div className="icon">
                  <img src={unity} alt="" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </AnimatePage>
    </>
  );
}
