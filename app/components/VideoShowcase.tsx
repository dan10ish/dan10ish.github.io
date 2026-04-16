'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Globe, X } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

interface VideoShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string | null;
  projectName: string;
  sourceCode?: string;
  liveDemo?: string;
}

export default function VideoShowcase({
  isOpen,
  onClose,
  videoSrc,
  projectName,
  sourceCode,
  liveDemo,
}: VideoShowcaseProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(!!videoSrc);
    setHasError(false);

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, videoSrc, handleClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) handleClose();
    },
    [handleClose]
  );

  if (!isOpen) return null;

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdropClick}
      className="project-dialog-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} preview`}
    >
      <button
        type="button"
        onClick={handleClose}
        className="project-dialog-close"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="project-dialog-content"
      >
        <div className="project-dialog-header">
          <h2 className="project-dialog-title">{projectName.toLowerCase()}</h2>
          <div className="project-dialog-actions">
            <button
              type="button"
              className="project-dialog-action"
              onClick={() => sourceCode && window.open(sourceCode, '_blank', 'noopener,noreferrer')}
              disabled={!sourceCode}
              aria-label="Source code"
            >
              <GithubIcon size={16} />
              <span>Source</span>
            </button>
            <button
              type="button"
              className="project-dialog-action"
              onClick={() => liveDemo && window.open(liveDemo, '_blank', 'noopener,noreferrer')}
              disabled={!liveDemo}
              aria-label="Live demo"
            >
              <Globe size={16} />
              <span>Live</span>
            </button>
          </div>
        </div>

        <div className="project-dialog-media">
          {isLoading && videoSrc && (
            <div className="project-dialog-loader">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 size={28} />
              </motion.div>
            </div>
          )}

          {!videoSrc ? (
            <div className="project-dialog-placeholder">No video available</div>
          ) : hasError ? (
            <div className="project-dialog-placeholder">Video failed to load</div>
          ) : (
            <video
              key={videoSrc}
              src={videoSrc}
              className="project-dialog-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              onLoadedData={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              onContextMenu={(e) => e.preventDefault()}
              style={{ visibility: isLoading ? 'hidden' : 'visible' }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
