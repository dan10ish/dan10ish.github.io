"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Globe, Loader2, VideoOff } from "lucide-react";

const LucideIcon = ({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
};

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const hasVideo = project?.video && typeof project.video === "string";

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoLoaded(false);
    setVideoError(true);
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
            playPromise.catch((error) => {});
          }
        } catch (err) {}
      }
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);

      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (err) {}
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
        } catch (err) {}
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
            <button
              className="project-modal-close"
              onClick={onClose}
              aria-label="Close project details"
            >
              <LucideIcon icon={X} size={18} />
            </button>
            <div className="project-modal-content">
              <div className="project-video-container">
                {hasVideo && shouldLoadVideo ? (
                  <div
                    className={`video-wrapper ${videoLoaded ? "loaded" : ""}`}
                  >
                    {!videoLoaded && (
                      <div className="video-placeholder">
                        <LucideIcon
                          icon={Loader2}
                          size={24}
                          className="loading-icon"
                        />
                      </div>
                    )}
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
                ) : (
                  <div className="video-placeholder">
                    <LucideIcon icon={VideoOff} size={24} />
                    <p className="no-preview-text">Preview not available</p>
                  </div>
                )}
              </div>

              <div className="project-details">
                <div className="project-title-container">
                  <h2>{project.title}</h2>
                  {project.tags && project.tags.length > 0 && (
                    <div className="project-tag">{project.tags[0]}</div>
                  )}
                </div>

                <div className="project-description">
                  <p>{project.description}</p>
                </div>

                <div className="project-links">
                  {project.sourceLink && (
                    <a
                      href={project.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link source-link"
                    >
                      <LucideIcon icon={Github} size={16} />
                      <span>Source</span>
                    </a>
                  )}

                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link demo-link"
                    >
                      <LucideIcon icon={Globe} size={16} />
                      <span>Live</span>
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
