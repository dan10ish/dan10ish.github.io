"use client";

import { useState } from "react";
import { books } from "@/lib/library-data";
import FilterComponent from "@/components/FilterComponent";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";

const shouldUseWhiteText = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
};

export default function BooksPage() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [touchedBook, setTouchedBook] = useState(null);
  const tags = [...new Set(books.flatMap((book) => book.tags))];

  const filteredBooks =
    selectedTags.length === 0
      ? books
      : books.filter((book) =>
          selectedTags.some((tag) => book.tags.includes(tag)),
        );

  return (
    <main>
      <div className="title-container title-center">
        <div className="title-link">
          <h1>Books</h1>
        </div>
      </div>

      <FilterComponent
        options={tags}
        activeFilters={selectedTags}
        onFilterChange={setSelectedTags}
        placeholder=""
      />

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div
            key={book.title}
            className={`book-card ${touchedBook === book.title ? "touch-active" : ""}`}
            onTouchStart={() => setTouchedBook(book.title)}
            onTouchEnd={() => setTouchedBook(null)}
          >
            <div
              className="book-cover"
              style={{
                "--book-color": book.coverColor,
                color: shouldUseWhiteText(book.coverColor)
                  ? "#ffffff"
                  : "#000000",
              }}
            >
              <div
                className="book-spine"
                style={{ backgroundColor: book.coverColor }}
              />
              <div className="book-spine-edge" />
              <div className="book-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
              </div>
              <div className="book-right-edge" />
            </div>
          </div>
        ))}
      </div>

      <div className="noFooter">
        <Footer />
      </div>
      <ButtonsContainer />
    </main>
  );
}
