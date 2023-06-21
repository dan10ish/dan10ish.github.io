import React from "react";
import apple from "../assets/apple.svg";
import folder from "../assets/folder.svg";
import github from "../assets/contact/github.svg";
import "../index.css";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <>
      <div className="projects">
        <div className="path">
          <Link to="/">
            <div className="path-name select">
              <h2>Home</h2>
            </div>
          </Link>
          <Link to="/projects">
            <div className="path-name">
              <h2>Projects</h2>
            </div>
          </Link>
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
                <h3>~/Projects</h3>
              </div>
            </div>
          </div>

          <div className="body-heading gittwo">
            <h4>Projects</h4>
            <div className="git">
              <a
                href="https://github.com/dan10ish"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={github} alt="" />
              </a>
            </div>
          </div>

          <div class="pLinks">
            <div class="link">
              <span class="arrow">&#x3e;</span>
              <a
                href="https://danish.dev/Galaxy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Galaxy Generator
              </a>
            </div>
            <div className="link">
              <span class="arrow">&#x3e;</span>
              <a
                href="https://danish.dev/Office/"
                target="_blank"
                rel="noopener noreferrer"
              >
                3D Office
              </a>
            </div>
            <div class="link">
              <span class="arrow">&#x3e;</span>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=danish.mariana-theme"
                target="_blank"
                rel="noopener noreferrer"
              >
                VSCode Theme
              </a>
            </div>
            <div class="link">
              <span class="arrow">&#x3e;</span>
              <a
                href="https://github.com/dan10ish/linkedin-clone"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Clone
              </a>
            </div>
            <div class="link">
              <span class="arrow">&#x3e;</span>
              <a
                href="https://github.com/dan10ish/CommentToxicity/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comment Toxicity Classification
              </a>
            </div>
            <div class="link">
              <span class="arrow">&#x3e;</span>
              <a
                href="https://github.com/dan10ish/Unity-Terminal_Hacker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terminal Hacker
              </a>
            </div>
            <div class="link">
              <span class="arrow">&#x3e;</span>
              <a
                href="https://github.com/dan10ish/Brick-Breaker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brick Breaker
              </a>
            </div>
          </div>
          <div className="pLoad">
            <div className="projectLoading">
              <div className="more">
                <span className="load">
                  <span className="loading-dot">.</span>
                  <span className="loading-dot">.</span>
                  <span className="loading-dot">.</span>
                </span>
                <span className="loading-text">in progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
