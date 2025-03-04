"use client";

import { List } from "lucide-react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const TOCButton = ({ tocData = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const menuRef = useRef(null);
  const isLargeScreen = useRef(false);
  const observerRef = useRef(null);

  const toc = useMemo(() => tocData || [], [tocData]);

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
      },
    );

    toc.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    return () => observerRef.current.disconnect();
  }, [toc]);

  useEffect(() => {
    if (toc.length > 0) {
      createObserver();
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [createObserver, toc]);

  const handleClick = (e, id) => {
    e.preventDefault();
    
    const element = document.getElementById(id);
    if (!element) {
      const matchingItem = toc.find(item => item.id === id);
      if (matchingItem) {
        const headings = document.querySelectorAll("h2, h3, h4, h5, h6");
        const matchingHeading = Array.from(headings).find(
          h => h.textContent.trim() === matchingItem.text.trim()
        );
        
        if (matchingHeading) {
          if (!matchingHeading.id) {
            matchingHeading.id = id;
          }
          scrollToElement(matchingHeading, id);
          return;
        }
      }
      return;
    }
    
    scrollToElement(element, id);
  };
  
  const scrollToElement = (element, id) => {
    setIsOpen(false);
    document.body.style.overflow = "";
    
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    
    setTimeout(() => {
      window.history.pushState(null, null, `#${id}`);
      setActiveId(id);
    }, 100);
  };

  if (!toc.length) return null;

  return (
    <div className="toc-button-wrapper" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="toc-toggle"
        aria-label="Toggle table of contents"
      >
        <List size={36} strokeWidth={2.4}/>
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
