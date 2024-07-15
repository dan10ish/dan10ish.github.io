import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../index.css";
import openIcon from "../assets/icons/open.svg";
import closeIcon from "../assets/icons/close.svg";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavBar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest(".nav-bar") &&
        !event.target.closest(".nav-toggle-icon")
      ) {
        closeNavBar();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className={`nav-bar ${isOpen ? "open" : ""}`}>
        <div className="nav-toggle-icon" onClick={toggleNavBar}>
          <img src={isOpen ? closeIcon : openIcon} alt="Toggle Nav" />
        </div>
        <div className={`nav-items ${isOpen ? "open" : ""}`}>
          <div className="row-one-item">
            <NavLink to="/">Home</NavLink>
          </div>
          <div className="row-one-item">
            <NavLink to="/projects">Projects</NavLink>
          </div>
          <div className="row-one-item">
            <NavLink to="/gallery">Gallery</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
