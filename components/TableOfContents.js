"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const generateTOC = () => {
      const headers = document.querySelectorAll("h2, h3, h4, h5, h6");
      const tocItems = Array.from(headers).map((header, index) => {
        if (!header.id) {
          header.id = `heading-${index}`;
        }
        return {
          id: header.id,
          text: header.textContent,
          level: parseInt(header.tagName.charAt(1)),
        };
      });
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

  return (
    <nav className="toc">
      <h2>Table of Contents</h2>
      <div className="toc-content">
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
