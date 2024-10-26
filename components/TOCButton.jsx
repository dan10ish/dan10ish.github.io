"use client";

import { useState, useEffect, useRef } from "react";
import ScrollVisibilityWrapper from "@/components/ScrollVisibilityWrapper";

const TOCButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toc, setToc] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const generateTOC = () => {
      const headers = document.querySelectorAll("h2, h3, h4, h5, h6");
      return Array.from(headers)
        .map((header, index) => {
          const text = header.textContent;
          const id =
            header.id ||
            text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
          if (!header.id) header.id = id;
          return { id, text, level: parseInt(header.tagName.charAt(1)) };
        })
        .filter((item) => item.text.toLowerCase() !== "table of contents");
    };

    const updateTOC = () => setToc(generateTOC());
    updateTOC();

    const observer = new MutationObserver(updateTOC);
    observer.observe(document.body, { childList: true, subtree: true });

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      observer.disconnect();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      setIsOpen(false);
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  if (!toc.length) return null;

  return (
    <ScrollVisibilityWrapper>
      {(isVisible) => (
        <div
          className={`toc-button ${!isVisible ? "toc-hidden" : ""}`}
          ref={menuRef}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="toc-toggle"
            aria-label="Toggle table of contents"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h12" />
              <path d="M4 18h8" />
            </svg>
          </button>
          {isOpen && (
            <div className="toc-menu">
              <div className="toc-header">Table of Contents</div>
              <div className="toc-content">
                <ul>
                  {toc.map((item, index) => (
                    <li
                      key={index}
                      style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </ScrollVisibilityWrapper>
  );
};

export default TOCButton;
