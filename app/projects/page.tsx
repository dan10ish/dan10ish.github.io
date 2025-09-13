'use client';

import { useMemo, useState } from 'react';
import { projects } from '../data';
import VideoPlayer from '../components/VideoPlayer';
import FloatingButtons from '../components/FloatingButtons';
import { Github, Globe } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filterSections = useMemo(() => {
    const years = [...new Set(projects.map(p => String(p.year)))].sort((a, b) => Number(b) - Number(a));
    const tags = [...new Set(projects.flatMap(p => p.tags))].sort();
    return { years, tags };
  }, []);

  const filteredProjects = useMemo(() => {
    if (!activeFilter) return projects;
    return projects.filter(project => 
      String(project.year) === activeFilter ||
      project.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <div className="!h-fit !max-w-2xl !mx-auto">
      <main className="!space-y-6">
        <section className="!space-y-4">
          <div className="!flex !items-center !justify-between">
            <h1 className="!text-base !opacity-70">Projects</h1>
            {activeFilter && (
              <button
                onClick={() => setActiveFilter(null)}
                className="!text-[0.88em] !px-1.5 !py-0.5 !rounded-md !bg-[var(--clear-filter-bg)] !text-[var(--clear-filter-text)] hover:!scale-105 !transition-transform"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="!space-y-3">
            <div className="!flex !items-center !gap-2">
              <span className="!text-[0.82rem] !opacity-60 !min-w-[70px]">Years:</span>
              <div className="!flex !flex-wrap !gap-2">
                {filterSections.years.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                    className={`!text-[0.88em] !px-1.5 !py-0.5 !rounded-md !whitespace-nowrap !cursor-pointer !transform !transition-transform !duration-0 hover:!scale-105 ${
                      activeFilter === filter
                        ? '!bg-[var(--link-blue)] !text-white'
                        : '!bg-[var(--code-bg)] !text-[var(--foreground)] hover:!bg-[var(--link-blue)] hover:!text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="!flex !gap-2">
              <span className="!text-[0.82rem] !opacity-60 !min-w-[70px]">Tags:</span>
              <div className="!flex !flex-wrap !gap-2">
                {filterSections.tags.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                    className={`!text-[0.88em] !px-1.5 !py-0.5 !rounded-md !whitespace-nowrap !cursor-pointer !transform !transition-transform !duration-0 hover:!scale-105 ${
                      activeFilter === filter
                        ? '!bg-[var(--link-blue)] !text-white'
                        : '!bg-[var(--code-bg)] !text-[var(--foreground)] hover:!bg-[var(--link-blue)] hover:!text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="!space-y-3">
            {filteredProjects.map((project) => (
              <div
                key={project.name}
                className="!rounded-md !p-3 !flex !items-center !gap-4"
              >
                <div className="!w-24 !h-24 !bg-black !rounded !overflow-hidden !flex-shrink-0 !flex !items-center !justify-center">
                  <VideoPlayer 
                    src={project.video} 
                    className="!w-full !h-full !object-cover"
                  />
                </div>
                
                <div className="!flex-1 !min-w-0">
                  <h3 className="!text-[0.85rem] !font-medium !text-[var(--foreground)] !mb-2">
                    {project.name}
                  </h3>
                  
                  <div className="!flex !flex-wrap !gap-1.5 !mb-3">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="!bg-[var(--code-bg)] !text-[var(--foreground)] !text-[0.88em] !px-1.5 !py-0.5 !rounded-md !whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="!flex !items-center !justify-between">
                    <div className="!text-[0.82rem] !text-[var(--foreground)]">
                      {project.year}
                    </div>
                    
                    <div className="!flex !items-center !gap-3">
                      {project.sourceCode && (
                        <Link 
                          href={project.sourceCode} 
                          target="_blank"
                          className="!opacity-60 hover:!opacity-100 !transition-opacity !text-[var(--foreground)]"
                          aria-label={`View ${project.name} source code`}
                        >
                          <Github size={19} />
                        </Link>
                      )}
                      {project.liveDemo ? (
                        <Link 
                          href={project.liveDemo} 
                          target="_blank"
                          className="!opacity-60 hover:!opacity-100 !transition-opacity !text-[var(--foreground)]"
                          aria-label={`View ${project.name} live demo`}
                        >
                          <Globe size={19} />
                        </Link>
                      ) : (
                        <Globe size={19} className="!opacity-20 !text-[var(--foreground)]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {filteredProjects.length === 0 && (
          <div className="!text-center !py-8 !text-[var(--secondary)]">
            No projects found.
          </div>
        )}
      </main>
      <FloatingButtons />
    </div>
  );
}
