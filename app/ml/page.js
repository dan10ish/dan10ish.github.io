"use client";

import { useState } from "react";
import { books, resources, notes } from "@/lib/library-data";
import { getProjects } from "@/lib/projects";
import ButtonsContainer from "@/components/ButtonsContainer";
import { Github, Globe } from "lucide-react";

export default function MLPage() {
  const [touchedBook, setTouchedBook] = useState(null);
  const mlProjects = getProjects().filter((project) =>
    project.tags.includes("ml"),
  );

  const mlBooks = books.filter((book) =>
    book.tags.includes("Machine Learning"),
  );

  const mlResources = resources.filter(
    (resource) =>
      resource.tags?.includes("ML") ||
      resource.title.toLowerCase().includes("ml") ||
      resource.title.toLowerCase().includes("machine learning") ||
      resource.title.toLowerCase().includes("ai"),
  );

  const mlNotes = notes.filter((note) => note.tags.includes("AI"));

  const allMaterials = [...mlBooks, ...mlNotes];

  return (
    <main>
      <div className="domain-header">
        <h2>Machine Learning</h2>
      </div>

      <div className="domain-projects">
        {mlProjects.map((project) => (
          <div key={project.title} className="domain-project-card">
            <h3 className="resource-title">{project.title}</h3>
            <div className="project-links">
              <a
                href={project.sourceLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-link github-icon-class ${
                  !project.sourceLink ? "disabled-link" : ""
                }`}
                aria-label={`View source code for ${project.title}`}
                tabIndex={project.sourceLink ? 0 : -1}
                onClick={(e) => !project.sourceLink && e.preventDefault()}
              >
                <Github size={18} aria-hidden="true" />
                <span className="sr-only">Source code</span>
              </a>
              <a
                href={project.projectLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-link globe-icon-class ${
                  !project.projectLink ? "disabled-link" : ""
                }`}
                aria-label={`View live demo of ${project.title}`}
                tabIndex={project.projectLink ? 0 : -1}
                onClick={(e) => !project.projectLink && e.preventDefault()}
              >
                <Globe size={18} aria-hidden="true" />
                <span className="sr-only">Live demo</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {allMaterials.length > 0 && (
        <div className="books-grid">
          {allMaterials.map((item) => (
            <div
              key={item.title}
              className={`book-card ${touchedBook === item.title ? "touch-active" : ""}`}
              onClick={() => "file" in item && window.open(item.file, "_blank")}
              style={{ cursor: "file" in item ? "pointer" : "default" }}
              onTouchStart={() => setTouchedBook(item.title)}
              onTouchEnd={() => setTouchedBook(null)}
            >
              <div
                className="book-cover"
                style={{
                  "--book-color": item.coverColor,
                  color: "#ffffff",
                }}
              >
                <div
                  className="book-spine"
                  style={{ backgroundColor: item.coverColor }}
                />
                <div className="book-spine-edge" />
                <div className="book-content">
                  <h3 className="book-title">{item.title}</h3>
                  <p className="book-author">{item.author}</p>
                </div>
                <div className="book-right-edge" />
              </div>
            </div>
          ))}
        </div>
      )}

      {mlResources.length > 0 && (
        <div className="resources-grid">
          {mlResources.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card"
              data-category={resource.category}
            >
              <h3 className="resource-title">{resource.title}</h3>
              <span className="resource-category">{resource.category}</span>
            </a>
          ))}
        </div>
      )}
      <ButtonsContainer />
    </main>
  );
}
