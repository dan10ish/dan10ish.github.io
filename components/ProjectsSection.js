"use client";

import React, { useState, useMemo } from "react";
import { getProjects } from "../lib/projects";
import { Github, Globe } from "lucide-react";

const ProjectCard = ({ project, isFiltered }) => {
  return (
    <div className={`project-row ${isFiltered ? "filtered" : ""}`}>
      <div className="project-title">{project.title}</div>
      <div className="project-meta">
        <div className="project-tag">{project.tags[0]}</div>
        <div className="project-links">
          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label="View live project"
              style={{ willChange: "transform" }}
            >
              <Globe size={20} />
            </a>
          )}
          {project.sourceLink && (
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label="View source code"
              style={{ willChange: "transform" }}
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const projects = getProjects();
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, [projects]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div className="tag-filter-container">
        <div className="tag-filter">
          {allTags.map((tag) => (
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
          <ProjectCard
            key={`${project.title}-${index}`}
            project={project}
            isFiltered={selectedTag && !project.tags.includes(selectedTag)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
