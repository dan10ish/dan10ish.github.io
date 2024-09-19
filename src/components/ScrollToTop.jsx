import React, { useState, useEffect } from "react";
import useScrollDirection from "../hooks/useScrollDirection";

const ScrollToTop = () => {
  const [shouldHide, setShouldHide] = useState(true);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollThreshold = 300;
      if (window.pageYOffset > scrollThreshold) {
        setShouldHide(scrollDirection === "up");
      } else {
        setShouldHide(true);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [scrollDirection]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`scroll-to-top ${shouldHide ? "hide" : ""}`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </div>
  );
};

export default ScrollToTop;
