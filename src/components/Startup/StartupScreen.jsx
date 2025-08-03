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
  return (
    <div className="startup-screen">
      <div className="startup-content">
        <div className="startup-info">
          <div className="startup-name">{data.name}</div>
          <div className="startup-title">{data.title}</div>
          <div className="startup-details">
            <div className="startup-row">
              <span className="startup-label">interests</span>
              <span className="startup-value">{data.interests}</span>
            </div>
            <div className="startup-row">
              <span className="startup-label">current</span>
              <span className="startup-value">{data.current}</span>
            </div>
            <div className="startup-row">
              <span className="startup-label">past</span>
              <div className="startup-value">
                {data.past.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>
            <div className="startup-row">
              <span className="startup-label">education</span>
              <span className="startup-value">{data.education}</span>
            </div>
            <div className="startup-row">
              <span className="startup-label">contact</span>
              <div className="startup-value">
                <div>{data.contact.email}</div>
                <div>{data.contact.instagram}</div>
                <div>{data.contact.x}</div>
                <div>{data.contact.linkedin}</div>
                <div>{data.contact.github}</div>
              </div>
            </div>
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