"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Globe, Loader2, VideoOff } from "lucide-react";

const LucideIcon = memo(({ icon: Icon, ...props }) => (
  <Icon
    strokeWidth={`var(--icon-stroke-width)`}
    style={{ minWidth: props.size, minHeight: props.size }}
    {...props}
  />
));

LucideIcon.displayName = "LucideIcon";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const modalVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25, 
      mass: 0.8 
    } 
  },
  exit: { 
    opacity: 0, 
    y: 10, 
    scale: 0.98, 
    transition: { 
      duration: 0.15 
    } 
  },
};

const closeButtonVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      delay: 0.1, 
      duration: 0.2 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    transition: { 
      duration: 0.1 
    } 
  }
};

const VideoSection = memo(({ project, shouldLoadVideo }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const hasVideo = project?.video && typeof project.video === "string";

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
    setVideoError(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoLoaded(false);
    setVideoError(true);
  }, []);

  useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } catch {}
    }
    
    return () => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
      }
    };
  }, [shouldLoadVideo]);

  if (!hasVideo) {
    return (
      <div className="video-placeholder">
        <LucideIcon icon={VideoOff} size={24} />
        <p className="no-preview-text">Preview not available</p>
      </div>
    );
  }

  return (
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
  );
});

VideoSection.displayName = "VideoSection";

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const scrollbarCompensationRef = useRef(null);

  const handleClickOutside = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const html = document.documentElement;
    
    if (isOpen) {
      scrollbarCompensationRef.current = scrollbarWidth;
      
      const originalStyles = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        htmlOverflow: html.style.overflow,
        htmlPaddingRight: html.style.paddingRight
      };
      
      document.addEventListener("mousedown", handleClickOutside);
      
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        html.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      const timer = setTimeout(() => setShouldLoadVideo(true), 50);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
        
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.paddingRight = originalStyles.paddingRight;
        html.style.overflow = originalStyles.htmlOverflow;
        html.style.paddingRight = originalStyles.htmlPaddingRight;
      };
    } else {
      const timerVideo = setTimeout(() => {
        setShouldLoadVideo(false);
      }, 200);
      
      return () => clearTimeout(timerVideo);
    }
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="project-modal-container">
          <motion.div
            className="project-modal-backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          <motion.div
            className="project-modal"
            ref={modalRef}
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="project-modal-content">
              <div className="project-video-container">
                <div className="video-wrapper">
                  <VideoSection project={project} shouldLoadVideo={shouldLoadVideo} />
                </div>
              </div>

              <div className="project-details">
                <div className="project-title-container">
                  <h2>{project.title}</h2>
                </div>

                <div className="project-description">
                  <p>{project.description}</p>
                </div>

                <div className="tag-row">
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
            variants={closeButtonVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <LucideIcon icon={X} size={18} />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}