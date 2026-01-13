import React, { useState, useEffect, useRef } from "react";
import "./LoadingScreen.css";
import appleIcon from "../../assets/icons/apple.svg";
import wallpaper from "../../assets/wallpaper.png";
import folderIcon from "../../assets/folder.png";
import aboutIcon from "../../assets/icons/about.png";
import contactIcon from "../../assets/icons/contacts.png";
import developerIcon from "../../assets/icons/developer.png";
import experienceIcon from "../../assets/icons/experience.png";
import musicIcon from "../../assets/icons/listen.png";

// Static assets list defined outside component to avoid recreation
const IMAGE_ASSETS = [
  "/icon.png",
  wallpaper,
  folderIcon,
  aboutIcon,
  contactIcon,
  developerIcon,
  experienceIcon,
  musicIcon
];

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const loadDuration = 800;
    const startTime = performance.now();
    let assetsReady = false;

    // Preload images in parallel
    const preloadImages = () => {
      const imagePromises = IMAGE_ASSETS.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        });
      });
      return Promise.all(imagePromises);
    };

    // Wait for fonts using native API
    const waitForFonts = () => document.fonts.ready;

    // Load all assets
    Promise.all([preloadImages(), waitForFonts()]).then(() => {
      assetsReady = true;
    });

    const updateProgress = (currentTime) => {
      if (completedRef.current) return;

      const elapsed = currentTime - startTime;
      const progressPercent = Math.min((elapsed / loadDuration) * 100, 100);
      setProgress(progressPercent);

      if (progressPercent >= 100 && assetsReady) {
        completedRef.current = true;
        setTimeout(onLoadComplete, 400);
      } else {
        animationRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onLoadComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="apple-logo">
          <img src={appleIcon} alt="Apple" width="80" height="80" />
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div
              className="loading-progress"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;