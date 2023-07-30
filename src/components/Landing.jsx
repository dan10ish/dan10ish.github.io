import React, { useState, useEffect } from "react";
import "./styles.css";
import { ReactComponent as Shape } from "../assets/pictures/Shape.svg";
import { Link } from "react-router-dom";

export default function Landing() {
  const [showDiv, setShowDiv] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(false);
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Message 1
  const [hideDiv1, setHideDiv1] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv1(true);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 2
  const [hideDiv2, setHideDiv2] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv2(true);
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 3
  const [hideDiv3, setHideDiv3] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv3(true);
    }, 3500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="landing">
        {hideDiv1 && (
          <div className="message">
            <div
              className="messageText"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Hey <span className="wave">👋</span>, I am Danish! A senior
              Mechatronics Engineering student based in Mumbai.
            </div>
          </div>
        )}
        {hideDiv2 && (
          <div className="message">
            <div className="messageText">
              Want to know more{" "}
              <Link to="/about">
                <span className="bold highlight">about me</span>
              </Link>
              ? Or do you want to see some of my{" "}
              <Link to="/projects">
                <span className="bold highlight">projects</span>
              </Link>
              ?
            </div>
          </div>
        )}
        {hideDiv3 && (
          <div className="message">
            <div className="messageText">
              Say hello on{" "}
              <a
                href="https://x.com/dan10ish"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bold highlight">𝕏 (Twitter)</span>
              </a>{" "}
              or{" "}
              <a
                href="https://instagram.com/dan10ish"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bold highlight">Instagram</span>
              </a>
              !
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
