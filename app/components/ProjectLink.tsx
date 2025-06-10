'use client';

import { useState } from 'react';
import { Github, Globe } from 'lucide-react';
import Link from 'next/link';
import VideoShowcase from './VideoShowcase';
import { AnimatePresence } from 'framer-motion';

interface ProjectLinkProps {
  name: string;
  tag: string;
  sourceCode?: string;
  liveDemo?: string;
  video?: string | null;
  onTagClick?: (tag: string) => void;
  isActiveTag?: boolean;
}

export default function ProjectLink({ name, tag, sourceCode, liveDemo, video, onTagClick, isActiveTag }: ProjectLinkProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (
      target.closest('a') ||
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.getAttribute('role') === 'button'
    ) {
      return;
    }
    
    setIsVideoOpen(true);
  };

  const hasValidVideo = video && video !== null;

  return (
    <>
      <div 
        className="group flex items-center justify-between !mb-2 !md:mb-1 cursor-pointer duration-100 rounded-md"
        onClick={handleRowClick}
      >
        <div className="text-[0.85rem] flex-shrink-0 mr-4 truncate group-hover:bg-[var(--code-bg)] group-hover:px-1.5 group-hover:py-0.5 group-hover:rounded-md transition-all duration-100 !px-2 !-mx-2">{name.toLowerCase()}</div>
        <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">
          <div className="flex justify-center min-w-[70px]">
            <div
              className="text-[0.88em] bg-[var(--code-bg)] text-[var(--secondary)] !px-1.5 !py-0.5 rounded-md whitespace-nowrap cursor-pointer transform transition-transform duration-0 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick && onTagClick(tag);
              }}
              role="button"
            >
              {tag}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {sourceCode && (
              <Link href={sourceCode} target="_blank" className="flex items-center justify-center w-[18px] h-[18px]" aria-label={`View source code for ${name}`}>
                <Github size={18} />
              </Link>
            )}
            {liveDemo ? (
              <Link href={liveDemo} target="_blank" className="flex items-center justify-center w-[18px] h-[18px]" aria-label={`Visit live demo for ${name}`}>
                <Globe size={18} />
              </Link>
            ) : (
              <div className="flex items-center justify-center w-[18px] h-[18px]" role="img" aria-label={`No live demo available for ${name}`}>
                 <Globe size={18} className="opacity-30" />
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <VideoShowcase
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoSrc={hasValidVideo ? `/videos/${video}` : null}
            projectName={name}
            githubUrl={sourceCode}
          />
        )}
      </AnimatePresence>
    </>
  );
} 