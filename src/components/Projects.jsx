import React, { useState, useEffect } from "react";
import "./styles.css";
import { ReactComponent as Arrow } from "../assets/pictures/Arrow.svg";
import { Link } from "react-router-dom";
import { ReactComponent as Shape } from "../assets/pictures/Shape.svg";

export default function Projects() {
  const [showDiv, setShowDiv] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(false);
    }, 10500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Message 1
  const [hideDiv1, setHideDiv1] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv1(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 2
  const [hideDiv2, setHideDiv2] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv2(true);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 3
  const [hideDiv3, setHideDiv3] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv3(true);
    }, 4700);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 4
  const [hideDiv4, setHideDiv4] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv4(true);
    }, 5700);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 5
  const [hideDiv5, setHideDiv5] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv5(true);
    }, 6200);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 6
  const [hideDiv6, setHideDiv6] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv6(true);
    }, 6900);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 7
  const [hideDiv7, setHideDiv7] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv7(true);
    }, 7500);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 8
  const [hideDiv8, setHideDiv8] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv8(true);
    }, 8100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 9
  const [hideDiv9, setHideDiv9] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv9(true);
    }, 8600);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 10
  const [hideDiv10, setHideDiv10] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv10(true);
    }, 10500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="arrow arrowhg">
        <Link to="/">
          <button>
            <Arrow />
          </button>
        </Link>
      </div>
      <div className="projects">
        {hideDiv1 && (
          <div className="message">
            <div className="messageText">
              I know my way around various{" "}
              <span className="sb">Javascript</span> libraries like{" "}
              <span className="sb">React</span> and{" "}
              <span className="sb">Three.js</span> (
              <span className="sb">react-three-fiber</span>). I use{" "}
              <span className="sb">Unity</span> for making mobile friendly 3D
              games and I use <span className="sb">Blender</span> most of the
              times for creating assets for my 3D websites and games.
            </div>
          </div>
        )}
        {hideDiv2 && (
          <div className="message">
            <div className="messageText">
              Over the years, I have used <span className="sb">Python</span>,{" "}
              <span className="sb">C++</span>, <span className="sb">C#</span>{" "}
              and <span className="sb">Javascript</span> extensively. I'm no
              stranger to design tools either, with experience in{" "}
              <span className="sb">Fusion 360</span> and{" "}
              <span className="sb">AutoCAD</span>. Below are some of my projects
              :
            </div>
          </div>
        )}
        {hideDiv3 && (
          <div className="message">
            <div className="messageText">
              <span className="bold">
                <a
                  href="https://danishansari.in/Galaxy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Galaxy Generator
                </a>
              </span>
            </div>
          </div>
        )}
        {hideDiv4 && (
          <div className="message">
            <div className="messageText">
              <span className="bold">
                <a
                  href="https://github.com/dan10ish/CommentToxicity/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Comment Toxicity Classification
                </a>
              </span>
            </div>
          </div>
        )}
        {hideDiv5 && (
          <div className="message">
            <div className="messageText">
              <span className="bold">
                <a
                  href="https://danishansari.in/Office/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  3D Office
                </a>
              </span>
            </div>
          </div>
        )}
        {hideDiv6 && (
          <div className="message">
            <div className="messageText">
              <span className="bold">
                <a
                  href="https://github.com/dan10ish/Unity-Terminal_Hacker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terminal Hacker
                </a>
              </span>
            </div>
          </div>
        )}
        {hideDiv7 && (
          <div className="message">
            <div className="messageText">
              <span className="bold">
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=danish.mariana-theme"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VSCode Theme
                </a>
              </span>
            </div>
          </div>
        )}
        {hideDiv8 && (
          <div className="message">
            <div className="messageText">
              <span className="bold">
                <a
                  href="https://github.com/dan10ish/linkedin-clone"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn Clone
                </a>
              </span>
            </div>
          </div>
        )}
        {hideDiv9 && (
          <div className="message">
            <div className="messageText">
              <span className="bold">
                <a
                  href="https://github.com/dan10ish/Brick-Breaker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brick Breaker
                </a>
              </span>
            </div>
          </div>
        )}
        {hideDiv10 && (
          <div className="message">
            <div className="messageText">
              Head over to my{" "}
              <span className="bold">
                <a
                  href="https://github.com/dan10ish/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </span>{" "}
              profile to learn more about my projects.
            </div>
            <div className="last">
              <Shape />
            </div>
          </div>
        )}
        {hideDiv1 && <div className="seen">Seen</div>}
        {showDiv && (
          <div className="placeholder">
            <div className="circles">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
