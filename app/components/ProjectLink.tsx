'use client';

import { Github, Globe } from 'lucide-react';
import Link from 'next/link';

interface ProjectLinkProps {
  name: string;
  sourceCode?: string;
  liveDemo?: string;
}

export default function ProjectLink({ name, sourceCode, liveDemo }: ProjectLinkProps) {
  return (
    <div className="flex items-center mb-4">
      <div className="text-[0.9rem] flex-shrink-0">{name.toLowerCase()}</div>
      <div className="w-3 flex-shrink-0"></div>
      <div className="flex items-center gap-3">
        {sourceCode && (
          <Link href={sourceCode} target="_blank" className="flex items-center justify-center" aria-label={`View source code for ${name}`}>
            <Github size={20} />
          </Link>
        )}
        {liveDemo && (
          <Link href={liveDemo} target="_blank" className="flex items-center justify-center" aria-label={`Visit live demo for ${name}`}>
            <Globe size={20} />
          </Link>
        )}
      </div>
    </div>
  );
} 