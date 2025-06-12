'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Github, Globe } from 'lucide-react';

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
  liveDemo 
}: VideoShowcaseProps) {
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

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const preventDefault = (e: Event) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
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
      className="!fixed !inset-0 !z-[70] !flex !flex-col !items-center !justify-center !p-4"
      style={{ backgroundColor: 'var(--background)', backdropFilter: 'blur(1px)' }}
      onClick={handleBackdropClick}
    >
      <div className="!relative">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          onClick={handleClose}
          className="!absolute !right-0 !z-10 !text-[0.88em] !px-2 !py-0.5 !rounded-md !transition-transform !duration-0 !-top-12 sm:!-top-14"
          style={{ 
            backgroundColor: 'var(--clear-filter-bg)', 
            color: 'var(--clear-filter-text)'
          }}
          onMouseEnter={(e) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          Close
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="!relative !aspect-square !rounded-lg !overflow-hidden !shadow-lg"
          style={{
            backgroundColor: 'var(--code-bg)',
            width: 'min(82vw, 82vh, 26rem)',
            maxWidth: '26rem'
          }}
        >
          {isLoading && videoSrc && (
            <div className="!absolute !inset-0 !flex !items-center !justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={28} className="!opacity-65" />
              </motion.div>
            </div>
          )}

          {!videoSrc ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="!absolute !inset-0 !flex !items-center !justify-center !text-xs !opacity-75"
            >
              No video available
            </motion.div>
          ) : hasError ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="!absolute !inset-0 !flex !items-center !justify-center !text-sm !opacity-65"
            >
              Video failed to load
            </motion.div>
          ) : (
            <video
              key={videoSrc}
              src={videoSrc}
              className="!w-full !h-full !object-cover"
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
        </motion.div>

        <div className="!flex !items-center !justify-between !px-0 !mt-8">
          <div className="!text-xs !pointer-events-none" style={{ color: 'var(--secondary)' }}>
            {projectName.toLowerCase()}
          </div>
          <div className="!flex !items-center !gap-2">
            <button
              className="action-button !flex !items-center !gap-1 !text-xs !px-3 !py-1.5 !rounded-md !border-0"
              style={{
                backgroundColor: 'var(--code-bg)',
                color: 'var(--foreground)',
                opacity: sourceCode ? '1' : '0.3',
                cursor: sourceCode ? 'pointer' : 'not-allowed',
                pointerEvents: sourceCode ? 'auto' : 'none',
                transition: 'none'
              }}
              onMouseEnter={(e) => {
                if (sourceCode && window.matchMedia('(hover: hover)').matches) {
                  e.currentTarget.style.backgroundColor = 'var(--link-blue)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  // Check if light mode
                  const computedStyle = getComputedStyle(document.documentElement);
                  const bgColor = computedStyle.getPropertyValue('--background').trim();
                  if (bgColor === '#F7F7F7') {
                    e.currentTarget.style.color = 'white';
                    const svg = e.currentTarget.querySelector('svg');
                    if (svg) svg.style.color = 'white';
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (sourceCode && window.matchMedia('(hover: hover)').matches) {
                  e.currentTarget.style.backgroundColor = 'var(--code-bg)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = 'var(--foreground)';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.color = 'var(--foreground)';
                }
              }}
              onClick={() => sourceCode && window.open(sourceCode, '_blank')}
              disabled={!sourceCode}
            >
              <Github size={14} style={{ color: 'var(--foreground)' }} />
              Source
            </button>
            <button
              className="action-button !flex !items-center !gap-1 !text-xs !px-3 !py-1.5 !rounded-md !border-0"
              style={{
                backgroundColor: 'var(--code-bg)',
                color: 'var(--foreground)',
                opacity: liveDemo ? '1' : '0.3',
                cursor: liveDemo ? 'pointer' : 'not-allowed',
                pointerEvents: liveDemo ? 'auto' : 'none',
                transition: 'none'
              }}
              onMouseEnter={(e) => {
                if (liveDemo && window.matchMedia('(hover: hover)').matches) {
                  e.currentTarget.style.backgroundColor = 'var(--link-blue)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  // Check if light mode
                  const computedStyle = getComputedStyle(document.documentElement);
                  const bgColor = computedStyle.getPropertyValue('--background').trim();
                  if (bgColor === '#F7F7F7') {
                    e.currentTarget.style.color = 'white';
                    const svg = e.currentTarget.querySelector('svg');
                    if (svg) svg.style.color = 'white';
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (liveDemo && window.matchMedia('(hover: hover)').matches) {
                  e.currentTarget.style.backgroundColor = 'var(--code-bg)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = 'var(--foreground)';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.color = 'var(--foreground)';
                }
              }}
              onClick={() => liveDemo && window.open(liveDemo, '_blank')}
              disabled={!liveDemo}
            >
              <Globe size={14} style={{ color: 'var(--foreground)' }} />
              Live
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 