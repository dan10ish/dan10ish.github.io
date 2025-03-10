"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const HomeButton = dynamic(() => import("./HomeButton"), {
  loading: () => null,
});

const ScrollToTop = dynamic(() => import("./ScrollToTop"), {
  loading: () => null,
});

const TOCButton = dynamic(() => import("./TOCButton"), {
  loading: () => null,
});

export default function ButtonsContainer({ tocData }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const pathname = usePathname();
  const isBlogPost = pathname.startsWith("/post/");
  const isHomePage = pathname === "/";
  const isPhotoPage = pathname === "/?tab=photos";

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

    const checkPhotoModal = () => {
      const photoModalElement = document.querySelector('.photo-modal-container');
      setIsPhotoModalOpen(!!photoModalElement);
    };

    const observer = new MutationObserver(checkPhotoModal);
    observer.observe(document.body, { childList: true, subtree: true });
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    checkPhotoModal();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY]);

  if (isPhotoModalOpen) return null;

  return (
    <div className={`buttons-container ${!isVisible ? "hidden" : ""}`}>
      {isBlogPost && !isPhotoPage && <TOCButton tocData={tocData} />}
      {!isHomePage && !isPhotoPage && <HomeButton />}
      <ScrollToTop />
    </div>
  );
}
