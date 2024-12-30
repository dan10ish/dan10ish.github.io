"use client";

import { useState } from "react";
import { notes } from "@/lib/library-data";
import FilterComponent from "@/components/FilterComponent";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";

const shouldUseWhiteText = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
};

export default function NotesPage() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [touchedNote, setTouchedNote] = useState(null);
  const tags = [...new Set(notes.flatMap((note) => note.tags))].sort((a, b) => {
    const isSemesterA = a.startsWith("Semester");
    const isSemesterB = b.startsWith("Semester");
    if (isSemesterA === isSemesterB) {
      return a.localeCompare(b);
    }
    return isSemesterA ? -1 : 1;
  });

  const filteredNotes =
    selectedTags.length === 0
      ? notes
      : notes.filter((note) =>
          selectedTags.some((tag) => note.tags.includes(tag)),
        );

  const handleNoteClick = (file) => {
    window.open(file, "_blank");
    setTouchedNote(null);
  };

  return (
    <main>
      <div className="title-container title-center">
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
            className={`book-card ${touchedNote === note.title ? "touch-active" : ""}`}
            onClick={() => handleNoteClick(note.file)}
            onTouchStart={() => setTouchedNote(note.title)}
            onTouchEnd={() => setTouchedNote(null)}
          >
            <div
              className="book-cover"
              style={{
                "--book-color": note.coverColor,
                color: shouldUseWhiteText(note.coverColor)
                  ? "#ffffff"
                  : "#000000",
              }}
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
