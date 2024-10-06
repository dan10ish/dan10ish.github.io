"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [toc, setToc] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const generateTOC = () => {
      const headers = document.querySelectorAll("h2, h3, h4, h5, h6");
      const tocItems = Array.from(headers)
        .map((header, index) => {
          if (!header.id) {
            header.id = `heading-${index}`;
          }
          return {
            id: header.id,
            text: header.textContent,
            level: parseInt(header.tagName.charAt(1)),
          };
        })
        .filter((item) => item.text.toLowerCase() !== "table of contents");
      setToc(tocItems);
    };

    generateTOC();
    window.addEventListener("load", generateTOC);
    return () => window.removeEventListener("load", generateTOC);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -60;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const toggleTOC = () => {
    setIsOpen(!isOpen);
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <nav className="toc">
      <h2 onClick={toggleTOC}>
        Table of Contents
        <svg
          className={`arrow ${isOpen ? "open" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </h2>
      <div className={`toc-content ${isOpen ? "open" : ""}`}>
        <ul>
          {toc.map((item, index) => (
            <li
              key={index}
              style={{ marginLeft: `${(item.level - 2) * 20}px` }}
            >
              <a href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
