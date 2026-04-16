'use client';

import {
  PerspectiveBook,
  BookHeader,
  BookTitle,
  BookDescription,
} from '@/components/ui/perspective-book';
import { notes } from '../data';

export default function Notes() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-y-12 place-items-center">
      {notes.map((note) => (
        <a
          key={note.file}
          href={note.file}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${note.title} notes in a new tab`}
          className="block"
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
              <BookDescription className="mt-auto">Danish</BookDescription>
            </div>
          </PerspectiveBook>
        </a>
      ))}
    </div>
  );
}
