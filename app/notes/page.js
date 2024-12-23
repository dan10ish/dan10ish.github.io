"use client";

import { useState } from "react";
import { notes } from "@/lib/library-data";
import FilterComponent from "@/components/FilterComponent";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";

export default function NotesPage() {
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = [...new Set(notes.flatMap((note) => note.tags))];

  const filteredNotes =
    selectedTags.length === 0
      ? notes
      : notes.filter((note) =>
          selectedTags.some((tag) => note.tags.includes(tag)),
        );

  return (
    <main>
      <div className="title-container">
        <div className="title-link">
          <h1>Notes</h1>
        </div>
      </div>

      <FilterComponent
        options={tags}
        activeFilters={selectedTags}
        onFilterChange={setSelectedTags}
        placeholder=""
      />

      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <div
            key={note.title}
            className="book-card"
            onClick={() => window.open(note.file, "_blank")}
          >
            <div
              className="book-cover"
              style={{ "--book-color": note.coverColor }}
            >
              <div
                className="book-spine"
                style={{ backgroundColor: note.coverColor }}
              />
              <div className="book-spine-edge" />
              <div className="book-content">
                <h3 className="book-title">{note.title}</h3>
                <p className="book-author">{note.author}</p>
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
