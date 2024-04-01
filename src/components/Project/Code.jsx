import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";

export default function Code() {
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
            <div className="menu-btn">About</div>
          </Link>
          <Link to="/projects">
            <div className="menu-btn highlight">Projects</div>
          </Link>
          <Link to="/writings">
            <div className="menu-btn">Writing</div>
          </Link>
        </div>
        <div className="line"></div>
        <div className="projectNav">
          <Link to="/projects">
            <div className="nav">All</div>
          </Link>
          <Link to="/code">
            <div className="nav highlight">Code</div>
          </Link>
          <Link to="/design">
            <div className="nav">Design</div>
          </Link>
        </div>
        <div className="project-content">
          <div className="table-row">
            <div className="table-column title highlight">
              <a
                href="https://dan10ish.github.io/RoboticArm"
                target="_blank"
                rel="noopener noreferrer"
              >
                robotic <br /> arm
              </a>
            </div>
            <div className="table-columns">
              3-DOF robotic arm made using r3f
            </div>
          </div>

          <div className="table-row">
            <div className="table-column title highlight">
              <a
                href="https://dan10ish.github.io/Galaxy"
                target="_blank"
                rel="noopener noreferrer"
              >
                galaxy
              </a>
            </div>
            <div className="table-columns">three.js particle system</div>
          </div>

          <div className="table-row">
            <div className="table-column title highlight">
              <a
                href="https://github.com/dan10ish/3DOF-RoboticArm-C"
                target="_blank"
                rel="noopener noreferrer"
              >
                3-DOF <br /> arm
              </a>
            </div>
            <div className="table-columns">
              complete modelling of 3DOF arm in C
            </div>
          </div>

          <div className="table-row">
            <div className="table-column title highlight">
              <a
                href="https://dan10ish.github.io/Office"
                target="_blank"
                rel="noopener noreferrer"
              >
                office
              </a>
            </div>
            <div className="table-columns">r3f site and blender models</div>
          </div>
        </div>
      </main>
    </>
  );
}
