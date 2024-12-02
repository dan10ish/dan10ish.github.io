"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Github, Globe, ChevronRight } from "lucide-react";
import { getProjects } from "@/lib/projects";

export default function ProjectsSection({ showAll = false }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const projects = getProjects();

  const tags = useMemo(() => {
    return [...new Set(projects.flatMap((project) => project.tags))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((project) => project.tags.includes(selectedTag));
  }, [selectedTag, projects]);

  const displayedProjects = useMemo(() => {
    if (showAll || selectedTag) return filteredProjects;
    return filteredProjects.filter((p) => p.home);
  }, [filteredProjects, showAll, selectedTag]);

  const LinkIcon = ({ href, icon: Icon, label, className = "" }) => {
    const baseClasses = "project-link";
    const noLinkClass = !href ? "project-no-link" : "";
    const Component = href ? "a" : "span";
    const props = href
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Component
        className={`${baseClasses} ${noLinkClass} ${className}`}
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
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`tag ${selectedTag === tag ? "selected" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-table">
        {displayedProjects.map((project) => (
          <div key={project.title} className="project-row">
            <div className="project-links">
              <LinkIcon
                href={project.sourceLink}
                icon={Github}
                label="Source code"
                className="github-icon-class"
              />
              <LinkIcon
                href={project.projectLink}
                icon={Globe}
                label="Live demo"
                className="globe-icon-class"
              />
            </div>
            <div className="project-title">{project.title}</div>
            <div className="project-tag">{project.tags[0]}</div>
          </div>
        ))}
      </div>
      {!showAll && !selectedTag && filteredProjects.length > 0 && (
        <Link href="/projects" className="show-more-button">
          <span className="show-text">View All Projects</span>
          <ChevronRight size={16} />
        </Link>
      )}
    </section>
  );
}
