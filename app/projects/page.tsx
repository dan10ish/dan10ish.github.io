'use client';

import { useState, useEffect } from "react";
import ProjectLink from "../components/ProjectLink";
import FloatingButtons from "../components/FloatingButtons";
import { projects } from "../data";

interface Project {
  name: string;
  tag: string;
  sourceCode?: string;
  liveDemo?: string;
}

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [projectsToDisplay, setProjectsToDisplay] = useState<Project[]>(projects);

  useEffect(() => {
    if (activeTag) {
      const taggedProjects = projects.filter(project => project.tag === activeTag);
      const otherProjects = projects.filter(project => project.tag !== activeTag);
      setProjectsToDisplay([...taggedProjects, ...otherProjects]);
    } else {
      setProjectsToDisplay(projects);
    }
  }, [activeTag]);

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

  const uniqueTags = [...new Set(projects.map(project => project.tag))];

  return (
    <div className="!h-fit !max-w-2xl !mx-auto">
      <main className="!space-y-6">
        <section className="!space-y-4">
          <div className="!flex !items-center !justify-between">
            <h1 className="!text-base !font-bold">Projects</h1>
            {activeTag && (
              <button
                onClick={handleClearFilter}
                className="!text-[0.82rem] !px-3 !py-1 !rounded-md !bg-[var(--clear-filter-bg)] !text-[var(--clear-filter-text)] hover:!scale-105 !transition-transform"
              >
                Clear Filter
              </button>
            )}
          </div>
          
          <div className="!flex !flex-wrap !gap-2">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`!px-3 !py-1 !rounded-full !text-[0.82rem] !transition-all !duration-200 ${
                  activeTag === tag
                    ? '!bg-[var(--link-blue)] !text-white'
                    : '!bg-[var(--code-bg)] !text-[var(--foreground)] hover:!bg-[var(--link-blue)] hover:!text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="!space-y-1">
            {projectsToDisplay.map((project, index) => {
              const isDimmed = activeTag !== null && project.tag !== activeTag;
              return (
                <div
                  key={index}
                  style={isDimmed ? { opacity: 0.4, pointerEvents: 'none' } : {}}
                  className="!transition-opacity !duration-200"
                >
                  <ProjectLink
                    name={project.name}
                    tag={project.tag}
                    sourceCode={project.sourceCode}
                    liveDemo={project.liveDemo}
                    onTagClick={handleTagClick}
                    isActiveTag={activeTag === project.tag}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <FloatingButtons />
    </div>
  );
}
