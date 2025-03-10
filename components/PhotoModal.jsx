"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Maximize2, Frame, Target, Aperture, Timer, MapPin, Loader2 } from "lucide-react";

const LucideIcon = ({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
};

export default function PhotoModal({ photo, isOpen, onClose }) {
  const photoRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  const handleClickOutside = (e) => {
    if (photoRef.current && !photoRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      scrollPositionRef.current = window.scrollY;
      
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      
      document.addEventListener("mousedown", handleClickOutside);
      setImageLoaded(false);
      
      if (photo && photo.src) {
        const preloadImg = new Image();
        preloadImg.onload = () => {
          if (imgRef.current) {
            imgRef.current.src = photo.src;
            setImageLoaded(true);
          }
        };
        preloadImg.src = photo.src;
      }
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "";
      
      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);
      
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, photo]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!photo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="photo-modal-container">
          <motion.div
            className="photo-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              exit: { duration: 0.1 },
            }}
          />
          
          <div className="photo-modal-content-wrapper">
            {!imageLoaded && (
              <div className="photo-placeholder">
                <LucideIcon
                  icon={Loader2}
                  size={24}
                  className="loading-icon"
                />
              </div>
            )}
            
            <motion.div
              className="photo-content"
              ref={photoRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 0.8,
              }}
            >
              <button
                className="photo-modal-close"
                onClick={onClose}
                aria-label="Close photo details"
              >
                <LucideIcon icon={X} size={18} />
              </button>
              
              <img 
                ref={imgRef}
                src={photo.src} 
                alt="" 
                className={`photo-full-image ${imageLoaded ? 'loaded' : ''}`}
                loading="eager" 
                decoding="async" 
                onLoad={handleImageLoad}
                style={{ userSelect: "none", WebkitUserSelect: "none" }}
                draggable="false"
              />
              
              {imageLoaded && (
                <>
                  {/* Top Left Corner */}
                  <div className="photo-meta-corner top-left">
                    <div className="meta-row">
                      <Camera size={14} className="meta-icon" />
                      <span>{photo.meta.camera}</span>
                    </div>
                  </div>
                  
                  {/* Top Right Corner */}
                  <div className="photo-meta-corner top-right">
                    <div className="meta-row">
                      <Maximize2 size={14} className="meta-icon" />
                      <span>{photo.meta.resolution}</span>
                    </div>
                  </div>
                  
                  {/* Bottom Left Corner */}
                  <div className="photo-meta-corner bottom-left">
                    <div className="meta-row">
                      <Target size={14} className="meta-icon" />
                      <span>{photo.meta.focalLength}</span>
                      <Timer size={14} className="meta-icon" />
                      <span>{photo.meta.shutterspeed}</span>
                    </div>
                  </div>
                  
                  {/* Bottom Right Corner */}
                  <div className="photo-meta-corner bottom-right">
                    <div className="meta-row">
                      <Frame size={14} className="meta-icon" />
                      <span>ISO {photo.meta.iso}</span>
                      <Aperture size={14} className="meta-icon" />
                      <span>{photo.meta.aperture}</span>
                    </div>
                    {photo.meta.country && (
                      <div className="meta-row">
                        <MapPin size={14} className="meta-icon" />
                        <span>{photo.meta.country}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
} 