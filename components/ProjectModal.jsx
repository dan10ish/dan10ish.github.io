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
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 30 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { 
      duration: 0.15 
    } 
  },
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
        <span>No preview available</span>
      </div>
    );
  }

  return (
    <>
      {!videoLoaded && !videoError && (
        <div className="video-placeholder">
          <LucideIcon icon={Loader2} size={24} className="loading-icon" />
          <span>Loading...</span>
        </div>
      )}
      {videoError && (
        <div className="video-placeholder">
          <LucideIcon icon={VideoOff} size={24} />
          <span>Failed to load</span>
        </div>
      )}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          className={`modal-video ${videoLoaded ? "loaded" : ""}`}
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

  const handleClickOutside = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      
      const timer = setTimeout(() => setShouldLoadVideo(true), 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "";
      };
    } else {
      setShouldLoadVideo(false);
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
        <div className="modal-overlay">
          <motion.div
            className="modal-backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          
          <motion.div
            className="modal"
            ref={modalRef}
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button className="modal-close-btn" onClick={onClose}>
              <LucideIcon icon={X} size={20} />
            </button>

            <div className="modal-video-container">
              <VideoSection project={project} shouldLoadVideo={shouldLoadVideo} />
            </div>

            <div className="modal-footer">
              <h3 className="modal-title">{project.title}</h3>
              <div className="modal-links">
                <a
                  href={project.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`modal-link ${!project.sourceLink ? 'disabled' : ''}`}
                  onClick={(e) => !project.sourceLink && e.preventDefault()}
                >
                  <LucideIcon icon={Github} size={20} />
                </a>
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`modal-link ${!project.projectLink ? 'disabled' : ''}`}
                  onClick={(e) => !project.projectLink && e.preventDefault()}
                >
                  <LucideIcon icon={Globe} size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}