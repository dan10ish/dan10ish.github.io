'use client';

import { personalInfo } from "../data";

export default function About() {
  return (
    <section>
      <div className="flex items-start gap-2">
        <p className="text-base flex-1">{personalInfo.about}</p>
      </div>

      <div className="!pt-4 space-y-4">
        <div className="mt-1 flex flex-wrap gap-2">
          {personalInfo.skills.map((skill) => (
            <div
              key={skill}
              className="text-[0.88em] bg-[var(--code-bg)] text-[var(--secondary)] !px-1.5 !py-0.5 rounded-md whitespace-nowrap"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 