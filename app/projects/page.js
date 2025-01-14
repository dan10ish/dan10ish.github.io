"use client";

import { useState, useMemo } from "react";
import { getProjects } from "@/lib/projects";
import FilterComponent from "@/components/FilterComponent";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";
import { Github, Globe } from "lucide-react";

export default function ProjectsPage() {
  const projects = getProjects();
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach((project) =>
      project.tags.forEach((tag) => tagSet.add(tag)),
    );
    return Array.from(tagSet);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag)),
    );
  }, [projects, selectedTags]);

  return (
    <main>
      <div className="section-page">
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
          placeholder=""
        />
      </div>

      <div className="content-scroll">
        <div className="projects-table">
          {filteredProjects.map((project) => (
            <div key={project.title} className="project-row">
              <div className="project-title">{project.title}</div>
              <div className="project-links">
                <a
                  href={project.sourceLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-link github-icon-class ${!project.sourceLink ? "disabled-link" : ""}`}
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
                  className={`project-link globe-icon-class ${!project.projectLink ? "disabled-link" : ""}`}
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
      </div>

      <div className="noFooter">
        <Footer />
      </div>
      <ButtonsContainer />
    </main>
  );
}
