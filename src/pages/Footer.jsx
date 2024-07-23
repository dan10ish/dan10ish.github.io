import React from "react";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="socials">
          <div className="div">
            <a
              href="https://x.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </div>
          <div className="div">
            <a
              href="https://github.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="div">
            <a
              href="https://linkedin.com/in/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="copyright">
          <span className="copy">©</span> 2024 Danish Ansari
        </div>
      </div>
    </>
  );
}
