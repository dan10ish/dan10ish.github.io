import React from "react";

const projects = [
  {
    id: 1,
    title: "Pathfinding Visualizer",
    projectUrl: "https://dan10ish.github.io/pathfinding-visualizer",
    sourceUrl: "https://github.com/dan10ish/pathfinding-visualizer",
    tags: ["React", "Algorithms"],
    description: "A visualization tool for Dijkstra, A*, BFS and DFS",
  },
  {
    id: 2,
    title: "3DOF Robotic Arm",
    projectUrl: null,
    sourceUrl: "https://github.com/dan10ish/3DOF-RoboticArm-C",
    tags: ["Kinematics", "Dynamics", "Data Structures", "Algorithms"],
    description: "Mathematical modelling and simulation of a 3DOF Robotic Arm",
  },
];

export default function Projects() {
  return (
    <div className="projects">
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-links">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project
                </a>
              )}
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="source-link"
              >
                Source Code
              </a>
            </div>
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <code key={index}>{tag}</code>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
