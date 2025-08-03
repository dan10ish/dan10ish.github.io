import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";
import appleIcon from "../../assets/icons/apple.svg";
import powerIcon from "../../assets/icons/power.svg";
import wallpaper from "../../assets/wallpaper.png";
import folderIcon from "../../assets/folder.png";
import aboutIcon from "../../assets/icons/about.png";
import contactIcon from "../../assets/icons/contacts.png";
import developerIcon from "../../assets/icons/developer.png";
import experienceIcon from "../../assets/icons/experience.png";
import musicIcon from "../../assets/icons/listen.png";

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const assetsToLoad = [
      "/fonts/helveticaneue-thin.woff2",
      "/fonts/helveticaneue-light.woff2",
      "/fonts/helveticaneue.woff2",
      "/fonts/helveticaneue-medium.woff2",
      "/fonts/helveticaneue-bold.woff2",
      "/icon.png",
      appleIcon,
      powerIcon,
      wallpaper,
      folderIcon,
      aboutIcon,
      contactIcon,
      developerIcon,
      experienceIcon,
      musicIcon
    ];

    const totalAssets = assetsToLoad.length;
    const loadDuration = 2000;
    const startTime = Date.now();
    let assetsLoaded = false;

    const loadAsset = (src) => {
      return new Promise((resolve) => {
        if (src.endsWith('.woff2')) {
          const font = new FontFace('Helvetica Neue', `url(${src})`);
          font.load().then(() => {
            document.fonts.add(font);
            resolve();
          }).catch(() => resolve());
        } else {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }
      });
    };

    const loadAllAssets = async () => {
      await Promise.all(assetsToLoad.map(loadAsset));
      assetsLoaded = true;
    };

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min((elapsed / loadDuration) * 100, 100);
      setProgress(progressPercent);

      if (progressPercent >= 100 && assetsLoaded) {
        setTimeout(onLoadComplete, 500);
      } else {
        requestAnimationFrame(updateProgress);
      }
    };

    loadAllAssets();
    updateProgress();
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
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;