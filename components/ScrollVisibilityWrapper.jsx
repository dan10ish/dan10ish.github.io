"use client";

import { useState, useEffect, useRef } from "react";

const ScrollVisibilityWrapper = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = lastScrollY.current - currentScrollY;

      if (scrollDelta > 10 || currentScrollY < 20) {
        setIsVisible(true);
      } else if (scrollDelta < 0 && currentScrollY > 20) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return children(isVisible);
};

export default ScrollVisibilityWrapper;
