"use client"

import { getProjects } from "@/lib/projects";
import { Github, Globe } from "lucide-react";
import ButtonsContainer from "@/components/ButtonsContainer";

export default function RoboticsPage() {
  const projects = getProjects().filter((project) =>
    project.tags.includes("robotics"),
  );

  return (
    <main>
      <div className="header-container">
        <div className="title-container">
          <div className="title-link">
            <h1>Robotics</h1>
          </div>
        </div>
        <p className="page-description">
          Building and experimenting with robotic systems and control
          algorithms.
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
