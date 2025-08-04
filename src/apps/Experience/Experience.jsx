import React from "react";
import experienceData from "./experienceData.json";
import folderIcon from "../../assets/folder.png";
import bookFolderIcon from "../../assets/icons/bookFolder.png";
import "./Experience.css";

const Experience = ({ onOpenWindow }) => {
  const handleExperienceClick = (experience) => {
    if (onOpenWindow) {
      onOpenWindow({
        id: `experience-${experience.id}`,
        name: experience.company,
        component: <ExperienceDetail experience={experience} />,
        defaultSize: [350, 480]
      });
    }
  };

  const handleEducationClick = (education) => {
    if (onOpenWindow) {
      onOpenWindow({
        id: `education-${education.id}`,
        name: education.institution,
        component: <EducationDetail education={education} />,
        defaultSize: [320, 350]
      });
    }
  };

  return (
    <div className="experience-app">
      <div className="experience-section">
      <h2>Experience</h2>
        {experienceData.experience.map((experience, index) => (
          <div 
            key={index} 
            className="experience-item"
            onClick={() => handleExperienceClick(experience)}
          >
            <div className="experience-content">
              <span className="experience-role">
                <img src={folderIcon} alt="Folder" className="folder-icon" />
                {experience.role}
              </span>
              <span className="experience-company">{experience.company}</span>
              <span className="experience-duration">{experience.duration}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="education-section">
      <h2>Education</h2>
        {experienceData.education.map((education, index) => (
          <div 
            key={index} 
            className="education-item"
            onClick={() => handleEducationClick(education)}
          >
            <div className="education-content">
              <span className="education-field">
                <img src={bookFolderIcon} alt="Folder" className="folder-icon" />
                {education.field}
              </span>
              <span className="education-institution">{education.institution}</span>
              <span className="education-duration">{education.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TechnologyIcon = ({ technology }) => {
  return (
    <div className="technology-item">
      <img 
        src={`/assets/experience/${technology.icon}`}
        alt={technology.name}
        className="technology-icon"
        width="16" 
        height="16"
      />
      <span className="technology-name">{technology.name}</span>
    </div>
  );
};

const ExperienceDetail = ({ experience }) => {
  return (
    <div className="experience-detail">
      <div className="experience-detail-section">
        <div className="experience-detail-item">
          <span className="experience-detail-label">company</span>
          <span className="experience-detail-text">{experience.company}</span>
        </div>

        <div className="experience-detail-item">
          <span className="experience-detail-label">role</span>
          <span className="experience-detail-text">{experience.role}</span>
        </div>

        <div className="experience-detail-item">
          <span className="experience-detail-label">duration</span>
          <span className="experience-detail-text">{experience.duration}</span>
        </div>

        <div className="experience-detail-item">
          <span className="experience-detail-label">description</span>
          <span className="experience-detail-text">{experience.description}</span>
        </div>

        {experience.technologies && experience.technologies.length > 0 && (
          <div className="experience-detail-item">
            <span className="experience-detail-label">technologies</span>
            <div className="technologies-grid">
              {experience.technologies.map((tech, index) => (
                <TechnologyIcon key={index} technology={tech} />
              ))}
            </div>
          </div>
        )}

        {experience.image && (
          <div className="experience-detail-item">
            <span className="experience-detail-label">image</span>
            <div className="experience-image-container">
              <img 
                src={experience.image} 
                alt={`${experience.company} experience`}
                className="experience-image"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EducationDetail = ({ education }) => {
  return (
    <div className="education-detail">
      <div className="education-detail-section">
        <div className="education-detail-item">
          <span className="education-detail-label">institution</span>
          <span className="education-detail-text">{education.institution}</span>
        </div>

        <div className="education-detail-item">
          <span className="education-detail-label">degree</span>
          <span className="education-detail-text">{education.degree}</span>
        </div>

        <div className="education-detail-item">
          <span className="education-detail-label">field</span>
          <span className="education-detail-text">{education.field}</span>
        </div>

        <div className="education-detail-item">
          <span className="education-detail-label">duration</span>
          <span className="education-detail-text">{education.duration}</span>
        </div>

        {education.gpa && (
          <div className="education-detail-item">
            <span className="education-detail-label">gpa</span>
            <span className="education-detail-text">{education.gpa}</span>
          </div>
        )}

        <div className="education-detail-item">
          <span className="education-detail-label">description</span>
          <span className="education-detail-text">{education.description}</span>
        </div>

        {education.image && (
          <div className="education-detail-item">
            <span className="education-detail-label">image</span>
            <div className="education-image-container">
              <img 
                src={education.image} 
                alt={`${education.institution} education`}
                className="education-image"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;