"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Github, Globe, ChevronRight } from "lucide-react";
import { getProjects } from "@/lib/projects";
import FilterComponent from "./FilterComponent";

export default function ProjectsSection({ showAll = false }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const projects = getProjects();

  const tags = useMemo(() => {
    return [...new Set(projects.flatMap((project) => project.tags))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag)),
    );
  }, [selectedTags, projects]);

  const displayedProjects = useMemo(() => {
    if (showAll || selectedTags.length > 0) return filteredProjects;
    return filteredProjects.filter((p) => p.home);
  }, [filteredProjects, showAll, selectedTags]);

  return (
    <section className="projects-section">
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

      <FilterComponent
        options={tags}
        activeFilters={selectedTags}
        onFilterChange={setSelectedTags}
        placeholder="by tag"
      />

      <div className="projects-table">
        {displayedProjects.map((project) => (
          <div key={project.title} className="project-row">
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
            <div className="project-title">{project.title}</div>
            <div className="project-tag">{project.tags[0]}</div>
          </div>
        ))}
      </div>

      {!showAll && !selectedTags.length && filteredProjects.length > 0 && (
        <Link href="/projects" className="show-more-button">
          <span className="show-text">View All Projects</span>
          <ChevronRight size={16} />
        </Link>
      )}
    </section>
  );
}
