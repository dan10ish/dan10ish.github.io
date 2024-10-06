"use client";

import React from "react";
import { getBooks } from "../lib/books";

const Library = () => {
  const books = getBooks();

  const getBookDimensions = (size) => {
    switch (size) {
      case "s":
        return { height: "200px", width: "33px" };
      case "m":
        return { height: "240px", width: "38px" };
      case "l":
        return { height: "280px", width: "43px" };
      default:
        return { height: "240px", width: "38px" };
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

  return (
    <section className="library">
      <h2>Library</h2>
      <div className="book-shelf">
        {books.map((book, index) => {
          const { height, width } = getBookDimensions(book.size);
          return (
            <div key={index} className="book-container">
              <div
                className="book"
                style={{
                  backgroundColor: book.color,
                  height: height,
                  width: width,
                }}
              >
                <div className="book-title">{book.title}</div>
                <div className="book-author">
                  {formatAuthorName(book.author)}
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
