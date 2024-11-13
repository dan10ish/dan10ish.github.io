"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import HomeButton from "./HomeButton";
import ScrollToTop from "./ScrollToTop";
import TOCButton from "./TOCButton";

const ButtonsContainer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isBlogPost = pathname.startsWith("/post/");
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = lastScrollY - currentScrollY;

      if (scrollDelta > 10 || currentScrollY < 20) {
        setIsVisible(true);
      } else if (scrollDelta < -10 && currentScrollY > 20) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`buttons-container ${!isVisible ? "hidden" : ""}`}>
      {isBlogPost && <TOCButton />}
      {!isHomePage && <HomeButton />}
      <ScrollToTop />
    </div>
  );
};

export default ButtonsContainer;
