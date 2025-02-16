import { useState, useEffect, useRef } from "react";
import { Info, X, Camera, Maximize2, Frame, Target, Aperture, Timer } from "lucide-react";

const LucideIcon = ({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
};

export const PhotoCard = ({ photo }) => {
  const [showMeta, setShowMeta] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setShowMeta(false);
      }
    };

    if (showMeta) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMeta]);

  return (
    <div className="photo-card">
      <div className="photo-container">
        <img src={photo.url} alt={photo.alt} />
        <button 
          className="photo-meta-icon"
          onClick={() => setShowMeta(true)}
        >
          <LucideIcon icon={Info} size={16} />
        </button>
        <div 
          ref={overlayRef}
          className={`photo-meta-overlay ${showMeta ? 'visible' : ''}`}
        >
          <div className="photo-meta-header">
            <button 
              className="photo-meta-close"
              onClick={() => setShowMeta(false)}
            >
              <LucideIcon icon={X} size={20} />
            </button>
          </div>
          <div className="meta-content">
            <div className="meta-row">
              <LucideIcon icon={Camera} size={16} />
              <span>{photo.camera}</span>
            </div>
            <div className="meta-row">
              <LucideIcon icon={Maximize2} size={16} />
              <span>{photo.resolution}</span>
            </div>
            <div className="meta-row">
              <LucideIcon icon={Frame} size={16} />
              <span>ISO {photo.iso}</span>
              <LucideIcon icon={Aperture} size={16} />
              <span>{photo.aperture}</span>
            </div>
            <div className="meta-row">
              <LucideIcon icon={Target} size={16} />
              <span>{photo.focalLength}</span>
              <LucideIcon icon={Timer} size={16} />
              <span>{photo.shutterspeed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 