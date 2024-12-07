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
      selectedTags.some((tag) => project.tags.includes(tag))
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
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-link github-icon-class ${
                  !project.sourceLink ? "project-no-link" : ""
                }`}
                aria-label="Source code"
              >
                <Github size={18} />
              </a>
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-link globe-icon-class ${
                  !project.projectLink ? "project-no-link" : ""
                }`}
                aria-label="Live demo"
              >
                <Globe size={18} />
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
