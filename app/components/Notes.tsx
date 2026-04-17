'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  PerspectiveBook,
  BookHeader,
  BookTitle,
  BookDescription,
} from '@/components/ui/perspective-book';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { notes } from '../data';
import { cn } from '@/lib/utils';

export default function Notes() {
  const [activeSemester, setActiveSemester] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const allSemesters = useMemo(
    () => Array.from(new Set(notes.map((n) => n.semester))).sort(),
    []
  );

  const sortedNotes = useMemo(
    () =>
      activeSemester
        ? [
            ...notes.filter((n) => n.semester === activeSemester),
            ...notes.filter((n) => n.semester !== activeSemester),
          ]
        : notes,
    [activeSemester]
  );

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', onSelect);
    api.on('reInit', () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    });
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (api) api.scrollTo(0);
  }, [activeSemester, api]);

  const handleSemesterClick = (sem: number) => {
    setActiveSemester((prev) => (prev === sem ? null : sem));
  };

  const progress = count > 0 ? (current / count) * 100 : 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {allSemesters.map((sem) => {
          const isActive = activeSemester === sem;
          return (
            <button
              key={sem}
              onClick={() => handleSemesterClick(sem)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs transition-colors',
                isActive
                  ? 'bg-muted text-foreground'
                  : 'bg-background text-foreground hover:bg-accent'
              )}
            >
              semester {sem}
              {isActive && <X size={14} className="text-destructive" />}
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
          {sortedNotes.map((note) => {
            const isFiltered =
              activeSemester !== null && note.semester !== activeSemester;
            return (
              <CarouselItem
                key={note.file}
                className="pl-4 basis-1/2 md:basis-1/3"
              >
                <a
                  href={note.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${note.title} notes in a new tab`}
                  className={cn(
                    'flex items-center justify-center transition-opacity',
                    isFiltered && 'pointer-events-none opacity-40'
                  )}
                >
                  <PerspectiveBook size="sm" textured className={note.cover}>
                    <div className="flex h-full flex-col">
                      <BookHeader>
                        <span className="text-[10px] font-medium tracking-wider opacity-70">
                          SEM {note.semester}
                        </span>
                      </BookHeader>
                      <BookTitle className="text-xs leading-snug">
                        {note.title}
                      </BookTitle>
                      <BookDescription className="mt-auto">
                        Danish
                      </BookDescription>
                    </div>
                  </PerspectiveBook>
                </a>
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
            aria-label="Previous notes"
            className="inline-flex size-9 items-center justify-center rounded-md border transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!api?.canScrollNext()}
            aria-label="Next notes"
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
