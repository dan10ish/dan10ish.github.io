'use client';

import { useState, useEffect } from "react";
import ProjectLink from "./ProjectLink";

interface Project {
  name: string;
  tag: string;
  sourceCode?: string;
  liveDemo?: string;
  video?: string | null;
}

interface ProjectListClientProps {
  initialProjects: Project[];
}

export default function ProjectListClient({ initialProjects }: ProjectListClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [projectsToDisplay, setProjectsToDisplay] = useState<Project[]>(initialProjects);

  useEffect(() => {
    if (activeTag) {
      const taggedProjects = initialProjects.filter(project => project.tag === activeTag);
      const otherProjects = initialProjects.filter(project => project.tag !== activeTag);
      setProjectsToDisplay([...taggedProjects, ...otherProjects]);
    } else {
      setProjectsToDisplay(initialProjects);
    }
  }, [activeTag, initialProjects]);

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null);
    } else {
      setActiveTag(tag);
    }
  };

  const handleClearFilter = () => {
    setActiveTag(null);
  };

  return (
    <section>
      <div className="flex !items-baseline justify-between mb-1">
        <h1 className="text-base opacity-70">Projects</h1>
        {activeTag && (
          <button
            onClick={handleClearFilter}
            className="!text-[0.88em] !px-1.5 !py-0.5 !rounded-md transform transition-transform duration-0 hover:scale-105"
            style={{
              backgroundColor: 'var(--clear-filter-bg)',
              color: 'var(--clear-filter-text)',
            }}
          >
            Clear
          </button>
        )}
      </div>
      <div className="mt-1 project-list">
        {projectsToDisplay.map((project, index) => {
          const isDimmed = activeTag !== null && project.tag !== activeTag;
          return (
            <div
              key={index}
              style={isDimmed ? { opacity: 0.4, pointerEvents: 'none' } : {}}
            >
              <ProjectLink
                name={project.name}
                tag={project.tag}
                sourceCode={project.sourceCode}
                liveDemo={project.liveDemo}
                video={project.video}
                onTagClick={handleTagClick}
                isActiveTag={activeTag === project.tag}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}