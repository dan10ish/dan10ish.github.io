import React from "react";
import { Github, Globe, ArrowUpRight } from "lucide-react";
import projectsData from "./projectsData.json";
import folderIcon from "../../assets/folder.png";
import "./Projects.css";

const Projects = ({ onOpenWindow }) => {
  const handleProjectClick = (project) => {
    if (onOpenWindow) {
      onOpenWindow({
        id: `project-${project.title.toLowerCase().replace(/\s+/g, '-')}`,
        name: project.title,
        component: <ProjectDetail project={project} />,
        defaultSize: [340, 450]
      });
    }
  };

  const handleRowClick = (project, e) => {
    // Don't open project window if clicking on a link
    if (e.target.closest('a')) {
      return;
    }
    handleProjectClick(project);
  };

  return (
    <div className="projects-app">
      <div className="projects-section">
        {projectsData.projects.map((project, index) => (
          <div 
            key={index} 
            className="project-item"
            onClick={(e) => handleRowClick(project, e)}
          >
            <div className="project-content">
              <span className="project-name">
                <img src={folderIcon} alt="Folder" className="folder-icon" />
                {project.title}
              </span>
              <span className="project-label">{project.tag.toLowerCase()}</span>
              <div className="project-links">
                <div className={`project-link ${!project.live ? 'disabled' : ''}`}>
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe size={16} />
                    </a>
                  ) : (
                    <Globe size={16} />
                  )}
                </div>
                <div className={`project-link ${!project.source ? 'disabled' : ''}`}>
                  {project.source ? (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                    </a>
                  ) : (
                    <Github size={16} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectDetail = ({ project }) => {
  return (
    <div className="project-detail">
      <div className="project-detail-section">
        <div className="project-detail-item">
          <span className="project-detail-label">project</span>
          <span className="project-detail-text">{project.title}</span>
        </div>

        <div className="project-detail-item">
          <span className="project-detail-label">category</span>
          <span className="project-detail-text">{project.tag.toLowerCase()}</span>
        </div>

        <div className="project-detail-item">
          <span className="project-detail-label">description</span>
          <span className="project-detail-text">{project.description}</span>
        </div>

        {(project.live || project.source) && (
          <div className="project-detail-item">
            <span className="project-detail-label">links</span>
            <div className="project-detail-links">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail-link"
                >
                  live demo
                  <Globe size={16} />
                  <ArrowUpRight className="project-detail-icon" size={14} />
                </a>
              )}
              {project.source && (
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail-link"
                >
                  source code 
                  <Github size={16} />
                  <ArrowUpRight className="project-detail-icon" size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {project.videoPath && (
        <div className="project-video">
          <video
            src={project.videoPath}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="project-video-player"
          />
        </div>
      )}
    </div>
  );
};

export default Projects;