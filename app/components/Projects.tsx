'use client';

import { useState } from 'react';
import { Video, Github, Globe, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import VideoShowcase from './VideoShowcase';

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

  // Sort projects: filtered projects first, then others with reduced opacity
  const sortedProjects = activeTag 
    ? [
        ...projects.filter(project => project.tag === activeTag),
        ...projects.filter(project => project.tag !== activeTag)
      ]
    : projects;

  const allTags = Array.from(new Set(projects.map(project => project.tag)));

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null);
    } else {
      setActiveTag(tag);
    }
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
      <section>
        {/* Tag Filter */}
        <div className="!flex !flex-wrap !gap-2 !mb-5">
          {allTags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="text-xs! px-2! py-0.5! rounded-md! flex! items-center! gap-1.5!"
                style={{
                  backgroundColor: isActive ? 'var(--code-bg)' : 'var(--background)',
                  borderWidth: '1.5px',
                  borderColor: 'var(--glass-border)',
                  color: 'var(--foreground)',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)'
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
                <span>{tag}</span>
                {isActive && (
                  <X 
                    size={16} 
                    style={{ color: 'var(--clear-filter-text)' }}
                    className="shrink-0!"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Projects List */}
        <div className="!space-y-1">
          {sortedProjects.map((project, index) => {
            const isFiltered = activeTag !== null && project.tag !== activeTag;
            const isLastProject = index === sortedProjects.length - 1;
            
            return (
              <div key={project.name} className="!group">
                <div 
                  className="!flex !items-center !justify-between !py-1 !px-2 !rounded-md"
                  style={{ 
                    opacity: isFiltered ? 0.4 : 1,
                    pointerEvents: isFiltered ? 'none' : 'auto'
                  }}
                >
                  {/* Project Name */}
                  <div className="!flex-1 !min-w-0">
                    <span className="!text-[0.85rem] !truncate !block">
                      {project.name.toLowerCase()}
                    </span>
                  </div>

                  {/* Action Icons */}
                  <div className="!flex !items-center !gap-3 !flex-shrink-0">
                    {/* Video Play Button */}
                    <button
                      onClick={() => handleVideoClick(project)}
                      disabled={!project.video || isFiltered}
                      className="!flex !items-center !justify-center !w-[18px] !h-[18px] !transition-all !duration-200"
                      style={{
                        opacity: project.video && !isFiltered ? 1 : 0.3,
                        cursor: project.video && !isFiltered ? 'pointer' : 'not-allowed'
                      }}
                      onMouseEnter={(e) => {
                        if (project.video && !isFiltered && window.matchMedia('(hover: hover)').matches) {
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon) {
                            icon.style.color = 'var(--link-blue)';
                            icon.style.transform = 'scale(1.1)';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon) {
                            icon.style.color = 'var(--secondary)';
                            icon.style.transform = 'scale(1)';
                          }
                        }
                      }}
                    >
                      <Video 
                        size={18} 
                        style={{ color: 'var(--secondary)' }}
                      />
                    </button>

                    {/* GitHub Link */}
                    <button
                      onClick={() => handleLinkClick(project.sourceCode, project)}
                      disabled={!project.sourceCode || isFiltered}
                      className="!flex !items-center !justify-center !w-[18px] !h-[18px] !transition-all !duration-200"
                      style={{
                        opacity: project.sourceCode && !isFiltered ? 1 : 0.3,
                        cursor: project.sourceCode && !isFiltered ? 'pointer' : 'not-allowed'
                      }}
                      onMouseEnter={(e) => {
                        if (project.sourceCode && !isFiltered && window.matchMedia('(hover: hover)').matches) {
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon) {
                            icon.style.color = 'var(--link-blue)';
                            icon.style.transform = 'scale(1.1)';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon) {
                            icon.style.color = 'var(--secondary)';
                            icon.style.transform = 'scale(1)';
                          }
                        }
                      }}
                    >
                      <Github 
                        size={18} 
                        style={{ color: 'var(--secondary)' }}
                      />
                    </button>

                    {/* Live Demo Link */}
                    <button
                      onClick={() => handleLinkClick(project.liveDemo, project)}
                      disabled={!project.liveDemo || isFiltered}
                      className="!flex !items-center !justify-center !w-[18px] !h-[18px] !transition-all !duration-200"
                      style={{
                        opacity: project.liveDemo && !isFiltered ? 1 : 0.3,
                        cursor: project.liveDemo && !isFiltered ? 'pointer' : 'not-allowed'
                      }}
                      onMouseEnter={(e) => {
                        if (project.liveDemo && !isFiltered && window.matchMedia('(hover: hover)').matches) {
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon) {
                            icon.style.color = 'var(--link-blue)';
                            icon.style.transform = 'scale(1.1)';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon) {
                            icon.style.color = 'var(--secondary)';
                            icon.style.transform = 'scale(1)';
                          }
                        }
                      }}
                    >
                      <Globe 
                        size={18} 
                        style={{ color: 'var(--secondary)' }}
                      />
                    </button>
                  </div>
                </div>

                {/* Divider (except for last item) */}
                {!isLastProject && (
                  <div 
                    className="!h-px !mx-2 !my-1"
                    style={{ 
                      backgroundColor: 'var(--glass-border)',
                      opacity: 0.4
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {openVideoProject && (
          <VideoShowcase
            isOpen={!!openVideoProject}
            onClose={() => setOpenVideoProject(null)}
            videoSrc={openVideoProject.video ? `/videos/${openVideoProject.video}` : null}
            projectName={openVideoProject.name}
            sourceCode={openVideoProject.sourceCode}
            liveDemo={openVideoProject.liveDemo}
          />
        )}
      </AnimatePresence>
    </>
  );
} 