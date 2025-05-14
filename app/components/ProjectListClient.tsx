'use client';

import { useState, useEffect } from "react";
import ProjectLink from "./ProjectLink";

interface Project {
  name: string;
  tag: string;
  sourceCode?: string;
  liveDemo?: string;
}

interface ProjectListClientProps {
  initialProjects: Project[];
}

export default function ProjectListClient({ initialProjects }: ProjectListClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    if (activeTag) {
      setFilteredProjects(initialProjects.filter(project => project.tag === activeTag));
    } else {
      setFilteredProjects(initialProjects);
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
            className="!text-[0.88em] !px-1.5 !py-0.5 !rounded-md"
            style={{
              backgroundColor: 'var(--clear-filter-bg)',
              color: 'var(--clear-filter-text)',
            }}
          >
            Clear Filter
          </button>
        )}
      </div>
      <div className="mt-1 project-list">
        {filteredProjects.map((project, index) => (
          <ProjectLink
            key={index}
            name={project.name}
            tag={project.tag}
            sourceCode={project.sourceCode}
            liveDemo={project.liveDemo}
            onTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
} 