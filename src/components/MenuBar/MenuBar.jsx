import React, { useState, useEffect } from "react";
import { Loader2, Sun, Moon } from "lucide-react";
import powerIcon from "../../assets/icons/power.svg";
import "./MenuBar.css";

const MenuBar = ({ onShutdown }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(isDark ? 'light' : 'dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

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

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div className="menu-bar">
        <div className="menu-bar-left">
          <span>Danish Ansari</span>
          <div className="power-button-container-menu">
            <button
              className="power-button-menu"
              onClick={handleShutdown}
              disabled={isShuttingDown}
            >
              <img src={powerIcon} alt="Power" width="18" height="18" />
            </button>
            {isShuttingDown && (
              <div className="shutdown-dropdown">
                <Loader2 className="shutdown-spinner" size={12} />
                <span>Shutting down</span>
              </div>
            )}
          </div>
        </div>
        <div className="menu-bar-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <span>{formatDate(currentTime)}</span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
