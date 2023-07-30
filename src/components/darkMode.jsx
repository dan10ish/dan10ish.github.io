import React from "react";
import "./styles.css";
import { ReactComponent as Sun } from "../assets/pictures/sun.svg";
import { ReactComponent as Moon } from "../assets/pictures/moon.svg";

export default function darkMode() {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    document.getElementById("light").style.display = "none";
    document.getElementById("dark").style.display = "block";
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    document.getElementById("light").style.display = "block";
    document.getElementById("dark").style.display = "none";
  };

  return (
    <>
      <div className="toggle">
        <div id="light">
          <button onClick={setDarkMode} className="toggleButton">
            <Sun />
          </button>
        </div>
        <div id="dark">
          <button onClick={setLightMode} className="toggleButton">
            <Moon />
          </button>
        </div>
      </div>
    </>
  );
}
