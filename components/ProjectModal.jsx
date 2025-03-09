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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  
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
      
      setVideoLoaded(false);
      setVideoError(false);
      
      setShouldLoadVideo(true);
      
      if (videoRef.current) {
        try {
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Auto-play prevented:", error);
            });
          }
        } catch (err) {
          console.log("Video error:", err);
        }
      }
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (err) {
          console.log("Error pausing video:", err);
        }
      }
      
      setTimeout(() => {
        if (!isOpen) {
          setShouldLoadVideo(false);
        }
      }, 150);
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
            transition={{ 
              duration: 0.15,
              exit: { duration: 0.1 }
            }}
          />
          
          <motion.div
            className="project-modal"
            ref={modalRef}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 25,
              mass: 0.8,
              opacity: { duration: 0.15 },
              exit: { 
                type: "tween", 
                ease: "easeInOut", 
                duration: 0.12 
              }
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
                    {!videoLoaded && (
                      <div className="video-loading">
                        <div className="loading-spinner"></div>
                      </div>
                    )}
                    
                    {shouldLoadVideo && (
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
                    )}
                  </div>
                ) : videoError ? (
                  <div className="video-error">
                    <LucideIcon icon={VideoOff} size={32} />
                    <p>Video could not be loaded</p>
                  </div>
                ) : (
                  <div className="video-unavailable">
                    <LucideIcon icon={VideoOff} size={32} />
                    <p>No preview available</p>
                  </div>
                )}
              </div>
              
              <div className="project-details">
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
                
                <div className="project-tags">
                  <span className="tag-label">Tag: </span>
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