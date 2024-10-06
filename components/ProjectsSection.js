"use client";

import React, { useRef, useEffect, useState } from "react";
import { getProjects } from "../lib/projects";

const ProjectCard = ({ project, isDarkMode }) => {
  const adjustGradient = (gradient) => {
    if (!isDarkMode) return gradient;

    const colors = gradient.match(/#[0-9A-Fa-f]{6}/g);
    if (!colors || colors.length !== 2) return gradient;

    const darkerColors = colors.map((color) => adjustColor(color, -30));
    return `linear-gradient(135deg, ${darkerColors[0]} 0%, ${darkerColors[1]} 100%)`;
  };

  const adjustColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
  };

  return (
    <div
      className="project-card"
      style={{ background: adjustGradient(project.gradient) }}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-links">
        {project.sourceLink && (
          <a
            href={project.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        )}
        {project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live
          </a>
        )}
      </div>
      <div className="project-tags">
        {project.tags.map((tag, index) => (
          <span key={index} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const projects = getProjects();
  const scrollContainerRef = useRef(null);
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

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    scrollContainer.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div className="projects-container" ref={scrollContainerRef}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} isDarkMode={isDarkMode} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
