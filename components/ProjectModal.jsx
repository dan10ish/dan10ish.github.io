"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Globe, Loader2, VideoOff } from "lucide-react";

const LucideIcon = memo(({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} style={{ minWidth: props.size, minHeight: props.size }} {...props} />;
});

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const hasVideo = project?.video && typeof project.video === "string";

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
    setVideoError(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoLoaded(false);
    setVideoError(true);
  }, []);

  const handleClickOutside = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-modal-open');
      document.addEventListener("mousedown", handleClickOutside);

      setVideoLoaded(false);
      setVideoError(false);
      
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 50);

      if (videoRef.current) {
        try {
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } catch {}
      }
      
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove('body-modal-open');
      document.removeEventListener("mousedown", handleClickOutside);

      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
      }

      const timer = setTimeout(() => {
        if (!isOpen) {
          setShouldLoadVideo(false);
        }
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('body-modal-open');
      document.removeEventListener("mousedown", handleClickOutside);

      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
      }
    };
  }, [handleClickOutside]);

  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="project-modal-container">
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              exit: { duration: 0.1 },
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
                duration: 0.12,
              },
            }}
          >
            <div className="project-modal-content">
              <div className="project-video-container">
                <div className="video-wrapper">
                  {hasVideo ? (
                    <>
                      {!videoLoaded && !videoError && (
                        <div className="video-placeholder">
                          <LucideIcon
                            icon={Loader2}
                            size={24}
                            className="loading-icon"
                          />
                        </div>
                      )}
                      {shouldLoadVideo && (
                        <video
                          ref={videoRef}
                          className={`project-video ${videoLoaded ? "loaded" : "hidden"}`}
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
                    </>
                  ) : (
                    <div className="video-placeholder">
                      <LucideIcon icon={VideoOff} size={24} />
                      <p className="no-preview-text">Preview not available</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="project-details">
                <div className="project-title-container">
                  <h2>{project.title}</h2>
                </div>

                <div className="project-description">
                  <p>{project.description}</p>
                </div>

                <div className="tag-status-row">
                  <div className="left-items">
                    {project.tags && project.tags.length > 0 && (
                      <div className="project-tag">{project.tags[0]}</div>
                    )}
                    <div className={`status-pill ${project.status}`}>
                      <span className="status-dot"></span>
                      <span className="status-text">
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="right-items">
                    {project.sourceLink && (
                      <a
                        href={project.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-icon-link"
                      >
                        <LucideIcon icon={Github} size={22} />
                      </a>
                    )}

                    {project.projectLink && (
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-icon-link link-icon"
                      >
                        <LucideIcon icon={Globe} size={22} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.button
            className="modal-close"
            onClick={onClose}
            aria-label="Close project details"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              delay: 0,
              duration: 0.15,
            }}
          >
            <LucideIcon icon={X} size={18} />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
