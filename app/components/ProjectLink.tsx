'use client';

import { Github, Globe } from 'lucide-react';
import Link from 'next/link';

interface ProjectLinkProps {
  name: string;
  tag: string;
  sourceCode?: string;
  liveDemo?: string;
}

export default function ProjectLink({ name, tag, sourceCode, liveDemo }: ProjectLinkProps) {
  return (
    <div className="flex items-center justify-between mb-2 md:mb-1">
      <div className="text-[0.85rem] flex-shrink-0 mr-4 truncate">{name.toLowerCase()}</div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="w-20 flex justify-center">
          <div className="text-[0.88em] bg-[var(--code-bg)] text-[var(--secondary)] !px-1.5 !py-0.5 rounded-md whitespace-nowrap">
            {tag}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {sourceCode && (
            <Link href={sourceCode} target="_blank" className="flex items-center justify-center" aria-label={`View source code for ${name}`}>
              <Github size={18} />
            </Link>
          )}
          {liveDemo ? (
            <Link href={liveDemo} target="_blank" className="flex items-center justify-center" aria-label={`Visit live demo for ${name}`}>
              <Globe size={18} />
            </Link>
          ) : (
            <div className="flex items-center justify-center w-[18px] h-[18px]" aria-label={`No live demo available for ${name}`}>
               <Globe size={18} className="opacity-30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 