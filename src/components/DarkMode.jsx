import React, { useState, useEffect } from "react";
import useScrollDirection from "../hooks/useScrollDirection";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#001219");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#f5f0e5");
      setIsDarkMode(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#001219");
      setIsDarkMode(true);
    }
  };

  return (
    <div className={`darkmode-button ${scrollDirection === "down" ? "hide-on-scroll" : ""}`}>
      <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
        {isDarkMode ? (
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 0C14.25 0 13.75 0.5 13.75 1.25V2.5C13.75 3.25 14.25 3.75 15 3.75C15.75 3.75 16.25 3.25 16.25 2.5V1.25C16.25 0.5 15.75 0 15 0ZM5.24902 3.99902C4.93652 3.99902 4.625 4.125 4.375 4.375C3.875 4.875 3.875 5.62549 4.375 6.12549L5.24902 6.99951C5.74902 7.49951 6.49951 7.49951 6.99951 6.99951C7.49951 6.49951 7.49951 5.74902 6.99951 5.24902L6.12549 4.375C5.87549 4.125 5.56152 3.99902 5.24902 3.99902ZM24.751 3.99902C24.4385 3.99902 24.1245 4.125 23.8745 4.375L23.0005 5.24902C22.5005 5.74902 22.5005 6.49951 23.0005 6.99951C23.5005 7.49951 24.251 7.49951 24.751 6.99951L25.625 6.12549C26.125 5.62549 26.125 4.875 25.625 4.375C25.375 4.125 25.0635 3.99902 24.751 3.99902ZM15 6.25C12.6794 6.25 10.4538 7.17187 8.81282 8.81282C7.17187 10.4538 6.25 12.6794 6.25 15C6.25 17.3206 7.17187 19.5462 8.81282 21.1872C10.4538 22.8281 12.6794 23.75 15 23.75C17.3206 23.75 19.5462 22.8281 21.1872 21.1872C22.8281 19.5462 23.75 17.3206 23.75 15C23.75 12.6794 22.8281 10.4538 21.1872 8.81282C19.5462 7.17187 17.3206 6.25 15 6.25ZM1.25 13.75C0.5 13.75 0 14.25 0 15C0 15.75 0.5 16.25 1.25 16.25H2.5C3.25 16.25 3.75 15.75 3.75 15C3.75 14.25 3.25 13.75 2.5 13.75H1.25ZM27.5 13.75C26.75 13.75 26.25 14.25 26.25 15C26.25 15.75 26.75 16.25 27.5 16.25H28.75C29.5 16.25 30 15.75 30 15C30 14.25 29.5 13.75 28.75 13.75H27.5ZM6.12549 22.6245C5.81299 22.6245 5.49902 22.7505 5.24902 23.0005L4.375 23.8745C3.875 24.3745 3.875 25.125 4.375 25.625C4.875 26.125 5.62549 26.125 6.12549 25.625L6.99951 24.751C7.49951 24.251 7.49951 23.5005 6.99951 23.0005C6.74951 22.7505 6.43799 22.6245 6.12549 22.6245ZM23.8745 22.6245C23.562 22.6245 23.2505 22.7505 23.0005 23.0005C22.5005 23.5005 22.5005 24.251 23.0005 24.751L23.8745 25.625C24.3745 26.125 25.125 26.125 25.625 25.625C26.125 25.125 26.125 24.3745 25.625 23.8745L24.751 23.0005C24.501 22.7505 24.187 22.6245 23.8745 22.6245ZM15 26.25C14.25 26.25 13.75 26.75 13.75 27.5V28.75C13.75 29.5 14.25 30 15 30C15.75 30 16.25 29.5 16.25 28.75V27.5C16.25 26.75 15.75 26.25 15 26.25Z" />
          </svg>
        ) : (
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.6216 12.3784C11.0335 10.7896 9.95196 8.76575 9.51365 6.56253C9.07534 4.35931 9.29995 2.07561 10.1591 0C7.70951 0.482223 5.45944 1.68417 3.69666 3.45211C-1.23222 8.38098 -1.23222 16.3732 3.69666 21.3021C8.62679 26.2322 16.6178 26.2309 21.5479 21.3021C23.3154 19.5394 24.5172 17.2899 25 14.8409C22.9244 15.6999 20.6407 15.9244 18.4375 15.4861C16.2343 15.0478 14.2105 13.9663 12.6216 12.3784Z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default DarkMode;
