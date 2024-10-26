"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const HomeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.6541 11.1511L12.8522 0.354834C12.7406 0.242399 12.6078 0.153157 12.4616 0.092256C12.3153 0.0313549 12.1584 0 12 0C11.8416 0 11.6847 0.0313549 11.5384 0.092256C11.3922 0.153157 11.2594 0.242399 11.1478 0.354834L0.345886 11.1511C0.179347 11.3197 0.066531 11.534 0.021674 11.7667C-0.0231831 11.9994 0.00192862 12.2401 0.0938406 12.4586C0.183881 12.6777 0.336786 12.8652 0.533286 12.9975C0.729786 13.1299 0.961088 13.2012 1.19804 13.2023H2.39826V21.9593C2.42014 22.5204 2.66353 23.05 3.07517 23.4322C3.4868 23.8144 4.03315 24.018 4.59466 23.9986H7.79924C8.11756 23.9986 8.42284 23.8722 8.64792 23.6472C8.87301 23.4222 8.99946 23.1171 8.99946 22.799V16.921C8.99946 16.6029 9.12591 16.2978 9.35099 16.0728C9.57608 15.8478 9.88136 15.7215 10.1997 15.7215H13.8003C14.1186 15.7215 14.4239 15.8478 14.649 16.0728C14.8741 16.2978 15.0005 16.6029 15.0005 16.921V22.799C15.0005 23.1171 15.127 23.4222 15.3521 23.6472C15.5772 23.8722 15.8824 23.9986 16.2008 23.9986H19.4053C19.9668 24.018 20.5132 23.8144 20.9248 23.4322C21.3365 23.05 21.5799 22.5204 21.6017 21.9593V13.2023H22.802C23.0389 13.2012 23.2702 13.1299 23.4667 12.9975C23.6632 12.8652 23.8161 12.6777 23.9062 12.4586C23.9981 12.2401 24.0232 11.9994 23.9783 11.7667C23.9335 11.534 23.8207 11.3197 23.6541 11.1511Z"
      fill="currentColor"
    />
  </svg>
);

const MenuIcon = ({ isOpen }) => (
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
    {isOpen ? (
      <path d="M18 6L6 18M6 6l12 12" />
    ) : (
      <path d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
);

const ThemeIcon = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.1006 0C11.5006 0 11.1006 0.4 11.1006 1V2C11.1006 2.6 11.5006 3 12.1006 3C12.7006 3 13.1006 2.6 13.1006 2V1C13.1006 0.4 12.7006 0 12.1006 0ZM4.2998 3.19922C4.0498 3.19922 3.80059 3.3 3.60059 3.5C3.20059 3.9 3.20059 4.50039 3.60059 4.90039L4.2998 5.59961C4.6998 5.99961 5.3002 5.99961 5.7002 5.59961C6.1002 5.19961 6.1002 4.59922 5.7002 4.19922L5.00098 3.5C4.80098 3.3 4.5498 3.19922 4.2998 3.19922ZM19.9014 3.19922C19.6514 3.19922 19.4002 3.3 19.2002 3.5L18.501 4.19922C18.101 4.59922 18.101 5.19961 18.501 5.59961C18.901 5.99961 19.5014 5.99961 19.9014 5.59961L20.6006 4.90039C21.0006 4.50039 21.0006 3.9 20.6006 3.5C20.4006 3.3 20.1514 3.19922 19.9014 3.19922ZM12.1006 5C10.2441 5 8.46359 5.7375 7.15084 7.05025C5.83808 8.36301 5.10059 10.1435 5.10059 12C5.10059 13.8565 5.83808 15.637 7.15084 16.9497C8.46359 18.2625 10.2441 19 12.1006 19C13.9571 19 15.7376 18.2625 17.0503 16.9497C18.3631 15.637 19.1006 13.8565 19.1006 12C19.1006 10.1435 18.3631 8.36301 17.0503 7.05025C15.7376 5.7375 13.9571 5 12.1006 5ZM1.10059 11C0.500586 11 0.100586 11.4 0.100586 12C0.100586 12.6 0.500586 13 1.10059 13H2.10059C2.70059 13 3.10059 12.6 3.10059 12C3.10059 11.4 2.70059 11 2.10059 11H1.10059ZM22.1006 11C21.5006 11 21.1006 11.4 21.1006 12C21.1006 12.6 21.5006 13 22.1006 13H23.1006C23.7006 13 24.1006 12.6 24.1006 12C24.1006 11.4 23.7006 11 23.1006 11H22.1006ZM5.00098 18.0996C4.75098 18.0996 4.4998 18.2004 4.2998 18.4004L3.60059 19.0996C3.20059 19.4996 3.20059 20.1 3.60059 20.5C4.00059 20.9 4.60098 20.9 5.00098 20.5L5.7002 19.8008C6.1002 19.4008 6.1002 18.8004 5.7002 18.4004C5.5002 18.2004 5.25098 18.0996 5.00098 18.0996ZM19.2002 18.0996C18.9502 18.0996 18.701 18.2004 18.501 18.4004C18.101 18.8004 18.101 19.4008 18.501 19.8008L19.2002 20.5C19.6002 20.9 20.2006 20.9 20.6006 20.5C21.0006 20.1 21.0006 19.4996 20.6006 19.0996L19.9014 18.4004C19.7014 18.2004 19.4502 18.0996 19.2002 18.0996ZM12.1006 21C11.5006 21 11.1006 21.4 11.1006 22V23C11.1006 23.6 11.5006 24 12.1006 24C12.7006 24 13.1006 23.6 13.1006 23V22C13.1006 21.4 12.7006 21 12.1006 21Z"
      fill="currentColor"
    />
  </svg>
);

const PicturesIcon = () => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    <path d="m3 12.5 4.5-4.5a2 2 0 0 1 3 0L15 12" />
  </svg>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const menuRef = useRef(null);
  const themeRef = useRef(null);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateMetaThemeColor(savedTheme);
  }, []);

  const updateMetaThemeColor = (theme) => {
    const themeColors = {
      light: "#ffffff",
      dark: "#000000",
      "solarized-dark": "#00212b",
    };
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColors[theme]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      setIsVisible(
        !scrollingDown || currentScrollY < 100 || isOpen || themeOpen
      );
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, themeOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setThemeOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setThemeOpen(false);
  }, [pathname]);

  const handleNavigation = (section) => {
    setIsOpen(false);
    setThemeOpen(false);

    if (section === "pictures") {
      router.push("/pics");
      return;
    }

    if (pathname !== "/") {
      router.push(`/?section=${section}`);
    } else {
      const target = document.getElementById(section);
      if (target) {
        const offset = 80;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateMetaThemeColor(theme);
    setThemeOpen(false);
  };

  return (
    <nav ref={menuRef} className={`fixed-nav ${isVisible ? "" : "nav-hidden"}`}>
      <div className="nav-content">
        <Link href="/" className="nav-button home-icon-btn" aria-label="Home">
          <HomeIcon />
        </Link>

        <div className="menu-separator mobile-only" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="nav-button menu-toggle-btn mobile-only"
          aria-label="Toggle menu"
        >
          <MenuIcon isOpen={isOpen} />
        </button>

        <div className={`menu-items ${isOpen ? "open" : ""}`}>
          <div ref={themeRef} className="theme-dropdown">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="nav-button theme-icon-btn"
              aria-label="Theme"
            >
              <ThemeIcon />
            </button>

            <div className={`theme-options ${themeOpen ? "open" : ""}`}>
              <button
                onClick={() => changeTheme("light")}
                className="theme-option"
                style={{ background: "#ffffff" }}
                aria-label="Light theme"
              />
              <button
                onClick={() => changeTheme("dark")}
                className="theme-option"
                style={{ background: "#000000" }}
                aria-label="Dark theme"
              />
              <button
                onClick={() => changeTheme("solarized-dark")}
                className="theme-option"
                style={{ background: "#00212b" }}
                aria-label="Solarized dark theme"
              />
            </div>
          </div>

          <button
            onClick={() => handleNavigation("pictures")}
            className="nav-button pictures-icon-btn"
            aria-label="Pictures"
          >
            <PicturesIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
