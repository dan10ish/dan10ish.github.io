"use client";

import { useState, useMemo } from "react";
import { Project } from "../data";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsGridProps {
  projects: Project[];
}

type SortConfig = {
  key: keyof Project | null;
  direction: "asc" | "desc";
};

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [isOpen, setIsOpen] = useState(false);

  const sortedProjects = useMemo(() => {
    let sortableProjects = [...projects];
    if (sortConfig.key !== null) {
      sortableProjects.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Project];
        const bValue = b[sortConfig.key as keyof Project];
        if (aValue === null) return 1;
        if (bValue === null) return -1;
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProjects;
  }, [projects, sortConfig]);

  const requestSort = (key: keyof Project) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        setSortConfig({ key, direction: "desc" });
      } else {
        setSortConfig({ key: null, direction: "asc" });
      }
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const getSortIcon = (key: keyof Project) => {
    const isActive = sortConfig.key === key;
    const isAsc = isActive && sortConfig.direction === "asc";
    const isDesc = isActive && sortConfig.direction === "desc";

    return (
      <div className="flex flex-col items-center justify-center w-[12px] ml-1.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity transform-gpu will-change-[opacity]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
          <path d="M7 9L12 4L17 9" className={`transition-opacity duration-150 ${isAsc ? "opacity-100" : "opacity-30"}`} />
          <path d="M7 15L12 20L17 15" className={`transition-opacity duration-150 ${isDesc ? "opacity-100" : "opacity-30"}`} />
        </svg>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[14px] font-medium leading-snug text-foreground hover:text-foreground/80 transition-colors w-fit group outline-none"
        aria-expanded={isOpen}
      >
        Projects
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ willChange: "transform" }}
          className={`shrink-0 text-secondary group-hover:text-foreground/80 transition-transform duration-[250ms] ease-[cubic-bezier(0.2,0,0,1)] ${isOpen ? "rotate-90" : "rotate-0"}`}
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ willChange: "height, opacity" }}
            className="overflow-hidden transform-gpu"
          >
            <div className="pt-4 transform-gpu">
              <div className="overflow-hidden rounded-xl border border-border flex flex-col max-h-[240px] shadow-sm transform-gpu">
                <div className="overflow-auto overscroll-none custom-scrollbar relative flex-1 bg-background">
                  <table className="w-full text-left border-separate border-spacing-0 min-w-[640px] relative transform-gpu">
                    <thead className="sticky top-0 z-20 bg-background/95 backdrop-blur-md text-[13px] text-secondary transform-gpu">
                      <tr>
                        <th
                          className="sticky left-0 z-30 bg-background/95 backdrop-blur-md px-4 py-2.5 border-b border-r border-border font-medium cursor-pointer hover:bg-foreground/5 transition-colors select-none group w-[200px]"
                          onClick={() => requestSort("title")}
                        >
                          <div className="flex items-center">
                            Project {getSortIcon("title")}
                          </div>
                        </th>
                        <th
                          className="px-4 py-2.5 border-b border-r border-border font-medium cursor-pointer hover:bg-foreground/5 transition-colors select-none group w-[140px]"
                          onClick={() => requestSort("tag")}
                        >
                          <span className="flex items-center">Categories {getSortIcon("tag")}</span>
                        </th>
                        <th className="px-4 py-2.5 border-b border-r border-border font-medium select-none w-[80px]">
                          Live
                        </th>
                        <th className="px-4 py-2.5 border-b border-r border-border font-medium select-none w-[100px]">
                          Code
                        </th>
                        <th className="px-4 py-2.5 border-b border-border font-medium select-none">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px]">
                      {sortedProjects.map((project, idx) => {
                        const tagVar = project.tag.toLowerCase();
                        return (
                          <tr key={idx} className="group/row hover:bg-foreground/[0.04] transition-colors relative tracking-tight">
                            <td className="sticky left-0 z-10 p-0 border-b border-r border-border group-last/row:border-b-0 bg-background">
                              <div className="w-full h-full flex items-center gap-3 px-2 py-2.5 min-h-[38px] relative">
                                <div className="absolute inset-0 bg-foreground/[0.04] opacity-0 group-hover/row:opacity-100 transition-opacity pointer-events-none" />
                                <span className="text-[12px] text-secondary/60 w-[14px] shrink-0 text-right z-10 relative">
                                  {idx + 1}
                                </span>
                                <span className="font-medium text-foreground/90 truncate max-w-[150px] z-10 relative">{project.title}</span>
                              </div>
                            </td>
                            <td className="px-4 py-2 border-b border-r border-border group-last/row:border-b-0 min-h-[38px]">
                              <div className="flex flex-wrap gap-1.5 items-center">
                                <span
                                  className="inline-flex items-center px-1.5 py-[2px] rounded-[4px] text-[12px] font-medium leading-tight saturate-150 drop-shadow-sm mix-blend-normal"
                                  style={{ backgroundColor: `var(--tag-${tagVar}-bg, var(--background))`, color: `var(--tag-${tagVar}-text, var(--foreground))` }}
                                >
                                  {project.tag}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap border-b border-r border-border group-last/row:border-b-0">
                              {project.live ? (
                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-1.5 py-[2px] rounded-[4px] text-[12px] font-medium hover:brightness-125 transition-all" style={{ backgroundColor: 'var(--live-bg)', color: 'var(--live-text)' }}>
                                  Live
                                </a>
                              ) : (
                                <span className="text-secondary/40 text-[11px] ml-1">N/A</span>
                              )}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap border-b border-r border-border group-last/row:border-b-0">
                              {project.source ? (
                                <a href={project.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-1.5 py-[2px] rounded-[4px] text-[12px] font-medium hover:brightness-125 transition-all" style={{ backgroundColor: 'var(--source-bg)', color: 'var(--source-text)' }}>
                                  GitHub
                                </a>
                              ) : (
                                <span className="text-secondary/40 text-[11px] ml-1">N/A</span>
                              )}
                            </td>
                            <td className="px-4 py-2 text-secondary whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px] border-b border-border group-last/row:border-b-0">
                              {project.description}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
