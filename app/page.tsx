import Link from "next/link";
import SocialLinks from "./components/SocialLinks";
import { personalInfo, projects } from "./data";
import { getSortedWritingsData } from "../lib/writings";
import { formatDate } from "../lib/utils";
import Projects from "./components/Projects";
import WritingsCarousel from "./components/WritingsCarousel";

export default function Home() {
  const writings = getSortedWritingsData();

  const formatSkillsList = (skills: string[]) => {
    if (skills.length === 0) return null;
    if (skills.length === 1) return <strong>{skills[0].toLowerCase()}</strong>;
    if (skills.length === 2) return (
      <>
        <strong>{skills[0].toLowerCase()}</strong> and <strong>{skills[1].toLowerCase()}</strong>
      </>
    );
    
    return (
      <>
        {skills.slice(0, -1).map((skill, index) => (
          <span key={index}>
            <strong>{skill.toLowerCase()}</strong>
            {index < skills.length - 2 ? ', ' : ' and '}
          </span>
        ))}
        <strong>{skills[skills.length - 1].toLowerCase()}</strong>
      </>
    );
  };

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6 !pb-16 sm:!pb-0">
        <section className="space-y-0">
          <h1 className="text-base font-bold header-text">
            {personalInfo.name}
          </h1>
        </section>

        <section>
          <p className="text-base">{personalInfo.about}, interested in {formatSkillsList(personalInfo.skills)}.</p>
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
