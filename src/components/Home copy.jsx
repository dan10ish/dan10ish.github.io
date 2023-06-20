import React from "react";
import apple from "../assets/apple.svg";
import folder from "../assets/folder.svg";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="path">
          <a href="/">
            <div className="path-name">
              <h2>Home</h2>
            </div>
          </a>
          <a href="/projects">
            <div className="path-name select">
              <h2>Projects</h2>
            </div>
          </a>
        </div>

        {/* Body */}
        <div className="terminal-body">
          {/* Path Icon */}
          <div className="path-icon">
            <div className="apple">
              <img src={apple} alt="" />
            </div>
            <div className="folder">
              <div className="fIcon">
                <img src={folder} alt="" />
              </div>
              <div className="fText">
                <h3>~/Home</h3>
              </div>
            </div>
          </div>
          <br />
          <div className="body-heading">
            <span className="code">&#62;</span>
            <h4>About Me</h4>
          </div>
        </div>
      </div>
    </>
  );
}
