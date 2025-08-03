import React from "react";
import "./Desktop.css";
import defaultIcon from "../../assets/folder.png";

const Desktop = ({ onOpenApp, apps }) => {
  return (
    <div className="desktop-icons">
      {apps.map((app) => (
        <div
          key={app.id}
          className="desktop-icon"
          onClick={() => onOpenApp(app.id)}
        >
          <img src={app.icon || defaultIcon} alt={app.name} />
          <span className="desktop-icon-name">{app.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Desktop;
