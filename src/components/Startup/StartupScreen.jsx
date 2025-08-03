import React from "react";
import data from "../../data.json";
import powerIcon from "../../assets/icons/power.svg";
import "./StartupScreen.css";

const PowerButton = ({ onClick }) => (
  <img
    src={powerIcon}
    alt="Power"
    className="power-button"
    onClick={onClick}
    width="60"
    height="60"
  />
);

const StartupScreen = ({ onPowerOn }) => {
  const getContactLink = (platform, username) => {
    const links = {
      email: `mailto:${username}`,
      instagram: `https://instagram.com/${username}`,
      x: `https://x.com/${username}`,
      linkedin: `https://linkedin.com/in/${username}`,
      github: `https://github.com/${username}`
    };
    return links[platform] || '#';
  };

  return (
    <div className="startup-screen">
      <div className="startup-content">
        <div className="startup-info">
          <div className="startup-label">{data.name}</div>
          <div className="startup-value">{data.title}</div>
          
          <div className="startup-label">interests</div>
          <div className="startup-value">{data.interests}</div>
          
          <div className="startup-label">current</div>
          <div className="startup-value">{data.current}</div>
          
          <div className="startup-label">past</div>
          <div className="startup-value">
            {data.past.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
          
          <div className="startup-label">education</div>
          <div className="startup-value">{data.education}</div>
          
          <div className="startup-label">contact</div>
          <div className="startup-value">
            <a href={getContactLink('email', data.contact.email)} className="contact-link">{data.contact.email}</a>
            <a href={getContactLink('instagram', data.contact.instagram)} target="_blank" rel="noopener noreferrer" className="contact-link">Instagram</a>
            <a href={getContactLink('x', data.contact.x)} target="_blank" rel="noopener noreferrer" className="contact-link">X</a>
            <a href={getContactLink('linkedin', data.contact.linkedin)} target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
            <a href={getContactLink('github', data.contact.github)} target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
          </div>
        </div>
        <div className="power-button-container">
          <PowerButton onClick={onPowerOn} />
        </div>
      </div>
    </div>
  );
};

export default StartupScreen;