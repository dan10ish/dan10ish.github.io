import { React } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import fusion from "../assets/fusion.svg";
import matlab from "../assets/matlab.svg";
import react from "../assets/react.svg";
import tf from "../assets/tf.svg";
import three from "../assets/three.svg";
import unity from "../assets/unity.svg";

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
        <div className="menu">
          <Link to="/">
            <div className="menu-btn highlight">About</div>
          </Link>
          <Link to="/projects">
            <div className="menu-btn">Projects</div>
          </Link>
          {/* <Link to="/writings">
            <div className="menu-btn">Writing</div>
          </Link> */}
        </div>
        <div className="line"></div>
        <div className="about-content">
          <div className="about-one">
            I explore the intersection of <span className="special">AI</span>{" "}
            and <span className="special">Robotics</span>
          </div>
          <div className="about-two">
            🎓 <span className="special">Mechatronics</span>, NMIMS '24
          </div>
          <div className="footer">
            <span className="footer-icon">📍</span> Mumbai, IN
          </div>
          <div className="about-three">
            <div className="about-three-one">Tech territory:</div>
            <div className="about-three-two">
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
          <div className="about-four">
            <div className="about-four-one">Contact:</div>
            <div className="about-four-two">
              <div className="about-four-two-two">
                <div className="about-four-two-two-one">
                  <span className="about-lap">• </span>
                  <a
                    href="https://x.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X
                  </a>
                </div>
                <div className="about-four-two-two-three">
                  <span className="about-lap">• </span>
                  <a
                    href="https://github.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github
                  </a>
                </div>
                <div className="about-four-two-two-two">
                  <span className="about-lap">• </span>
                  <a
                    href="https://instagram.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    instagram
                  </a>
                </div>
                <div className="about-four-two-two-four">
                  <span className="about-lap">• </span>
                  <a href="mailto:aaansaridan@gmail.com">mail</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
