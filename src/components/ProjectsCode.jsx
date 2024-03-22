import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <>
      {/* Header */}
      <div className="header-content">
        <Link to="/">
          <div className="name">
            <h1>Danish Ansari</h1>
          </div>
        </Link>
        {/* Nav */}
        <div className="nav">
          <div className="nav-content">
            <Link to="/about">
              <div className="button one">About</div>
            </Link>
            <Link to="/projects">
              <div className="button two">
                <span className="highlight">Projects</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="project-title">
        <Link to="/projects">
          <div className="title-content">all</div>
        </Link>
        <Link to="/projectsCode">
          <div className="title-content">
            <span className="highlight">code</span>
          </div>
        </Link>
        <Link to="/projectsDesign">
          <div className="title-content">design</div>
        </Link>
      </div>
      <div className="projects">
        <div className="title">
          {" "}
          <a
            href="https://dan10ish.github.io/RoboticArm"
            target="_blank"
            rel="noopener noreferrer"
          >
            robotic <br /> arm
          </a>{" "}
        </div>
        <div className="subtitle">3-DOF robotic arm made using r3f</div>

        <div className="title">
          <a
            href="https://dan10ish.github.io/Galaxy"
            target="_blank"
            rel="noopener noreferrer"
          >
            galaxy
          </a>
        </div>
        <div className="subtitle">Three.js particle system</div>

        <div className="title">
          <a
            href="https://dan10ish.github.io/Office"
            target="_blank"
            rel="noopener noreferrer"
          >
            office
          </a>
        </div>
        <div className="subtitle">r3f site and blender models</div>
      </div>
    </>
  );
}
