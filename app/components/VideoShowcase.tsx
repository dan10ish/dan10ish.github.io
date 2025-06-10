'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface VideoShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  projectName: string;
  githubUrl?: string;
}

export default function VideoShowcase({ isOpen, onClose, videoSrc, projectName }: VideoShowcaseProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          style={{ 
            backgroundColor: 'var(--background)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          onClick={handleBackdropClick}
        >
          <div className="relative">
            <div className="absolute -top-12 sm:-top-16 right-0 z-10">
              <button
                onClick={onClose}
                className="!text-[0.88em] !px-1.5 !py-0.5 !rounded-md transform transition-transform duration-0 hover:scale-105"
                style={{
                  backgroundColor: 'var(--clear-filter-bg)',
                  color: 'var(--clear-filter-text)',
                }}
              >
                Close
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[85vw] sm:max-w-md aspect-square rounded-lg overflow-hidden"
              style={{ 
                backgroundColor: 'var(--code-bg)',
                maxHeight: '85vh',
                width: 'min(85vw, 85vh)'
              }}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 size={24} className="animate-spin opacity-70" />
                </div>
              )}

              {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center text-sm opacity-70">
                  Video failed to load
                </div>
              ) : (
                <video
                  src={videoSrc}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  controlsList="nodownload nofullscreen noremoteplaybook"
                  disablePictureInPicture
                  onLoadedData={handleVideoLoad}
                  onError={handleVideoError}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ display: isLoading ? 'none' : 'block' }}
                />
              )}

              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-xs opacity-70">
                {projectName.toLowerCase()}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 