"use client";

import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/projects";

export default function ProjectsSection() {
  const [selectedTag, setSelectedTag] = useState(null);
  const projects = getProjects();
  const tags = [...new Set(projects.flatMap((project) => project.tags))];

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <section
      className={`projects-section ${selectedTag ? "tag-selected" : ""}`}
    >
      <div className="section-header">
        <h2>Projects</h2>
        <a
          href="https://github.com/dan10ish"
          target="_blank"
          rel="noopener noreferrer"
          className="github-profile-button"
        >
          <Github size={18} />
          <span>dan10ish</span>
        </a>
      </div>

      <div className="tag-filter-container">
        <div className="tag-filter">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tag ${selectedTag === tag ? "selected" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-table">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`project-row ${
              selectedTag && !project.tags.includes(selectedTag)
                ? "filtered"
                : ""
            }`}
          >
            <div className="project-title">{project.title}</div>
            <div className="project-meta">
              <div className="project-tag">{project.tags[0]}</div>
              <div className="project-links">
                {project.sourceLink && (
                  <a
                    href={project.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label="Source code"
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label="Live demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}