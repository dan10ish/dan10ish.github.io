'use client'

import SocialLinks from "./SocialLinks";
import { personalInfo, projects } from "../data";
import Projects from "./Projects";
import WritingsCarousel from "./WritingsCarousel";
import About from "./About";
import NameSvg from "./NameSvg";

interface Writing {
  slug: string;
  title: string;
  date: string;
  summary: string;
  ogImage?: string;
  displayImage?: string;
  tags?: string[];
  author?: string;
  readTime?: string;
  type?: string;
  locale?: string;
  alternateLocales?: string[];
  keywords?: string[];
  canonicalUrl?: string;
}

interface HomeClientProps {
  writings: Writing[];
}

export default function HomeClient({ writings }: HomeClientProps) {
  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-10 pb-16! sm:pb-0!">
        <section className="space-y-0">
          <div className="flex! items-center! justify-between!">
            <h1 className="flex! items-center! header-text m-0!" aria-label={personalInfo.name}>
              <NameSvg />
            </h1>
            <SocialLinks
              github={personalInfo.socials.github}
              email={personalInfo.socials.email}
              x={personalInfo.socials.x}
              instagram={personalInfo.socials.instagram}
              linkedin={personalInfo.socials.linkedin}
              snapchat={personalInfo.socials.snapchat}
              threads={personalInfo.socials.threads}
            />
          </div>
        </section>

        <section>
          <About />
        </section>

        <section>
          <h2 className="text-base! font-bold! mb-4! header-text">Writings</h2>
          <WritingsCarousel writings={writings} />
        </section>

        <section>
          <h2 className="text-base! font-bold! mb-4! header-text">Projects</h2>
          <Projects projects={projects} />
        </section>
      </main>
    </div>
  );
}
