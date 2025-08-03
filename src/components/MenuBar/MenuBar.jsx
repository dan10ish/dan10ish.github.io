import React, { useState, useEffect } from "react";
import "./MenuBar.css";

const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString([], options).replace(',', '');
  };

  return (
    <div className="menu-bar">
      <div className="menu-bar-left">Danish Ansari</div>
      <div className="menu-bar-right">
        <span>{formatDate(currentTime)}</span>
        <span>{formatTime(currentTime)}</span>
      </div>
    </div>
  );
};

export default MenuBar;
