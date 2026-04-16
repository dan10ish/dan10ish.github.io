'use client';

import { useState } from 'react';
import { Video, Globe, X } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import VideoShowcase from './VideoShowcase';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Project {
  name: string;
  tag: string;
  sourceCode?: string;
  liveDemo?: string;
  video?: string | null;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openVideoProject, setOpenVideoProject] = useState<Project | null>(null);

  const sortedProjects = activeTag
    ? [
        ...projects.filter((p) => p.tag === activeTag),
        ...projects.filter((p) => p.tag !== activeTag),
      ]
    : projects;

  const allTags = Array.from(new Set(projects.map((p) => p.tag)));

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  const handleVideoClick = (project: Project) => {
    if (project.video && (!activeTag || project.tag === activeTag)) {
      setOpenVideoProject(project);
    }
  };

  const handleLinkClick = (url: string | undefined, project: Project) => {
    if (url && (!activeTag || project.tag === activeTag)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs transition-colors',
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'bg-background text-foreground hover:bg-accent'
                )}
              >
                {tag}
                {isActive && <X size={14} className="text-destructive" />}
              </button>
            );
          })}
        </div>

        <ScrollArea scrollbarGutter className="h-80 rounded-md border">
          <ul className="divide-y px-2">
            {sortedProjects.map((project) => {
              const isFiltered = activeTag !== null && project.tag !== activeTag;
              return (
                <li
                  key={project.name}
                  className={cn(
                    'flex items-center justify-between gap-3 py-2',
                    isFiltered && 'pointer-events-none opacity-40'
                  )}
                >
                  <span className="truncate text-sm">{project.name.toLowerCase()}</span>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleVideoClick(project)}
                      disabled={!project.video || isFiltered}
                      aria-label={`Play ${project.name} demo`}
                      className="inline-flex size-[18px] items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                    >
                      <Video size={18} />
                    </button>

                    <button
                      onClick={() => handleLinkClick(project.sourceCode, project)}
                      disabled={!project.sourceCode || isFiltered}
                      aria-label={`Source code for ${project.name}`}
                      className="inline-flex size-[18px] items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                    >
                      <GithubIcon size={18} />
                    </button>

                    <button
                      onClick={() => handleLinkClick(project.liveDemo, project)}
                      disabled={!project.liveDemo || isFiltered}
                      aria-label={`Live demo for ${project.name}`}
                      className="inline-flex size-[18px] items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                    >
                      <Globe size={18} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </section>

      <VideoShowcase
        isOpen={!!openVideoProject}
        onClose={() => setOpenVideoProject(null)}
        videoSrc={openVideoProject?.video ? `/videos/${openVideoProject.video}` : null}
        projectName={openVideoProject?.name ?? ''}
        sourceCode={openVideoProject?.sourceCode}
        liveDemo={openVideoProject?.liveDemo}
      />
    </>
  );
}
