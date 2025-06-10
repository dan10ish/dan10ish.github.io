'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Github } from 'lucide-react';

interface VideoShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string | null;
  projectName: string;
  githubUrl?: string;
}

export default function VideoShowcase({ isOpen, onClose, videoSrc, projectName, githubUrl }: VideoShowcaseProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleClose = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(!!videoSrc);
    setHasError(false);

    const originalStyle = window.getComputedStyle(document.body);
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const preventDefault = (e: Event) => e.preventDefault();
    
    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.paddingRight = originalStyle.paddingRight;
      
      document.removeEventListener('touchmove', preventDefault);
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--background)', backdropFilter: 'blur(1px)' }}
      onClick={handleBackdropClick}
    >
      <div className="relative">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          onClick={handleClose}
          className="absolute -top-12 sm:-top-14 right-0 z-10 !text-[0.88em] !px-1.5 !py-0.5 !rounded-md transition-transform duration-75 hover:scale-105"
          style={{ backgroundColor: 'var(--clear-filter-bg)', color: 'var(--clear-filter-text)' }}
        >
          Close
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="relative aspect-square rounded-lg overflow-hidden shadow-2xl"
          style={{ 
            backgroundColor: 'var(--code-bg)',
            width: 'min(82vw, 82vh, 26rem)',
            maxWidth: '26rem'
          }}
        >
          {isLoading && videoSrc && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={28} className="opacity-65" />
              </motion.div>
            </div>
          )}

          {!videoSrc ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-sm opacity-75 gap-4"
            >
              <div className="text-center">
                <div className="mb-2">No video available</div>
              </div>
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex !items-center gap-2 bg-[var(--background)] !text-[var(--primary)] !px-2 !py-1 rounded-md hover:scale-102 duration-75"
                >
                  View on GitHub
                </a>
              )}
            </motion.div>
          ) : hasError ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center text-sm opacity-65"
            >
              Video failed to load
            </motion.div>
          ) : (
            <video
              key={videoSrc}
              src={videoSrc}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              controls={false}
              controlsList="nodownload nofullscreen noremoteplaybook"
              disablePictureInPicture
              onLoadedData={() => setIsLoading(false)}
              onError={() => { setIsLoading(false); setHasError(true); }}
              onContextMenu={(e) => e.preventDefault()}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-3 left-3 text-xs opacity-65 pointer-events-none"
          >
            {projectName.toLowerCase()}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
} 