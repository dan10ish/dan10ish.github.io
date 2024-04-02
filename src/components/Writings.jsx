import { React } from "react";
import "../index.css";
import { Link } from "react-router-dom";

export default function Writings() {
  // Height bug fix
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();

  return (
    <>
      <main>
        <div className="menu">
          <Link to="/">
            <div className="menu-btn">About</div>
          </Link>
          <Link to="/projects">
            <div className="menu-btn">Projects</div>
          </Link>
          <Link to="/writings">
            <div className="menu-btn highlight">Writing</div>
          </Link>
        </div>
        <div className="line"></div>
        <div className="coming-soon">
          <div class="snippet" data-title="dot-pulse">
            <div class="stage">
              <div class="dot-pulse"></div>
            </div>
          </div>
          coming soon
        </div>
      </main>
    </>
  );
}
