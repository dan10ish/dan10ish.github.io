'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface VideoShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  projectName: string;
}

export default function VideoShowcase({ isOpen, onClose, videoSrc, projectName }: VideoShowcaseProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const scrollRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      
      scrollRef.current = window.pageYOffset;
      
      const root = document.documentElement;
      root.style.setProperty('--scroll-y', `-${scrollRef.current}px`);
      
      document.body.classList.add('modal-open');
      
      const style = document.createElement('style');
      style.id = 'modal-scroll-lock';
      style.textContent = `
        .modal-open {
          position: fixed !important;
          top: var(--scroll-y) !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);
      
      const themeToggle = document.querySelector('[aria-label="Toggle theme"]') as HTMLElement;
      if (themeToggle) {
        themeToggle.style.visibility = 'hidden';
      }
    } else {
      document.body.classList.remove('modal-open');
      
      const style = document.getElementById('modal-scroll-lock');
      if (style) {
        style.remove();
      }
      
      window.scrollTo(0, scrollRef.current);
      
      const themeToggle = document.querySelector('[aria-label="Toggle theme"]') as HTMLElement;
      if (themeToggle) {
        themeToggle.style.visibility = 'visible';
        themeToggle.style.transform = 'scale(0.85)';
        themeToggle.style.opacity = '0';
        themeToggle.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
          themeToggle.style.transform = 'scale(1)';
          themeToggle.style.opacity = '1';
        });
        
        setTimeout(() => {
          themeToggle.style.transition = '';
          themeToggle.style.transform = '';
          themeToggle.style.opacity = '';
        }, 300);
      }
    }

    return () => {
      document.body.classList.remove('modal-open');
      const style = document.getElementById('modal-scroll-lock');
      if (style) style.remove();
      
      const themeToggle = document.querySelector('[aria-label="Toggle theme"]') as HTMLElement;
      if (themeToggle) {
        themeToggle.style.visibility = '';
        themeToggle.style.transition = '';
        themeToggle.style.opacity = '';
        themeToggle.style.transform = '';
      }
    };
  }, [isOpen]);

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{ 
        backgroundColor: 'var(--background)',
        backdropFilter: 'blur(1px)'
      }}
      onClick={handleBackdropClick}
    >
      <div className="relative">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          onClick={handleClose}
          className="absolute -top-12 sm:-top-14 right-0 z-10 !text-[0.88em] !px-1.5 !py-0.5 !rounded-md transition-transform duration-75 hover:scale-105"
          style={{
            backgroundColor: 'var(--clear-filter-bg)',
            color: 'var(--clear-filter-text)',
          }}
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
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotate: 360
                }}
                transition={{
                  rotate: { 
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <Loader2 size={28} className="opacity-65" />
              </motion.div>
            </div>
          )}

          {hasError ? (
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
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
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