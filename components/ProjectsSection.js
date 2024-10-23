"use client";

import React, { useState, useMemo, useEffect } from "react";
import { getProjects } from "../lib/projects";

const ProjectCard = ({ project }) => {
  const adjustGradient = (gradient) => {
    if (!gradient) return "";
    const colors = gradient.match(/#[0-9A-Fa-f]{6}/g);
    if (!colors || colors.length !== 2) return gradient;

    const adjustColor = (hex, percent) => {
      const num = parseInt(hex.slice(1), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amt));
      const G = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
      const B = Math.max(0, Math.min(255, (num & 0xff) + amt));
      return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
    };

    const darkerColors = colors.map((color) => adjustColor(color, -30));

    return `linear-gradient(135deg, ${darkerColors[0]} 0%, ${darkerColors[1]} 100%)`;
  };

  const backgroundGradient = useMemo(
    () => adjustGradient(project.gradient),
    [project.gradient]
  );

  return (
    <div className="project-card" style={{ background: backgroundGradient }}>
      <div className="project-header">{project.title}</div>
      <div className="project-meta">
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-links">
          {project.sourceLink && (
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Source code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          )}
          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"></path>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const projects = getProjects();
  const [showAll, setShowAll] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((project) => project.tags.includes(selectedTag));
  }, [projects, selectedTag]);

  const displayedProjects =
    isSmallScreen && !showAll ? filteredProjects.slice(0, 4) : filteredProjects;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

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
      <div className="projects-container">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={`${project.title}-${index}`} project={project} />
        ))}
      </div>
      {filteredProjects.length > 4 && isSmallScreen && (
        <div className="show-more-container">
          <button onClick={toggleShowAll} className="show-more-button">
            {showAll ? "See less" : "See more"}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={showAll ? "rotated" : ""}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
