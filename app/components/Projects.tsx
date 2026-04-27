'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Globe, X } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Spinner } from '@/components/ui/spinner';
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

const TILES_PER_PAGE = 4;

function chunkProjects<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function ProjectTile({
  project,
  isFiltered,
  reducedMotion,
}: {
  project: Project;
  isFiltered: boolean;
  reducedMotion: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoSrc = project.video ? `/videos/${project.video}` : null;
  const canAutoplay = Boolean(videoSrc && !isFiltered && !reducedMotion);

  useEffect(() => {
    if (isFiltered && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isFiltered]);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || !canAutoplay) {
      if (video) video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const shouldPlay =
          entry.isIntersecting && entry.intersectionRatio >= 0.22;
        if (shouldPlay) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.12, 0.22, 0.4, 0.65, 1], rootMargin: '0px' },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [canAutoplay, videoSrc]);

  const openLink = (url: string | undefined) => {
    if (url && !isFiltered) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article
      ref={containerRef}
      className={cn(
        'flex min-h-0 flex-col gap-1.5 transition-opacity duration-200',
        isFiltered && 'pointer-events-none opacity-40',
      )}
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-md border border-border bg-muted shadow-sm">
        {!videoSrc ? (
          <div className="flex h-full items-center justify-center px-3 text-center text-xs text-muted-foreground">
            No preview
          </div>
        ) : (
          <>
            {!videoReady && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
                <Spinner className="size-7 text-muted-foreground" />
              </div>
            )}
            <video
              ref={videoRef}
              src={videoSrc}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              aria-label={`${project.name} screen recording preview`}
              onLoadedData={() => setVideoReady(true)}
              onError={() => setVideoReady(true)}
              onContextMenu={(e) => e.preventDefault()}
            />
          </>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-2.5 pb-2">
          <h3 className="truncate text-xs font-semibold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.95),0_0_20px_rgba(0,0,0,0.65)]">
            {project.name}
          </h3>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5">
        <button
          type="button"
          disabled={!project.sourceCode || isFiltered}
          onClick={() => openLink(project.sourceCode)}
          className="flex items-center justify-center gap-1 rounded-md bg-neutral-950 py-1.5 text-[0.6875rem] font-medium leading-none text-white shadow-sm transition-[filter] hover:brightness-110 disabled:pointer-events-none disabled:opacity-40 dark:bg-white dark:text-neutral-950 dark:hover:brightness-95"
          aria-label={`Source code for ${project.name}`}
        >
          <GithubIcon size={12} className="shrink-0" />
          GitHub
        </button>
        <button
          type="button"
          disabled={!project.liveDemo || isFiltered}
          onClick={() => openLink(project.liveDemo)}
          className="flex items-center justify-center gap-1 rounded-md bg-[#0969da] py-1.5 text-[0.6875rem] font-medium leading-none text-white shadow-sm transition-colors hover:bg-[#0550ae] disabled:pointer-events-none disabled:opacity-40 dark:bg-[#4493f8] dark:hover:bg-[#6cb6ff]"
          aria-label={`Live demo for ${project.name}`}
        >
          <Globe className="size-3 shrink-0" aria-hidden />
          Live
        </button>
      </div>
    </article>
  );
}

export default function Projects({ projects }: ProjectsProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeTag, setActiveTag] = useState<string | null>(null);
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
    [projects, activeTag],
  );

  const pages = useMemo(
    () => chunkProjects(sortedProjects, TILES_PER_PAGE),
    [sortedProjects],
  );

  const allTags = useMemo(
    () => Array.from(new Set(projects.map((p) => p.tag))),
    [projects],
  );

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };
    sync();
    api.on('select', sync);
    api.on('reInit', sync);
    return () => {
      api.off('select', sync);
      api.off('reInit', sync);
    };
  }, [api]);

  useEffect(() => {
    if (api) api.scrollTo(0);
  }, [activeTag, api]);

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  const progress = count > 0 ? (current / count) * 100 : 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={cn(
                'relative inline-flex max-w-full min-w-0 items-center rounded-md border py-1 pl-3 text-xs leading-none transition-colors',
                isActive
                  ? 'bg-muted pr-8 text-foreground'
                  : 'bg-background pr-3 text-foreground hover:bg-accent',
              )}
            >
              <span className="min-w-0 truncate">{tag}</span>
              {isActive && (
                <span
                  className="absolute right-1.5 top-1/2 grid size-4 -translate-y-1/2 place-items-center text-destructive"
                  aria-hidden
                >
                  <X size={14} className="block" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: 'start', containScroll: 'trimSnaps' }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 py-2">
          {pages.map((page) => (
            <CarouselItem
              key={page.map((p) => p.name).join('|')}
              className="basis-full pl-4"
            >
              <div className="grid w-full grid-cols-2 gap-2.5 max-sm:mx-auto max-sm:max-w-[min(100%,20.5rem)] sm:max-w-none sm:gap-3 md:gap-4">
                {page.map((project) => {
                  const isFiltered =
                    activeTag !== null && project.tag !== activeTag;
                  return (
                    <ProjectTile
                      key={project.name}
                      project={project}
                      isFiltered={isFiltered}
                      reducedMotion={reducedMotion}
                    />
                  );
                })}
              </div>
            </CarouselItem>
          ))}
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
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!api?.canScrollNext()}
            aria-label="Next projects"
            className="inline-flex size-9 items-center justify-center rounded-md border transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight size={18} />
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
    </div>
  );
}
