"use client";

import { useState } from "react";
import { Github, Globe } from "lucide-react";
import { getProjects } from "@/lib/projects";

export default function ProjectsSection() {
  const [selectedTag, setSelectedTag] = useState(null);
  const projects = getProjects();
  const tags = [...new Set(projects.flatMap((project) => project.tags))];

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const LinkIcon = ({ href, icon: Icon, label }) => {
    const baseClasses = "project-link";
    const noLinkClass = !href ? "project-no-link" : "";
    const Component = href ? "a" : "span";
    const props = href
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Component
        className={`${baseClasses} ${noLinkClass}`}
        {...props}
        aria-label={label}
      >
        <Icon size={18} />
      </Component>
    );
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
        {projects.map((project) => (
          <div
            key={project.title}
            className={`project-row ${
              selectedTag && !project.tags.includes(selectedTag)
                ? "filtered"
                : ""
            }`}
          >
            <div className="project-links">
              <LinkIcon
                href={project.sourceLink}
                icon={Github}
                label="Source code"
              />
              <LinkIcon
                href={project.projectLink}
                icon={Globe}
                label="Live demo"
              />
            </div>
            <div className="project-title">{project.title}</div>
            <div className="project-tag">{project.tags[0]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
