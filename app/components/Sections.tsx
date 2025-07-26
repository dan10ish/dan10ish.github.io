"use client";

import { memo, useState, useEffect, useRef } from "react";
import { Github, Link, ChevronDown } from "lucide-react";

interface Project {
  title: string;
  live?: string;
  source?: string;
}

export const Section = memo<{ title: string; children: React.ReactNode }>(
  ({ title, children }) => (
    <div className="grid grid-cols-[80px_1fr] gap-x-6">
      <h2
        className="font-semibold uppercase tracking-widest text-right"
        style={{ color: "var(--heading-color)" }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </div>
  )
);
Section.displayName = "Section";

export const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateIndicatorVisibility = () => {
      const isScrollable = container.scrollHeight > container.clientHeight;
      const isAtBottom =
        container.scrollHeight - Math.ceil(container.scrollTop) <=
        container.clientHeight + 1;

      setShowScrollIndicator(isScrollable && !isAtBottom);
    };

    updateIndicatorVisibility();

    container.addEventListener("scroll", updateIndicatorVisibility);
    window.addEventListener("resize", updateIndicatorVisibility);

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateIndicatorVisibility);
      }
      window.removeEventListener("resize", updateIndicatorVisibility);
    };
  }, [projects]);

  return (
    <Section title="Projects">
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="space-y-2 max-h-[160px] md:max-h-[190px] overflow-auto scrollbar-hide"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 max-w-[450px]"
            >
              <p
                className="flex-grow"
                style={{
                  fontWeight: "var(--right-font)",
                  fontSize: "var(--font-size)",
                }}
              >
                {project.title}
              </p>
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 p-1 -mt-1 mr-2 rounded-md"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <Link size={16} />
                </a>
              ) : (
                <span className="opacity-30 p-1 -mt-1 mr-2" aria-hidden="true">
                  <Link size={16} />
                </span>
              )}
              {project.source ? (
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 p-1 -mt-1 -ml-1 rounded-md"
                  aria-label={`View source code of ${project.title} on GitHub`}
                >
                  <Github size={16} />
                </a>
              ) : (
                <span className="opacity-30 p-1 -mt-1 -ml-1" aria-hidden="true">
                  <Github size={16} />
                </span>
              )}
            </div>
          ))}
        </div>
        {showScrollIndicator && (
          <button
            onClick={handleScrollDown}
            aria-label="Scroll to bottom"
            className="absolute -bottom-0.5 -left-10 p-1 rounded-full hover:cursor-pointer"
          >
            <ChevronDown
              className="animate-bounce"
              size={16}
              style={{ color: "var(--heading-color)" }}
            />
          </button>
        )}
      </div>
    </Section>
  );
};
