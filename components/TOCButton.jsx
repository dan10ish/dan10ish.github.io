"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const TOCButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState("");
  const menuRef = useRef(null);
  const isLargeScreen = useRef(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      isLargeScreen.current = window.innerWidth >= 768;
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (isLargeScreen.current) {
        const handleScroll = () => setIsOpen(false);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const createObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.5,
      }
    );

    document.querySelectorAll("h2, h3, h4, h5, h6").forEach((heading) => {
      if (heading.id) {
        observerRef.current.observe(heading);
      }
    });

    return () => observerRef.current.disconnect();
  }, []);

  useEffect(() => {
    const generateTOC = () => {
      const headers = document.querySelectorAll("h2, h3, h4, h5, h6");
      return Array.from(headers)
        .map((header) => {
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
        .filter(
          (item) =>
            item.text.toLowerCase() !== "table of contents" &&
            item.text.toLowerCase() !== "footnotes"
        );
    };

    const updateTOC = () => {
      setToc(generateTOC());
      createObserver();
    };

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
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [createObserver]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    setIsOpen(false);
    document.body.style.overflow = "";

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  if (!toc.length) return null;

  return (
    <div className="toc-button-wrapper" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="toc-toggle"
        aria-label="Toggle table of contents"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M91.89 238.457c-29.899 0-54.133 24.239-54.133 54.134 0 29.899 24.234 54.137 54.133 54.137s54.138-24.238 54.138-54.137c0-29.896-24.239-54.134-54.138-54.134z" />
          <path d="M91.89 462.463c-29.899 0-54.133 24.239-54.133 54.139 0 29.895 24.234 54.133 54.133 54.133s54.138-24.238 54.138-54.133c0-29.9-24.239-54.139-54.138-54.139z" />
          <path d="M91.89 686.475c-29.899 0-54.133 24.237-54.133 54.133 0 29.899 24.234 54.138 54.133 54.138s54.138-24.238 54.138-54.138c0-29.896-24.239-54.133-54.138-54.133z" />
          <path d="M941.26 234.723H328.964c-28.867 0-52.263 23.4-52.263 52.268v3.734c0 28.868 23.396 52.269 52.263 52.269H941.26c28.869 0 52.269-23.401 52.269-52.269v-3.734c-0.001-28.868-23.4-52.268-52.269-52.268z" />
          <path d="M941.26 682.74H328.964c-28.867 0-52.263 23.399-52.263 52.268v3.734c0 28.863 23.396 52.269 52.263 52.269H941.26c28.869 0 52.269-23.405 52.269-52.269v-3.734c-0.001-28.868-23.4-52.268-52.269-52.268z" />
          <path d="M709.781 458.729H328.964c-28.867 0-52.263 23.4-52.263 52.269v3.734c0 28.873 23.396 52.269 52.263 52.269h380.817c28.866 0 52.271-23.396 52.271-52.269v-3.734c0.001-28.869-23.405-52.269-52.271-52.269z" />
        </svg>
      </button>

      {isOpen && (
        <div className="toc-menu">
          <div className="toc-header">
            Table of Contents
            <button
              onClick={() => setIsOpen(false)}
              className="toc-close"
              aria-label="Close table of contents"
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
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="toc-content">
            <ul>
              {toc.map((item, index) => (
                <li
                  key={index}
                  style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={activeId === item.id ? "active" : ""}
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
  );
};

export default TOCButton;
