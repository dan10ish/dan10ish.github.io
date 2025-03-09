"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Github, VideoOff } from "lucide-react";

const LucideIcon = ({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
};

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const hasVideo = project?.video && typeof project.video === 'string';
  
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };
  
  const handleVideoError = () => {
    setVideoLoaded(false);
    setVideoError(true);
    console.log("Video failed to load:", project?.video);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      
      // Reset video state when opening modal
      setVideoLoaded(false);
      setVideoError(false);
      
      if (videoRef.current) {
        // Reset video state
        try {
          videoRef.current.currentTime = 0;
          // Try to play the video after user interaction
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Auto-play prevented:", error);
              // We'll let the video start when it can
            });
          }
        } catch (err) {
          console.log("Video error:", err);
        }
      }
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      
      // Pause video when closing modal
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (err) {
          console.log("Error pausing video:", err);
        }
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (err) {
          console.log("Error cleanup:", err);
        }
      }
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="project-modal-container">
          <motion.div 
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="project-modal"
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 350,
              opacity: { duration: 0.25 }
            }}
          >
            <div className="project-modal-header">
              <h2>{project.title}</h2>
              <button 
                className="project-modal-close"
                onClick={onClose}
                aria-label="Close project details"
              >
                <LucideIcon icon={X} size={20} />
              </button>
            </div>
            
            <div className="project-modal-content">
              <div className="project-video-container">
                {hasVideo ? (
                  <div className={`video-wrapper ${videoLoaded ? 'loaded' : ''}`}>
                    <video 
                      ref={videoRef}
                      className="project-video"
                      src={`/project-videos/${project.video}`}
                      playsInline
                      autoPlay
                      muted
                      loop
                      disablePictureInPicture
                      disableRemotePlayback
                      controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
                      preload="auto"
                      onLoadedData={handleVideoLoad}
                      onError={handleVideoError}
                    />
                  </div>
                ) : videoError ? (
                  <div className="video-error">
                    <LucideIcon icon={VideoOff} size={32} />
                    <p>Video could not be loaded</p>
                  </div>
                ) : (
                  <div className="video-unavailable">
                    <LucideIcon icon={VideoOff} size={32} />
                    <p>No video available</p>
                  </div>
                )}
              </div>
              
              <div className="project-details">
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
                
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.sourceLink && (
                    <a 
                      href={project.sourceLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <LucideIcon icon={Github} size={18} />
                      <span>Source Code</span>
                    </a>
                  )}
                  
                  {project.projectLink && (
                    <a 
                      href={project.projectLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <LucideIcon icon={Globe} size={18} />
                      <span>Live Project</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 