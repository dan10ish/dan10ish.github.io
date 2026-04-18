'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Video, Globe, X, ChevronUp, ChevronDown } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const ProjectVideoDialog = dynamic(() => import('./ProjectVideoDialog'), {
  ssr: false,
});

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const sortedProjects = useMemo(
    () =>
      activeTag
        ? [
            ...projects.filter((p) => p.tag === activeTag),
            ...projects.filter((p) => p.tag !== activeTag),
          ]
        : projects,
    [projects, activeTag]
  );

  const allTags = useMemo(
    () => Array.from(new Set(projects.map((p) => p.tag))),
    [projects]
  );

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };
    api.on('select', onSelect);
    api.on('reInit', onReInit);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onReInit);
    };
  }, [api]);

  useEffect(() => {
    if (api) api.scrollTo(0);
  }, [activeTag, api]);

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

  const progress = count > 0 ? (current / count) * 100 : 0;

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

        <Carousel
          setApi={setApi}
          orientation="vertical"
          opts={{
            align: 'start',
            containScroll: 'trimSnaps',
            watchDrag: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-mt-0 h-[18rem]">
            {sortedProjects.map((project) => {
              const isFiltered =
                activeTag !== null && project.tag !== activeTag;
              return (
                <CarouselItem
                  key={project.name}
                  className={cn(
                    'pt-0 basis-1/8',
                    isFiltered && 'pointer-events-none opacity-40'
                  )}
                >
                  <div className="flex h-full items-center justify-between gap-3 border-b px-1">
                    <span className="truncate text-sm">
                      {project.name.toLowerCase()}
                    </span>
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
                        onClick={() =>
                          handleLinkClick(project.sourceCode, project)
                        }
                        disabled={!project.sourceCode || isFiltered}
                        aria-label={`Source code for ${project.name}`}
                        className="inline-flex size-[18px] items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                      >
                        <GithubIcon size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleLinkClick(project.liveDemo, project)
                        }
                        disabled={!project.liveDemo || isFiltered}
                        aria-label={`Live demo for ${project.name}`}
                        className="inline-flex size-[18px] items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                      >
                        <Globe size={18} />
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!api?.canScrollPrev()}
              aria-label="Previous projects"
              className="inline-flex size-9 items-center justify-center rounded-md border transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronUp size={18} />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!api?.canScrollNext()}
              aria-label="Next projects"
              className="inline-flex size-9 items-center justify-center rounded-md border transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronDown size={18} />
            </button>
          </div>
          <div className="flex-1">
            <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-muted">
              <div
                className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="tabular-nums">
            {String(current).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
      </section>

      {openVideoProject && (
        <ProjectVideoDialog
          open={!!openVideoProject}
          onOpenChange={(next) => {
            if (!next) setOpenVideoProject(null);
          }}
          videoSrc={
            openVideoProject.video
              ? `/videos/${openVideoProject.video}`
              : null
          }
          projectName={openVideoProject.name}
          sourceCode={openVideoProject.sourceCode}
          liveDemo={openVideoProject.liveDemo}
        />
      )}
    </>
  );
}
