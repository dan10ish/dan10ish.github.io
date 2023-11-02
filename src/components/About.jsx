import React from "react";
import "../index.css";
import pic from "../assets/dan.jpeg";
import { Link } from "react-router-dom";
import AnimatePage from "../AnimatePage";

export default function About() {
  return (
    <>
      <AnimatePage>
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
                <div className="button one">
                  <span className="highlight">About</span>
                </div>
              </Link>
              <Link to="/projects">
                <div className="button two">Projects</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="about">
          <div className="main-pic">
            <div className="pic">
              <img src={pic} alt="" />
            </div>
            {/* <div className="captured">
              <p>c. May 2023</p>
            </div> */}
          </div>
          <div className="about-text">
            <p>
              Hi! I’m Danish. I’m from Mumbai, currently studying{" "}
              <span className="aboutfancy">Mechatronics</span> (2024) at NMIMS.{" "}
              <br />
              <br />
              I'm all about combining tech and creativity for a sleek and
              functional experience. <br />
              <br />
              In my free time, I continue to explore{" "}
              <span className="aboutfancy">
                {" "}
                AI, robotics, design, automobiles and tech products.
              </span>
            </p>
          </div>
        </div>
      </AnimatePage>
    </>
  );
}
