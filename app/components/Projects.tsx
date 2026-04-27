'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
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
        'flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-opacity duration-200',
        isFiltered && 'pointer-events-none opacity-40',
      )}
    >
      <div className="relative aspect-square w-full shrink-0 bg-muted">
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
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 p-3 sm:p-3.5">
        <div className="min-h-0 space-y-1.5">
          <h3 className="truncate text-sm font-semibold leading-tight text-foreground">
            {project.name}
          </h3>
          <span className="inline-flex w-fit max-w-full rounded-md border border-border bg-muted/80 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
            {project.tag}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/80 pt-2.5">
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            disabled={!project.sourceCode || isFiltered}
            aria-label={`Source code for ${project.name}`}
            onClick={() => openLink(project.sourceCode)}
          >
            <GithubIcon size={14} />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            disabled={!project.liveDemo || isFiltered}
            aria-label={`Live demo for ${project.name}`}
            onClick={() => openLink(project.liveDemo)}
          >
            <Globe className="size-3.5" aria-hidden />
          </Button>
        </div>
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
    if (api) api.scrollTo(0, false);
  }, [activeTag, api]);

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  const progress = count > 0 ? (current / count) * 100 : 0;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs transition-colors',
                isActive
                  ? 'border-foreground/20 bg-muted text-foreground'
                  : 'border-border bg-background text-foreground hover:bg-accent',
              )}
            >
              {tag}
              {isActive && (
                <span className="text-muted-foreground" aria-hidden>
                  ×
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          containScroll: 'trimSnaps',
          duration: 20,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {pages.map((page) => (
            <CarouselItem
              key={page.map((p) => p.name).join('|')}
              className="basis-full pl-3 sm:pl-4"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
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

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={() => api?.scrollPrev()}
            disabled={!api?.canScrollPrev()}
            aria-label="Previous project page"
            className="shrink-0 rounded-md"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={() => api?.scrollNext()}
            disabled={!api?.canScrollNext()}
            aria-label="Next project page"
            className="shrink-0 rounded-md"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="min-w-0 flex-1">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-foreground/80 transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="tabular-nums shrink-0">
          {String(current).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
