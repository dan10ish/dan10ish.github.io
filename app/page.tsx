import Link from "next/link";
import SocialLinks from "./components/SocialLinks";
import { personalInfo, projects } from "./data";
import { getSortedWritingsData } from "../lib/writings";
import { formatDate } from "../lib/utils";
import Projects from "./components/Projects";
import WritingsCarousel from "./components/WritingsCarousel";

export default function Home() {
  const writings = getSortedWritingsData();

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6 !pb-16 sm:!pb-0">
        <section className="space-y-0">
          <h1 className="text-base font-bold header-text">
            {personalInfo.name}
          </h1>
        </section>

        <section>
          <p className="text-base">{personalInfo.about}</p>
          <div className="!pt-4 space-y-4">
            <div className="mt-1 flex flex-wrap gap-2">
              {personalInfo.skills.map((skill) => (
                <div
                  key={skill}
                  className="text-[0.88em] bg-[var(--code-bg)] text-[var(--primary)] !px-1.5 !py-0.5 rounded-md whitespace-nowrap"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2">
            <p className="!text-[0.85rem]">
              Get in touch:
            </p>
            <SocialLinks
              github={personalInfo.socials.github}
              email={personalInfo.socials.email}
              x={personalInfo.socials.x}
              instagram={personalInfo.socials.instagram}
              linkedin={personalInfo.socials.linkedin}
            />
          </div>
        </section>

        <WritingsCarousel writings={writings} />

        <Projects projects={projects} />
      </main>
    </div>
  );
}
