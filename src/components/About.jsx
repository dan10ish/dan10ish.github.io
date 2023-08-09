import React, { useState, useEffect } from "react";
import "./styles.css";
import { ReactComponent as Arrow } from "../assets/pictures/Arrow.svg";
import { Link } from "react-router-dom";
import { ReactComponent as Shape } from "../assets/pictures/Shape.svg";
import one from "../assets/pictures/about/1.jpg";
import two from "../assets/pictures/about/2.jpg";
import three from "../assets/pictures/about/3.jpg";
import four from "../assets/pictures/about/4.jpg";
import five from "../assets/pictures/about/5.jpg";

export default function About() {
  const [showDiv, setShowDiv] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(false);
    }, 7000);
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
    }, 3500);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 3
  const [hideDiv3, setHideDiv3] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv3(true);
    }, 4500);

    return () => clearTimeout(timeoutId);
  }, []);

  // Message 4
  const [hideDiv4, setHideDiv4] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHideDiv4(true);
    }, 7000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="arrow">
        <Link to="/">
          <button>
            <Arrow />
          </button>
        </Link>
      </div>
      <div className="about">
        {hideDiv1 && (
          <div className="message">
            <div className="messageText">
              I am passionate about technology, creativity and continuous
              learning. I've always been intrigued by the intersection of
              engineering and computer science. But I'm not just all about
              technology! I'm also a sports enthusiast who loves playing
              football and basketball.
            </div>
          </div>
        )}
        {hideDiv2 && (
          <div className="message">
            <div className="messageText">
              Lately I've been delving into the interesting realm of deep
              learning, dedicating time to both learning and undertaking
              projects in this cutting-edge field.
            </div>
          </div>
        )}
        {hideDiv3 && (
          <div className="message">
            <div className="messageText">
              Explore my skills and projects on the{" "}
              <Link to="/projects">
                <span className="bold highlight">project page</span>
              </Link>{" "}
              of my website.
            </div>
            <div className="last">
              <Shape />
            </div>
          </div>
        )}

        {/* Carousel */}
        {hideDiv4 && (
          <div className="gallery">
            <img src={one} alt="" />
            <img src={two} alt="" />
            <img src={three} alt="" />
            <img src={four} alt="" />
            <img src={five} alt="" />
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
