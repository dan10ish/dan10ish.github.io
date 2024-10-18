"use client";

import React, { useEffect, useState } from "react";
import { getBooks } from "../lib/books";

const Library = () => {
  const books = getBooks();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  const getBookDimensions = (size) => {
    switch (size) {
      case "s":
        return { height: "200px", width: "40px" };
      case "m":
        return { height: "220px", width: "45px" };
      case "l":
        return { height: "240px", width: "50px" };
      default:
        return { height: "240px", width: "45px" };
    }
  };

  const formatAuthorName = (author) => {
    const names = author.split(" ");
    if (names.length > 1) {
      return (
        <>
          <span>{names[0]}</span>
          <span>{names.slice(1).join(" ")}</span>
        </>
      );
    }
    return author;
  };

  const getGradient = (color) => {
    const darkerColor = getDarkerColor(color, isDarkMode ? 20 : 10);
    const lighterColor = getLighterColor(color, isDarkMode ? 10 : 20);
    return `linear-gradient(135deg, ${darkerColor} 0%, ${lighterColor} 100%)`;
  };

  const getDarkerColor = (hex, percent) => {
    return adjustColor(hex, -percent);
  };

  const getLighterColor = (hex, percent) => {
    return adjustColor(hex, percent);
  };

  const adjustColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
  };

  const getTextColor = (backgroundColor) => {
    const rgb = parseInt(backgroundColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 165 ? "#000000" : "#ffffff";
  };

  return (
    <section className="library">
      <h2>Library</h2>
      <div className="book-shelf">
        {books.map((book, index) => {
          const { height, width } = getBookDimensions(book.size);
          const gradient = getGradient(book.color);
          const textColor = getTextColor(book.color);
          return (
            <div key={index} className="book-container">
              <div
                className="book"
                style={{
                  background: gradient,
                  height: height,
                  width: width,
                  color: textColor,
                }}
              >
                <div className="book-title">{book.title}</div>
                <div className="book-author">
                  {formatAuthorName(book.author)}
                </div>
                <div className="book-spine-lines">
                  <div className="spine-line"></div>
                  <div className="spine-line"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Library;
