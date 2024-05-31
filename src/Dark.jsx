import React from "react";
import "./index.css";
import { ReactComponent as Sun } from "./assets/sun.svg";
import { ReactComponent as Moon } from "./assets/moon.svg";

export default function Dark({ toggleTheme, isDarkMode }) {
  return (
    <div className="toggle">
      {isDarkMode ? (
        <button onClick={toggleTheme} className="toggleButton">
          <Moon />
        </button>
      ) : (
        <button onClick={toggleTheme} className="toggleButton">
          <Sun />
        </button>
      )}
    </div>
  );
}
