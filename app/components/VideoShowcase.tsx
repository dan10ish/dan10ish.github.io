'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Github, Globe } from 'lucide-react';

interface VideoShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string | null;
  projectName: string;
  githubUrl?: string;
  sourceCode?: string;
  liveDemo?: string;
}

interface ActionButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ActionButton = ({ isActive, onClick, icon, label }: ActionButtonProps) => (
  <button
    className={`
      !flex !items-center !gap-1 !text-xs !bg-[var(--code-bg)] !border !border-[var(--code-bg)] 
      !px-2 !py-1 !rounded-md !transition-transform !duration-0
      ${isActive 
        ? '!text-primary hover:!scale-105 hover:!bg-[var(--link-blue)] !cursor-pointer' 
        : '!text-primary !opacity-30 !cursor-not-allowed !pointer-events-none'
      }
    `}
    onClick={isActive ? onClick : undefined}
    disabled={!isActive}
  >
    <span className="![color:var(--secondary)] [&>svg]:![color:var(--secondary)] [&>svg]:!hover:[color:var(--secondary)] [&>svg]:![transform:none] [&>svg]:!hover:[transform:none]">
      {icon}
    </span>
    {label}
  </button>
);

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

  const openLink = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  if (!isOpen) return null;

  const spacing = '!mt-6';

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
          className={`!absolute !right-0 !z-10 !text-[0.88em] !px-1.5 !py-0.5 !rounded-md !transition-transform !duration-75 hover:!scale-105 !-top-12 sm:!-top-14`}
          style={{ backgroundColor: 'var(--clear-filter-bg)', color: 'var(--clear-filter-text)' }}
        >
          Close
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="!relative !aspect-square !rounded-lg !overflow-hidden !shadow-2xl"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0 }}
          className={`!flex !items-center !justify-between !px-0 ${spacing}`}
        >
                      <div className="!text-xs !text-secondary !pointer-events-none">
            {projectName.toLowerCase()}
          </div>
                      <div className="!flex !items-center !gap-2">
            <ActionButton
              isActive={!!sourceCode}
              onClick={() => sourceCode && openLink(sourceCode)}
              icon={<Github size={14} />}
              label="Source"
            />
            <ActionButton
              isActive={!!liveDemo}
              onClick={() => liveDemo && openLink(liveDemo)}
              icon={<Globe size={14} />}
              label="Live"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 