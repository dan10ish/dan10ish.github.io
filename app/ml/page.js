"use client";

import { getProjects } from "@/lib/projects";
import ButtonsContainer from "@/components/ButtonsContainer";
import { Github, Globe } from "lucide-react";

export default function MLPage() {
  const projects = getProjects().filter((project) =>
    project.tags.includes("ml"),
  );

  return (
    <main>
      <div className="header-container">
        <div className="title-container">
          <div className="title-link">
            <h1>Machine Learning</h1>
          </div>
        </div>
        <p className="page-description">
          Exploring artificial intelligence and machine learning through various
          projects.
        </p>
      </div>

      <div className="projects-table">
        {projects.map((project) => (
          <div key={project.title} className="project-row">
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
            <div className="project-title">{project.title}</div>
          </div>
        ))}
      </div>

      <ButtonsContainer />
    </main>
  );
}
