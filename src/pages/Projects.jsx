import React, { useState, useMemo } from "react";

const projects = [
  {
    id: 1,
    title: "Comment Toxicity",
    projectUrl: null,
    sourceUrl: "https://github.com/dan10ish/CommentToxicity",
    tags: ["TensorFlow", "Python"],
    description:
      "Real-time comment toxicity detection system developed using deep learning",
  },
  {
    id: 2,
    title: "Pathfinding Visualizer",
    projectUrl: "https://dan10ish.github.io/pathfinding-visualizer",
    sourceUrl: "https://github.com/dan10ish/pathfinding-visualizer",
    tags: ["React.js", "Algorithms"],
    description: "A visualization tool for various pathfinding algorithms",
  },
  {
    id: 3,
    title: "3DOF Robotic Arm",
    projectUrl: null,
    sourceUrl: "https://github.com/dan10ish/3DOF-RoboticArm-C",
    tags: ["Kinematics", "Dynamics", "Data Structures", "Algorithms"],
    description: "Mathematical modelling and simulation of a 3DOF Robotic Arm",
  },
  {
    id: 4,
    title: "Office",
    projectUrl: "https://dan10ish.github.io/Office",
    sourceUrl: "https://github.com/dan10ish/Office",
    tags: ["Three.js", "Blender", "React.js", "Framer Motion"],
    description: "3D website made using r3f and framer motion",
  },
];

const PROJECTS_PER_PAGE = 2;

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={currentPage === page ? "active" : ""}
      >
        {page}
      </button>
    ))}
  </div>
);

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const currentProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return projects.slice(start, start + PROJECTS_PER_PAGE);
  }, [currentPage]);

  return (
    <div className="projects">
      <ul>
        {currentProjects.map((project) => (
          <li key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.title}</h3>
              <div className="project-links">
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Source Code"
                  >
                    <svg
                      width="25"
                      height="28"
                      viewBox="0 0 25 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.2035 26C17.2084 25.2429 17.2131 22.615 17.2131 21.5746C17.2131 20.071 16.6995 19.0872 16.1235 18.5892C19.6994 18.1896 23.4534 16.8276 23.4534 10.6324C23.4534 8.87209 22.8333 7.43209 21.8034 6.30539C21.9683 5.89739 22.519 4.25728 21.6434 2.03728C21.6434 2.03728 20.2981 1.60398 17.2322 3.69198C15.9492 3.33311 14.5775 3.15555 13.2132 3.14841C11.8488 3.15555 10.4772 3.33328 9.19401 3.69198C6.12817 1.60398 4.78303 2.03728 4.78303 2.03728C3.90735 4.25728 4.45806 5.89739 4.62298 6.30539C3.59308 7.43209 2.97297 8.87209 2.97297 10.6324C2.97297 16.8276 6.72687 18.1896 10.3027 18.5892C9.72687 19.0872 9.21314 20.071 9.21314 21.5746C9.21314 22.615 9.21801 25.2429 9.22271 26M2 19.5135C3.61173 19.6275 4.54108 21.0922 4.54108 21.0922C5.97363 23.5569 8.29968 22.844 9.21379 22.4324" />
                    </svg>
                  </a>
                )}
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Project"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="externalLink"
                    >
                      <path d="M8.66693 3.33333H6.26693C4.77345 3.33333 4.02616 3.33333 3.45573 3.62399C2.95396 3.87964 2.54631 4.28729 2.29065 4.78907C2 5.35949 2 6.10679 2 7.60027V17.7336C2 19.2271 2 19.9735 2.29065 20.5439C2.54631 21.0456 2.95396 21.454 3.45573 21.7096C4.0256 22 4.77199 22 6.26255 22H16.4041C17.8947 22 18.64 22 19.2099 21.7096C19.7116 21.454 20.1207 21.0452 20.3763 20.5435C20.6667 19.9736 20.6667 19.228 20.6667 17.7375V15.3333M22 8.66667V2M22 2H15.3333M22 2L12.6667 11.3333" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
