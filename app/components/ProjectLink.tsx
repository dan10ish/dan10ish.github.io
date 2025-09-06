'use client';

import { Github, Globe } from 'lucide-react';
import Link from 'next/link';

interface ProjectLinkProps {
  name: string;
  tag: string;
  sourceCode?: string;
  liveDemo?: string;
  onTagClick?: (tag: string) => void;
  isActiveTag?: boolean;
}

export default function ProjectLink({ name, tag, sourceCode, liveDemo, onTagClick, isActiveTag }: ProjectLinkProps) {
  return (
    <div className="flex items-center justify-between !mb-2 md:!mb-2">
      <div className="text-[0.85rem] flex-shrink-0 mr-4 truncate font-medium">{name.toLowerCase()}</div>
      <div className="flex items-center !gap-4 md:gap-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          {sourceCode && (
            <Link href={sourceCode} target="_blank" className="flex items-center justify-center" aria-label={`View source code for ${name}`}>
              <Github size={19} />
            </Link>
          )}
          {liveDemo ? (
            <Link href={liveDemo} target="_blank" className="flex items-center justify-center" aria-label={`Visit live demo for ${name}`}>
              <Globe size={19} />
            </Link>
          ) : (
            <div className="flex items-center justify-center w-[18px] h-[18px]" role="img" aria-label={`No live demo available for ${name}`}>
               <Globe size={19} className="opacity-30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 