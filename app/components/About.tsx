'use client';

import { personalInfo } from "../data";

export default function About() {
  return (
    <section>
      <p className="text-base">{personalInfo.about}</p>
      <div className="!mt-4 flex flex-wrap gap-2">
        {personalInfo.skills.map((skill) => (
          <span
            key={skill}
            className="!text-[0.88em] bg-[var(--code-bg)] text-[var(--secondary)] !px-1.5 !py-0.5 rounded-md whitespace-nowrap transform transition-transform duration-0"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
} 