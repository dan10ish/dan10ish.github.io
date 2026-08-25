"use client";

import { useState, useMemo } from "react";
import { Project } from "../data";

interface ProjectsGridProps {
  projects: Project[];
}

type SortConfig = {
  key: keyof Project | null;
  direction: "asc" | "desc";
};

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });

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

  const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "robotics": return { bg: "rgba(139, 92, 246, 0.2)", text: "rgb(167, 139, 250)" };
      case "algorithm": return { bg: "rgba(245, 158, 11, 0.2)", text: "rgb(251, 191, 36)" };
      case "web": return { bg: "rgba(59, 130, 246, 0.2)", text: "rgb(96, 165, 250)" };
      case "simulation": return { bg: "rgba(236, 72, 153, 0.2)", text: "rgb(244, 114, 182)" };
      case "education": return { bg: "rgba(16, 185, 129, 0.2)", text: "rgb(52, 211, 153)" };
      case "ml": return { bg: "rgba(234, 179, 8, 0.2)", text: "rgb(250, 204, 21)" };
      case "game": return { bg: "rgba(239, 68, 68, 0.2)", text: "rgb(248, 113, 113)" };
      default: return { bg: "rgba(156, 163, 175, 0.2)", text: "rgb(156, 163, 175)" };
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border flex flex-col max-h-[340px] shadow-sm">
      <div className="overflow-auto overscroll-none custom-scrollbar relative flex-1 bg-background">
        <table className="w-full text-left border-collapse min-w-[650px] relative">
          <thead className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border shadow-none text-[13px] text-secondary">
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
                <tr key={idx} className="group/row border-b border-border last:border-none hover:bg-foreground/[0.04] transition-colors relative tracking-tight">
                  <td className="sticky left-0 z-10 p-0 border-r border-border bg-background">
                    <div className="w-full h-full flex items-center gap-3 px-4 py-2.5 min-h-[38px] relative">
                      <div className="absolute inset-0 bg-foreground/[0.04] opacity-0 group-hover/row:opacity-100 transition-opacity pointer-events-none" />
                      <span className="text-[12px] font-mono text-secondary/60 w-[14px] shrink-0 text-right z-10 relative">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-foreground/90 truncate max-w-[150px] z-10 relative">{project.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-r border-border min-h-[38px]">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span
                        className="inline-flex items-center px-1.5 py-[2px] rounded-[4px] text-[12px] font-medium leading-tight saturate-150 drop-shadow-sm mix-blend-normal"
                        style={{ backgroundColor: `var(--tag-${tagVar}-bg, var(--background))`, color: `var(--tag-${tagVar}-text, var(--foreground))` }}
                      >
                        {project.tag}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap border-r border-border">
                    {project.live ? (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-1.5 py-[2px] rounded-[4px] text-[12px] font-medium hover:brightness-125 transition-all" style={{ backgroundColor: 'var(--live-bg)', color: 'var(--live-text)' }}>
                        Live
                      </a>
                    ) : (
                      <span className="text-secondary/40 font-mono text-[11px] ml-1">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap border-r border-border">
                    {project.source ? (
                      <a href={project.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-1.5 py-[2px] rounded-[4px] text-[12px] font-medium hover:brightness-125 transition-all" style={{ backgroundColor: 'var(--source-bg)', color: 'var(--source-text)' }}>
                        GitHub
                      </a>
                    ) : (
                      <span className="text-secondary/40 font-mono text-[11px] ml-1">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-secondary whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px]">
                    {project.description}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border bg-background p-2.5 px-4 flex items-center justify-between text-[12px] text-secondary shrink-0">
        <div>
          <span className="font-medium text-foreground mr-1">{projects.length}</span>count
        </div>
      </div>
    </div>
  );
}
