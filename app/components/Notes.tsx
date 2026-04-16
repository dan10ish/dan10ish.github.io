'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import {
  PerspectiveBook,
  BookHeader,
  BookTitle,
  BookDescription,
} from '@/components/ui/perspective-book';
import { ScrollArea } from '@/components/ui/scroll-area';
import { notes } from '../data';
import { cn } from '@/lib/utils';

export default function Notes() {
  const [activeSemester, setActiveSemester] = useState<number | null>(null);

  const allSemesters = Array.from(new Set(notes.map((n) => n.semester))).sort();

  const sortedNotes = activeSemester
    ? [
        ...notes.filter((n) => n.semester === activeSemester),
        ...notes.filter((n) => n.semester !== activeSemester),
      ]
    : notes;

  const handleSemesterClick = (sem: number) => {
    setActiveSemester((prev) => (prev === sem ? null : sem));
  };

  return (
    <div className="space-y-6">
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

      <ScrollArea scrollbarGutter className="h-[26rem] w-full">
        <div className="grid grid-flow-col grid-rows-2 auto-cols-[150px] gap-x-6 gap-y-10 pt-2 pb-1">
          {sortedNotes.map((note) => {
            const isFiltered =
              activeSemester !== null && note.semester !== activeSemester;
            return (
              <a
                key={note.file}
                href={note.file}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${note.title} notes in a new tab`}
                className={cn(
                  'block justify-self-center transition-opacity',
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
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
